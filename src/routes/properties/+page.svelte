<script lang="ts">
import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'
import CallToAction from '../CallToAction.svelte'
import PropertyCard from './PropertyCard.svelte'
import { properties } from './propertyData'
</script>

<Navbar />

<main class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-[var(--color-primary)] text-white py-32">
        <div class="container mx-auto px-6 md:px-16">
            <div class="max-w-4xl">
                <h1 class="text-5xl md:text-6xl font-bold mb-6">Our Properties</h1>
                <p class="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                    Discover premium industrial and commercial properties across Bengaluru. 
                    From warehouses to office spaces, we have the perfect space for your business.
                </p>
            </div>
        </div>
    </div>

    <!-- Properties Grid -->
    <div class="container mx-auto px-6 md:px-16 py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {#each properties as property (property.id)}
                <PropertyCard {property} />
            {/each}
        </div>
    </div>

    <CallToAction />
</main>

<Footer /> 