<script lang="ts">
import { pb } from '$lib/pocketbase'
import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'
import MapPinIcon from 'lucide-svelte/icons/map-pin'

// Define features type
interface PropertyFeatures {
	amenities?: string[]
	specifications?: string[]
	[key: string]: unknown
}

interface Property {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	type: string
	featured: boolean
	location: string
	title: string
	price: string | number
	area: number
	description: string
	images: string[]
	status: string
	slug: string
	features: PropertyFeatures | null
}

let properties: Property[] = []
// biome-ignore lint/style/useConst: <explanation>
let filter = 'all'

function handleImageError(event: Event) {
	const img = event.target as HTMLImageElement
	img.src = '/images/placeholder.jpg'
}

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
				// Transform images to proper dimensions
				images: item.images.map((img) => {
					// If the image is already a full URL, use it as is
					if (img.startsWith('http')) return img
					// Otherwise, generate a thumbnail URL
					return pb.files.getUrl(item, img, { thumb: '600x400' })
				})
			}
		})
		console.log('Final properties:', properties)
	} catch (error) {
		console.error('Error loading properties:', error)
	}
}

$: filteredProperties =
	filter === 'all' ? properties : properties.filter((p) => p.type === filter)

$: {
	console.log('Filtered properties:', filteredProperties)
}

loadProperties()
</script>

<section class="py-24 px-6 md:px-16 bg-gray-50">
    <div class="container mx-auto">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div class="mb-8 md:mb-0">
                <span class="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-block mb-4">OUR PROPERTIES</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#001233] to-[#003366] mb-4">Featured Industrial Spaces</h2>
                <p class="text-gray-600 mt-4 max-w-2xl text-lg">Discover premium warehouses, manufacturing facilities, and industrial lands available for purchase or lease in Bengaluru and surrounding areas.</p>
            </div>
            
            <nav class="flex items-center space-x-3 bg-white rounded-full shadow-sm p-1.5 border border-gray-100">
                {#each [
                    {id: 'all', label: 'All'}, 
                    {id: 'Warehouse', label: 'Warehouses'}, 
                    {id: 'Manufacturing Facility', label: 'Manufacturing'}, 
                    {id: 'Industrial Land', label: 'Land'}
                ] as {id, label}}
                    <button 
                        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 {filter === id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}"
                        on:click={() => filter = id}
                    >
                        {label}
                    </button>
                {/each}
            </nav>
        </header>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each filteredProperties as property}
                <article class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
                    <div class="relative h-60 overflow-hidden bg-gray-100">
                        {#if property.images?.length > 0}
                            <img 
                                src={property.images[0]} 
                                alt={property.title} 
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                on:error={handleImageError}
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                        {:else}
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                <span class="text-sm">No image available</span>
                            </div>
                        {/if}
                        
                        {#if property.featured}
                            <span class="absolute top-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 text-xs rounded-full uppercase tracking-wider font-semibold shadow-lg">Featured</span>
                        {/if}
                        
                        <span class="absolute bottom-4 left-4 z-10 flex items-center bg-white/90 text-gray-800 rounded-full px-4 py-1.5 text-sm font-medium shadow-md">
                            <MapPinIcon class="h-4 w-4 mr-1 text-blue-600" />
                            {property.location}
                        </span>
                        
                        <span class="absolute top-4 left-4 z-10 bg-gray-900/80 text-white px-3 py-1 text-xs rounded-full uppercase tracking-wider">{property.type}</span>
                    </div>
                    
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                        
                        <div class="flex justify-between items-center mt-6 mb-6 border-t border-b border-gray-100 py-4">
                            <div>
                                <span class="text-gray-500 text-sm">Price</span>
                                <p class="font-bold text-xl text-gray-800">{property.price}</p>
                            </div>
                            <div class="h-10 w-[1px] bg-gray-200"></div>
                            <div>
                                <span class="text-gray-500 text-sm">Area</span>
                                <p class="font-bold text-xl text-gray-800">{property.area?.toLocaleString() ?? 0} <span class="text-sm font-normal">sqft</span></p>
                            </div>
                        </div>
                        
                        <a href={`/properties/${property.id}`} class="inline-block w-full text-center bg-gray-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-gray-200 hover:border-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300">View Details</a>
                    </div>
                </article>
            {/each}
        </div>
        
        <footer class="mt-16 text-center">
            <a href="/properties" class="inline-flex items-center justify-center bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 font-medium py-3 px-8 rounded-full transition-all duration-300 group">
                View All Properties
                <ArrowRightIcon class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
        </footer>
    </div>
</section>