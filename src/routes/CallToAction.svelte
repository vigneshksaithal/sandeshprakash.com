<script lang="ts">
let mouseX = 0
let mouseY = 0

function handleMouseMove(event: MouseEvent) {
	const target = event.currentTarget as HTMLElement
	const rect = target.getBoundingClientRect()
	mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 20
	mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 20
}
</script>

<div class="relative py-32 overflow-hidden bg-[var(--color-primary-dark)]" on:mousemove={handleMouseMove}>
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)] opacity-90 animate-gradient"></div>
    
    <!-- Decorative elements with parallax -->
    <div class="absolute inset-0">
        <!-- Large circle -->
        <div 
            class="absolute -top-1/4 -right-1/4 w-[40rem] h-[40rem] rounded-full border border-white/10"
            style="transform: translate3d({mouseX * 0.8}px, {mouseY * 0.8}px, 0) rotate(15deg)"
        ></div>
        
        <!-- Medium circle -->
        <div 
            class="absolute -bottom-1/4 -left-1/4 w-[30rem] h-[30rem] rounded-full border border-white/10"
            style="transform: translate3d({mouseX * 0.6}px, {mouseY * 0.6}px, 0) rotate(-15deg)"
        ></div>
        
        <!-- Floating dots -->
        <div class="absolute inset-0 opacity-10"
             style="background-image: radial-gradient(circle at 1rem 1rem, var(--color-text) 0.15rem, transparent 0.15rem);
                    background-size: 4rem 4rem;
                    transform: translate3d({mouseX * 0.3}px, {mouseY * 0.3}px, 0)">
        </div>
    </div>
    
    <!-- Content -->
    <div class="container mx-auto px-6 md:px-16 relative">
        <div class="max-w-4xl mx-auto text-center">
            <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-[var(--color-text)] text-sm font-medium mb-8 backdrop-blur-sm border border-white/20">
                CONNECT WITH US
            </span>
            
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Ready to Find Your Perfect
                <span class="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-transparent bg-clip-text">
                    Industrial Space?
                </span>
            </h2>
            
            <p class="text-xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                Let our experts guide you through the process of finding the ideal warehouse, 
                manufacturing facility, or industrial land for your business needs.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="/contact" 
                   class="group relative px-8 py-4 bg-white text-[var(--color-primary)] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
                    <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span class="relative font-semibold text-lg group-hover:text-white">Schedule a Consultation</span>
                </a>
                
                <a href="/about" 
                   class="group px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full backdrop-blur-sm hover:border-white/40 transition-all duration-500 hover:scale-105 w-full sm:w-auto">
                    <span class="font-semibold text-lg">Learn More About Us</span>
                </a>
            </div>
        </div>
    </div>
</div>