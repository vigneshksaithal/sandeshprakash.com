import { pb } from '$lib/pocketbase'
import type { Property } from '$lib/pocketbase'

export interface PageData {
	property: Property | null
	error?: string | null
}

export const load = (async ({ params }: { params: { id: string } }) => {
	try {
		const property = await pb.collection('properties').getOne(params.id)
		return { property: property as unknown as Property }
	} catch (error) {
		console.error('Error loading property:', error)
		return { property: null, error: 'Property not found' }
	}
}) as unknown as import('./$types').PageLoad
