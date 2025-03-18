<script lang="ts">
// Animation values
let isLoaded = false

// Set isLoaded to true after component is mounted for animations
import { onMount } from 'svelte'

onMount(() => {
	setTimeout(() => {
		isLoaded = true
	}, 100)
})
</script>

<div class="relative h-[85vh] w-full overflow-hidden">
    <!-- Gradient overlay for better text contrast -->
    <div class="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/70 to-transparent z-10"></div>
    
    <!-- Background image with overlay effect -->
    <div class="absolute inset-0 bg-cover bg-center"
         style="background-image: url('/images/buildings-hero.jpg');">
        <!-- Dark scrim layer -->
        <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>
    
    <!-- Animated geometric shapes for modern look -->
    <div class="absolute inset-0 opacity-20">
        <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border-4 border-secondary opacity-20 transform rotate-45"></div>
        <div class="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full border-4 border-accent opacity-10"></div>
        <div class="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-primary-light opacity-5"></div>
    </div>
    
    <!-- Content container -->
    <div class="relative z-20 h-full flex items-center">
        <div class="container mx-auto px-6 md:px-16">
            <div class="max-w-3xl transition-all duration-1000 transform translate-y-0 opacity-100" 
                 class:opacity-0={!isLoaded} 
                 class:translate-y-10={!isLoaded}>
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
                    Premium <span class="text-accent">Industrial Properties</span> in Bengaluru
                </h1>
                <p class="text-xl text-text mb-10 font-light max-w-2xl">
                    Find the perfect warehouse or industrial property with expert guidance and transparent service
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/properties" class="bg-primary hover:bg-primary-dark text-text font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-hover text-center">
                        Explore Properties
                    </a>
                    <a href="/contact" class="bg-transparent hover:bg-white/10 text-text border border-white/30 font-medium py-3 px-8 rounded-full transition-all duration-300 hover:border-white/60 text-center">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-text opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
</div>
