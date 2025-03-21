import { pb } from '$lib/pocketbase'
import type { Property } from '$lib/pocketbase'
import type { PageLoad } from './$types'

export const ssr = false

export const load = (async ({ params }) => {
	try {
		const property = await pb.collection('properties').getOne(params.id)
		return { property: property as unknown as Property }
	} catch (error) {
		console.error('Error loading property:', error)
		return { property: null, error: 'Property not found' }
	}
}) satisfies PageLoad
