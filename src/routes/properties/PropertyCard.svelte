<script lang="ts">
interface Property {
	id: number
	title: string
	location: string
	area: string
	type: string
	price: string
	image: string
}

export let property: Property
</script>

<div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] group">
    <div class="relative h-64 overflow-hidden">
        <img 
            src={property.image} 
            alt={property.title}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span class="text-sm font-medium text-[var(--color-primary)]">{property.type}</span>
        </div>
    </div>
    <div class="p-6">
        <h3 class="text-xl font-bold text-[var(--color-text-dark)] mb-2">{property.title}</h3>
        <div class="flex items-center text-gray-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location}
        </div>
        <div class="flex items-center text-gray-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.area}
        </div>
        <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-[var(--color-primary)]">{property.price}</span>
            <a 
                href="/contact" 
                class="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
            >
                Enquire Now
            </a>
        </div>
    </div>
</div> 