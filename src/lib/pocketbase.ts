import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import PocketBase, { type RecordModel } from 'pocketbase'
import { writable } from 'svelte/store'

// Initialize PocketBase client
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL)

// Create an auth store
export const currentUser = writable<RecordModel | null>(pb.authStore.record)

// Subscribe to auth state changes
pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.record)
})

// Types for PocketBase responses
export interface Record {
	id: string
	created: string
	updated: string
	collectionId: string
	collectionName: string
}

// export interface Property extends Record {
// 	type: string
// 	featured: boolean
// 	location: string
// 	name: string
// 	price: number
// 	size: number
// 	address: string
// 	image: string
// 	status: string
// 	description: string
// }
