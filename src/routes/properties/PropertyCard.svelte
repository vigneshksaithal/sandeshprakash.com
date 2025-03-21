<script lang="ts">
import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import type { Property } from '$lib/pocketbase'

export let property: Property

const getImageUrl = (property: Property, image: string) =>
	`${PUBLIC_POCKETBASE_URL}/api/files/${property.collectionId}/${property.id}/${image}`
</script>

<a 
    href="/properties/{property.id}" 
    class="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
>
    {#if property.images?.length > 0}
        <div class="relative h-64">
            <img 
                src={getImageUrl(property, property.images[0])}
                alt={property.title}
                class="w-full h-full object-cover"
            />
            {#if property.featured}
                <span class="absolute top-4 right-4 px-3 py-1 bg-[var(--color-primary)] text-white text-sm font-medium rounded-full">
                    Featured
                </span>
            {/if}
        </div>
    {/if}

    <div class="p-6">
        <h3 class="text-2xl font-bold mb-2 text-[var(--color-text-dark)]">{property.title}</h3>
        <p class="text-gray-600 mb-4">{property.location}</p>
        
        <div class="flex items-center justify-between">
            <span class="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium">
                {property.type}
            </span>
            <div class="text-right">
                <p class="text-xl font-bold text-[var(--color-primary)]">₹{property.price}</p>
                <p class="text-sm text-gray-600">{property.area}</p>
            </div>
        </div>
    </div>
</a> 