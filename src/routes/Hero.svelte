<script lang="ts">
// Animation values
let isLoaded = false
let scrollY: number

// Set isLoaded to true after component is mounted for animations
import { onMount } from 'svelte'

onMount(() => {
	setTimeout(() => {
		isLoaded = true
	}, 100)
})
</script>

<svelte:window bind:scrollY />

<div class="relative h-[85vh] w-full overflow-hidden">
    <!-- Animated gradient background -->
    <div 
        class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-accent)] animate-gradient bg-[length:400%_400%] z-0"
        style="transform: translateY({scrollY * 0.5}px)"
    >
    </div>
    
    <!-- Overlay gradient for better text contrast -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
    
    <!-- Animated geometric shapes -->
    <div class="absolute inset-0 opacity-20 z-20">
        <div 
            class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border-4 border-[var(--color-text)] opacity-20 transform rotate-45"
            style="transform: translate({scrollY * 0.2}px, {-scrollY * 0.1}px) rotate(45deg)"
        ></div>
        <div 
            class="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full border-4 border-[var(--color-accent)] opacity-10"
            style="transform: translate({-scrollY * 0.15}px, {scrollY * 0.1}px)"
        ></div>
        <div 
            class="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-[var(--color-text)] opacity-5"
            style="transform: translate({scrollY * 0.1}px, {scrollY * 0.2}px)"
        ></div>
    </div>
    
    <!-- Content container -->
    <div class="relative z-30 h-full flex items-center">
        <div class="container mx-auto px-6 md:px-16">
            <div class="max-w-3xl transition-all duration-1000 transform translate-y-0 opacity-100" 
                 class:opacity-0={!isLoaded} 
                 class:translate-y-10={!isLoaded}>
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-tight mb-8 drop-shadow-lg">
                    Premium <span class="text-[var(--color-accent)]">Industrial Properties</span> in Bengaluru
                </h1>
                <p class="text-xl md:text-2xl text-[var(--color-text)] mb-12 font-light max-w-2xl drop-shadow-md">
                    Find the perfect warehouse or industrial property with expert guidance and transparent service
                </p>
                <div class="flex flex-col sm:flex-row gap-6">
                    <a href="/properties" class="bg-[var(--color-text)] text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)] font-medium py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] text-center text-lg">
                        Explore Properties
                    </a>
                    <a href="/contact" class="bg-transparent hover:bg-white/10 text-[var(--color-text)] border-2 border-[var(--color-text)] font-medium py-4 px-10 rounded-full transition-all duration-300 hover:border-[var(--color-accent)] text-center text-lg">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[var(--color-text)] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
</div>

<style lang="postcss">
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-gradient {
        animation: gradient 15s ease infinite;
    }
</style>
