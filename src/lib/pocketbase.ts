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

export interface Property extends Record {
	title: string
	location: string
	type: string
	description: string
	images: string[]
	featured: boolean
	area: string
	price: string
	isActive: boolean
}

export const getProperties = async () => {
	try {
		const records = await pb.collection('properties').getList(1, 50, {
			sort: '-created',
			filter: 'isActive = true'
		})
		return records.items
	} catch (error) {
		console.error('Error fetching properties:', error)
		return []
	}
}

export const getProperty = async (id: string) => {
	try {
		const record = await pb.collection('properties').getOne(id)
		return record
	} catch (error) {
		console.error('Error fetching property:', error)
		return null
	}
}
