<script lang="ts">
import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import type { Property } from '$lib/pocketbase'
import Footer from '../../Footer.svelte'
import Navbar from '../../Navbar.svelte'
import type { PageData } from './$types'

export let data: PageData
const property: Property | null = data.property
const error: string | null = data.error ?? null
let currentImageIndex = 0

const getImageUrl = (property: Property, image: string) =>
	`${PUBLIC_POCKETBASE_URL}/api/files/${property.collectionId}/${property.id}/${image}`

const nextImage = () => {
	if (property?.images) {
		currentImageIndex = (currentImageIndex + 1) % property.images.length
	}
}

const prevImage = () => {
	if (property?.images) {
		currentImageIndex =
			(currentImageIndex - 1 + property.images.length) % property.images.length
	}
}
</script>

<Navbar />

<main class="min-h-screen bg-[var(--color-gray-light)]">
    <div class="container mx-auto px-6 md:px-16 py-16">
        {#if error}
            <div class="text-center py-12">
                <p class="text-red-500">{error}</p>
            </div>
        {:else if property}
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                <!-- Image Gallery -->
                {#if property.images && property.images.length > 0}
                    <div class="relative h-[60vh]">
                        <!-- Main Image -->
                        <img 
                            src={getImageUrl(property, property.images[currentImageIndex])}
                            alt={`${property.title} - Image ${currentImageIndex + 1}`}
                            class="w-full h-full object-cover"
                        />
                        
                        <!-- Navigation Arrows -->
                        {#if property.images.length > 1}
                            <button 
                                class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                on:click={prevImage}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                on:click={nextImage}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <!-- Image Counter -->
                            <div class="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                                {currentImageIndex + 1} / {property.images.length}
                            </div>
                        {/if}

                        <!-- Thumbnail Navigation -->
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                            <div class="flex gap-2 overflow-x-auto pb-2 snap-x">
                                {#each property.images as image, index}
                                    <button
                                        class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden {currentImageIndex === index ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'}"
                                        on:click={() => currentImageIndex = index}
                                    >
                                        <img
                                            src={getImageUrl(property, image)}
                                            alt={`${property.title} - Thumbnail ${index + 1}`}
                                            class="w-full h-full object-cover"
                                        />
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Property Details -->
                <div class="p-8 md:p-12">
                    <div class="flex flex-wrap items-start justify-between gap-4 mb-8">
                        <div>
                            <h1 class="text-4xl font-bold mb-2">{property.title}</h1>
                            <p class="text-gray-600 text-xl">{property.location}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-3xl font-bold text-[var(--color-primary)]">₹{property.price}</p>
                            <p class="text-gray-600">{property.area}</p>
                        </div>
                    </div>

                    <!-- Property Type -->
                    <div class="mb-8">
                        <span class="inline-block px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full font-medium">
                            {property.type}
                        </span>
                    </div>

                    <!-- Description -->
                    <div class="prose max-w-none">
                        <h2 class="text-2xl font-bold mb-4">About this property</h2>
                        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                            {property.description}
                        </p>
                    </div>

                    <!-- Contact Button -->
                    <div class="mt-12">
                        <a 
                            href="/contact" 
                            class="inline-block px-8 py-4 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary)]/90 transition-colors"
                        >
                            Contact Us About This Property
                        </a>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>

<Footer /> 