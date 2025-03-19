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
        
        <!-- Floating dots grid -->
        <div class="absolute inset-0 opacity-30"
             style="background-image: radial-gradient(circle at 1rem 1rem, var(--color-text) 0.15rem, transparent 0.15rem);
                    background-size: 4rem 4rem;
                    transform: translate3d({mouseX * 0.2}px, {mouseY * 0.2}px, 0)">
        </div>
    </div>
    
    <!-- Content container -->
    <div class="relative h-full flex items-center">
        <div class="container mx-auto px-6 md:px-16 py-24">
            <div class="max-w-4xl transition-all duration-1000 animate-slide-up"
                 class:opacity-0={!isLoaded} 
                 class:translate-y-10={!isLoaded}>
                <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-[var(--color-text)] text-sm font-medium mb-8 backdrop-blur-sm border border-white/20">
                    Premium Industrial Properties
                </span>
                
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-tight mb-8">
                    Discover Exceptional
                    <span class="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-transparent bg-clip-text">
                        Industrial Spaces
                    </span>
                    <br />in Bengaluru
                </h1>
                
                <p class="text-xl md:text-2xl text-[var(--color-text)]/80 mb-12 font-light max-w-2xl leading-relaxed">
                    Find the perfect warehouse or industrial property with expert guidance 
                    and unparalleled service excellence
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
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span class="text-[var(--color-text)]/60 text-sm mb-2">Scroll to explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[var(--color-text)]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
</div>

<style>
    .animate-gradient {
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
    }
</style>
