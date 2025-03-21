<script lang="ts">
import { pb } from '$lib/pocketbase'
import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import { onMount } from 'svelte'
import { fly } from 'svelte/transition'

interface Property {
	id: string
	title: string
	location: string
	type: 'Warehouse' | 'Manufacturing' | 'Industrial Land' | 'Commercial'
	description: string
	images: string[]
	featured: boolean
	status: 'active' | 'archive'
	area: string
	price: string
	created: string
	updated: string
}

let properties: Property[] = []
let isLoaded = false

async function loadProperties() {
	try {
		const records = await pb.collection('properties').getList<Property>(1, 50, {
			filter: 'status = "active" && featured = true',
			sort: '-created'
		})
		console.log('Records:', records)
		properties = records.items.map((item) => {
			console.log('Processing item:', item)
			return {
				...item,
				images: item.images.map((img) => {
					if (img.startsWith('http')) return img
					return pb.files.getURL(item, img, { thumb: '600x400' })
				})
			}
		})
		console.log('Final properties:', properties)
		isLoaded = true
	} catch (error) {
		console.error('Error loading properties:', error)
	}
}

onMount(loadProperties)
</script>

<section class="py-32 px-6 md:px-16 bg-gradient-to-b from-[var(--color-background)] to-gray-50">
	<div class="container mx-auto">
		<header class="mb-16 text-center">
			<span class="inline-block px-4 py-2 rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-sm font-medium mb-6">
				OUR PROPERTIES
			</span>
			
			<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent mb-6">
				Featured Industrial Spaces
			</h2>
			
			<p class="text-[var(--color-text-dark)]/60 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
				Discover premium warehouses, manufacturing facilities, and industrial lands 
				available for purchase or lease in Bengaluru and surrounding areas.
			</p>
		</header>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#if isLoaded}
				{#each properties as property, i}
					<article 
						class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
						in:fly={{ y: 20, duration: 600, delay: i * 100 }}>
						<div class="relative h-64 overflow-hidden">
							{#if property.images?.length > 0}
								<img 
									src={property.images[0]} 
									alt={property.title} 
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
							{:else}
								<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
									<span class="text-sm">No image available</span>
								</div>
							{/if}
							
							{#if property.featured}
								<div class="absolute top-4 right-4 z-10">
									<span class="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-white px-4 py-1.5 text-xs rounded-full uppercase tracking-wider font-semibold shadow-lg">
										Featured
									</span>
								</div>
							{/if}
							
							<div class="absolute bottom-4 left-4 z-10 flex items-center">
								<span class="flex items-center bg-white/95 text-[var(--color-text-dark)] rounded-full px-4 py-1.5 text-sm font-medium shadow-md backdrop-blur-sm">
									<MapPinIcon class="h-4 w-4 mr-1.5 text-[var(--color-secondary)]" />
									{property.location}
								</span>
							</div>
							
							<span class="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 text-xs rounded-full uppercase tracking-wider backdrop-blur-sm">
								{property.type}
							</span>
						</div>
						
						<div class="p-6">
							<h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
								{property.title}
							</h3>
							
							<div class="flex justify-between items-center mt-6 mb-6 border-t border-b border-gray-100 py-4">
								<div>
									<span class="text-[var(--color-text-dark)]/60 text-sm">Price</span>
									<p class="font-bold text-xl text-[var(--color-text-dark)]">{property.price}</p>
								</div>
								<div class="h-10 w-[1px] bg-gray-200"></div>
								<div>
									<span class="text-[var(--color-text-dark)]/60 text-sm">Area</span>
									<p class="font-bold text-xl text-[var(--color-text-dark)]">
										{property.area}
										<span class="text-sm font-normal">sqft</span>
									</p>
								</div>
							</div>
							
							<a href={`/properties/${property.id}`} 
							   class="group/btn relative inline-flex w-full items-center justify-center bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-300">
								<span>View Details</span>
								<ArrowRightIcon class="h-5 w-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
							</a>
						</div>
					</article>
				{/each}
			{:else}
				{#each Array(3) as _}
					<div class="bg-white rounded-2xl overflow-hidden shadow-sm p-4 animate-pulse">
						<div class="h-64 bg-gray-200 rounded-xl mb-4"></div>
						<div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
						<div class="h-4 bg-gray-200 rounded w-1/2"></div>
					</div>
				{/each}
			{/if}
		</div>
		
		<footer class="mt-16 text-center">
			<a href="/properties" 
			   class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl relative">
				<span class="relative z-10 font-medium">View All Properties</span>
				<ArrowRightIcon class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform relative z-10" />
				<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			</a>
		</footer>
	</div>
</section>