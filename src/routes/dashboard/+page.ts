import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	return {}
}

// Make the page render on client side to properly check auth
export const ssr = false
