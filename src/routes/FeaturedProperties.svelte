<script lang="ts">
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import ArrowRightIcon from 'lucide-svelte/icons/arrow-right'

interface Property {
	id: string
	type: string
	featured: boolean
	location: string
	name: string
	price: number
	size: number
	address: string
	image: string
}

const properties: Property[] = [
	{
		id: '1',
		type: 'Warehouse',
		featured: true,
		location: 'Bengaluru',
		name: 'Dekapere',
		price: 20,
		size: 1000,
		address: 'ID: #ABF7449-efgh-i3fk4-fgh21-12366fgh21k4',
		image: '/images/warehouse-placeholder.jpg'
	},
	{
		id: '2',
		type: 'Manufacturing Facility',
		featured: false,
		location: 'Electronics City',
		name: 'TechSpace',
		price: 35,
		size: 1800,
		address: 'ID: #BDF8329-ijkl-m5op6-qrs32-45678tuv32w5',
		image: '/images/warehouse-placeholder.jpg'
	},
	{
		id: '3',
		type: 'Industrial Land',
		featured: true,
		location: 'Whitefield',
		name: 'Eastgate Industrial',
		price: 42,
		size: 2500,
		address: 'ID: #CGH9450-xyz1-a2bc3-def43-67890ghi43j6',
		image: '/images/warehouse-placeholder.jpg'
	}
]

let filter = 'all'
$: filteredProperties =
	filter === 'all'
		? properties
		: properties.filter((p) => p.type.toLowerCase() === filter.toLowerCase())
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
                {#each [{id: 'all', label: 'All'}, {id: 'warehouse', label: 'Warehouses'}, {id: 'industrial land', label: 'Land'}] as {id, label}}
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
                    <div class="relative h-60 overflow-hidden">
                        <img src={property.image} alt={property.name} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                        
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
                        <h3 class="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{property.name}</h3>
                        
                        <div class="flex justify-between items-center mt-6 mb-6 border-t border-b border-gray-100 py-4">
                            <div>
                                <span class="text-gray-500 text-sm">Price (Cr)</span>
                                <p class="font-bold text-xl text-gray-800">₹ {property.price}</p>
                            </div>
                            <div class="h-10 w-[1px] bg-gray-200"></div>
                            <div>
                                <span class="text-gray-500 text-sm">Area</span>
                                <p class="font-bold text-xl text-gray-800">{property.size.toLocaleString()} <span class="text-sm font-normal">sqft</span></p>
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