<script lang="ts">
import { onMount } from 'svelte'

let isLoaded = false
let scrollY: number
let mouseX = 0
let mouseY = 0

function handleMouseMove(event: MouseEvent) {
	mouseX = (event.clientX / window.innerWidth - 0.5) * 20
	mouseY = (event.clientY / window.innerHeight - 0.5) * 20
}

onMount(() => {
	setTimeout(() => {
		isLoaded = true
	}, 100)
})
</script>

<svelte:window bind:scrollY on:mousemove={handleMouseMove}/>

<div class="relative min-h-[90vh] w-full overflow-hidden bg-[var(--color-primary-dark)]">
    <!-- Animated gradient background -->
    <div 
        class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)] animate-gradient"
        style="transform: translate3d({mouseX * 0.5}px, {mouseY * 0.5}px, 0) scale(1.1)"
    ></div>
    
    <!-- Parallax geometric shapes -->
    <div class="absolute inset-0 opacity-20">
        <!-- Large circle -->
        <div 
            class="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full border-2 border-white/20"
            style="transform: translate3d({mouseX * 0.8}px, {mouseY * 0.8}px, 0) rotate({scrollY * 0.02}deg)"
        ></div>
        
        <!-- Medium circle -->
        <div 
            class="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] rounded-full border-2 border-white/10"
            style="transform: translate3d({mouseX * 0.6}px, {mouseY * 0.6}px, 0) rotate(-{scrollY * 0.03}deg)"
        ></div>
        
        <!-- Small circle -->
        <div 
            class="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] rounded-full bg-white/5"
            style="transform: translate3d({mouseX * 0.4}px, {mouseY * 0.4}px, 0)"
        ></div>

        <!-- Additional shapes -->
        <div 
            class="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] rotate-45 border-2 border-white/15"
            style="transform: translate3d({mouseX * 0.7}px, {mouseY * 0.7}px, 0) rotate({scrollY * 0.04}deg)"
        ></div>

        <div 
            class="absolute bottom-1/3 right-1/4 w-[15rem] h-[15rem] transform rotate-[30deg] border-2 border-white/10"
            style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); transform: translate3d({mouseX * 0.5}px, {mouseY * 0.5}px, 0)"
        ></div>

        <div 
            class="absolute top-1/2 left-1/2 w-[35rem] h-[35rem] border-2 border-white/10"
            style="clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); transform: translate3d({mouseX * 0.3}px, {mouseY * 0.3}px, 0) rotate({scrollY * 0.01}deg)"
        ></div>
        
        <!-- Floating dots grid with larger dots -->
        <div class="absolute inset-0 opacity-40"
             style="background-image: radial-gradient(circle at 2rem 2rem, var(--color-text) 0.5rem, transparent 0.5rem);
                    background-size: 8rem 8rem;
                    transform: translate3d({mouseX * 0.2}px, {mouseY * 0.2}px, 0)">
        </div>
    </div>
    
    <!-- Content container -->
    <div class="relative h-full flex items-center">
        <div class="container mx-auto px-6 md:px-16 py-24">
            <div class="max-w-4xl transition-all duration-1000 animate-slide-up"
                 class:opacity-0={!isLoaded} 
                 class:translate-y-10={!isLoaded}>
                <span class="inline-block px-4 py-2 rounded-full bg-white/20 text-[var(--color-text)] text-sm font-medium mb-8 backdrop-blur-sm border border-white/30">
                    Industrial & Commercial Real Estate Specialists
                </span>
                
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-tight mb-8">
                    Discover Premium
                    <span class="bg-gradient-to-r from-white/90 to-[var(--color-accent)]/90 text-transparent bg-clip-text">
                        Industrial & Commercial Spaces
                    </span>
                    <br />in Bengaluru
                </h1>
                
                <p class="text-xl md:text-2xl text-[var(--color-text)]/80 mb-12 font-light max-w-2xl leading-relaxed">
                    Your trusted partner for buying, selling, and renting premium industrial 
                    and commercial properties with expert guidance
                </p>
                
                <div class="flex flex-col sm:flex-row gap-6">
                    <a href="/properties" 
                       class="group relative px-8 py-4 bg-[var(--color-text)] text-[var(--color-primary)] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span class="relative font-semibold text-lg group-hover:text-white">Explore Properties</span>
                    </a>
                    
                    <a href="/contact" 
                       class="group px-8 py-4 bg-transparent text-[var(--color-text)] border-2 border-white/20 rounded-full backdrop-blur-sm hover:border-white/40 transition-all duration-500 hover:scale-105">
                        <span class="font-semibold text-lg">Contact Us</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .animate-gradient {
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
    }
</style>
