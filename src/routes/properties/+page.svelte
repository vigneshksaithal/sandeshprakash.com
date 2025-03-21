<script lang="ts">
import { pb } from '$lib/pocketbase'
import type { Property } from '$lib/pocketbase'
import { onMount } from 'svelte'
import CallToAction from '../CallToAction.svelte'
import Footer from '../Footer.svelte'
import Navbar from '../Navbar.svelte'
import PropertyCard from './PropertyCard.svelte'

let properties: Property[] = []
let loading = true
let error: string | null = null

let mouseX = 0
let mouseY = 0

const handleMouseMove = (event: MouseEvent) => {
	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
	mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 20
	mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 20
}

const fetchProperties = async () => {
	try {
		const records = await pb.collection('properties').getList(1, 50, {
			sort: '-created',
			filter: 'isActive = true'
		})
		properties = records.items as unknown as Property[]
	} catch (err) {
		error = 'Failed to load properties'
		console.error('Error fetching properties:', err)
	} finally {
		loading = false
	}
}

onMount(() => {
	fetchProperties()
})
</script>

<Navbar />

<main class="min-h-screen bg-[var(--color-gray-light)]">
    <!-- Hero Section -->
    <div class="relative bg-[var(--color-primary)] text-[var(--color-text)] py-32 overflow-hidden" on:mousemove={handleMouseMove}>
        <!-- Animated shapes -->
        <div class="absolute inset-0">
            <!-- Large circle -->
            <div 
                class="absolute -top-1/4 -right-1/4 w-[40rem] h-[40rem] rounded-full border border-[var(--color-text)]/10"
                style="transform: translate3d({mouseX * 0.8}px, {mouseY * 0.8}px, 0) rotate(15deg)"
            ></div>
            
            <!-- Medium circle -->
            <div 
                class="absolute -bottom-1/4 -left-1/4 w-[30rem] h-[30rem] rounded-full border border-[var(--color-text)]/10"
                style="transform: translate3d({mouseX * 0.6}px, {mouseY * 0.6}px, 0) rotate(-15deg)"
            ></div>
            
            <!-- Small circle -->
            <div 
                class="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] rounded-full bg-[var(--color-text)]/5"
                style="transform: translate3d({mouseX * 0.4}px, {mouseY * 0.4}px, 0)"
            ></div>

            <!-- Square -->
            <div 
                class="absolute bottom-1/3 right-1/4 w-[25rem] h-[25rem] rotate-45 border border-[var(--color-text)]/10"
                style="transform: translate3d({mouseX * 0.7}px, {mouseY * 0.7}px, 0)"
            ></div>

            <!-- Floating dots -->
            <div class="absolute inset-0 opacity-10"
                style="background-image: radial-gradient(circle at 1rem 1rem, var(--color-text) 0.15rem, transparent 0.15rem);
                        background-size: 4rem 4rem;
                        transform: translate3d({mouseX * 0.3}px, {mouseY * 0.3}px, 0)">
            </div>
        </div>

        <div class="container mx-auto px-6 md:px-16 relative">
            <div class="max-w-4xl">
                <h1 class="text-5xl md:text-6xl font-bold mb-6">Our Properties</h1>
                <p class="text-xl md:text-2xl text-[var(--color-text)]/90 max-w-2xl leading-relaxed">
                    Discover premium industrial and commercial properties across Bengaluru. 
                    From warehouses to office spaces, we have the perfect space for your business.
                </p>
            </div>
        </div>
    </div>

    <!-- Properties Grid -->
    <div class="container mx-auto px-6 md:px-16 py-24">
        {#if loading}
            <div class="flex items-center justify-center py-12">
                <div class="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        {:else if error}
            <div class="text-center py-12">
                <p class="text-red-500">{error}</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {#each properties as property (property.id)}
                    <PropertyCard {property} />
                {/each}
            </div>
        {/if}
    </div>

    <CallToAction />
</main>

<Footer />