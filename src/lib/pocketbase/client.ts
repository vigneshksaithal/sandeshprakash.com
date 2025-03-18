import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import PocketBase, { type RecordModel } from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL)

// Create an auth store
export const currentUser = writable<RecordModel | null>(pb.authStore.record)

// Subscribe to auth state changes
pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.record)
})
