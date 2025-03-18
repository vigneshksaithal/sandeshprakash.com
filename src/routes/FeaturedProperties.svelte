<script lang="ts">
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

// For property filtering functionality
let filter = 'all'
$: filteredProperties =
	filter === 'all'
		? properties
		: properties.filter((p) => p.type.toLowerCase() === filter.toLowerCase())

const changeFilter = (newFilter: string) => {
	filter = newFilter
}
</script>

<div class="py-24 px-6 md:px-16 bg-gray-50">
    <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div class="mb-8 md:mb-0">
                <span class="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-block mb-4">OUR PROPERTIES</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#001233] to-[#003366] mb-4">
                    Featured Industrial Spaces
                </h2>
                <p class="text-gray-600 mt-4 max-w-2xl text-lg">
                    Discover premium warehouses, manufacturing facilities, and industrial lands available for purchase or lease in Bengaluru and surrounding areas.
                </p>
            </div>
            
            <div class="flex items-center space-x-3 bg-white rounded-full shadow-sm p-1.5 border border-gray-100">
                <button 
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 {filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}"
                    on:click={() => changeFilter('all')}
                >
                    All
                </button>
                <button 
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 {filter === 'warehouse' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}"
                    on:click={() => changeFilter('warehouse')}
                >
                    Warehouses
                </button>
                <button 
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 {filter === 'industrial land' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}"
                    on:click={() => changeFilter('industrial land')}
                >
                    Land
                </button>
            </div>
        </div>
        
        <!-- Property Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each filteredProperties as property}
                <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
                    <div class="relative h-60 overflow-hidden">
                        <img src={property.image} alt={property.name} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        <!-- Overlay gradient -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                        
                        {#if property.featured}
                            <div class="absolute top-4 right-4 z-10">
                                <span class="bg-blue-600 text-white px-3 py-1 text-xs rounded-full uppercase tracking-wider font-semibold shadow-lg">Featured</span>
                            </div>
                        {/if}
                        
                        <!-- Location tag with shadow effect for better readability -->
                        <div class="absolute bottom-4 left-4 z-10">
                            <span class="flex items-center bg-white/90 text-gray-800 rounded-full px-4 py-1.5 text-sm font-medium shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {property.location}
                            </span>
                        </div>
                        
                        <!-- Property type badge -->
                        <div class="absolute top-4 left-4 z-10">
                            <span class="bg-gray-900/80 text-white px-3 py-1 text-xs rounded-full uppercase tracking-wider">{property.type}</span>
                        </div>
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
                        
                        <div class="text-gray-500 text-sm mb-6 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <span class="font-mono">{property.address}</span>
                        </div>
                        
                        <a href={`/properties/${property.id}`} class="inline-block w-full text-center bg-gray-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-gray-200 hover:border-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300">
                            View Details
                        </a>
                    </div>
                </div>
            {/each}
        </div>
        
        <!-- View all properties button -->
        <div class="mt-16 text-center">
            <a href="/properties" class="inline-flex items-center justify-center bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 font-medium py-3 px-8 rounded-full transition-all duration-300 group">
                View All Properties
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
    </div>
</div> 