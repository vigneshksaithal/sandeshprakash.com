<script lang="ts">
</script>

<div class="relative min-h-[90vh] w-full overflow-hidden bg-[var(--color-primary-dark)]">
    <!-- Static gradient background -->
    <div 
        class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)]"
    ></div>
    
    <!-- Geometric shapes -->
    <div class="absolute inset-0 opacity-20">
        <!-- Large circle -->
        <div 
            class="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full border-2 border-white/20"
        ></div>
        
        <!-- Medium circle -->
        <div 
            class="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] rounded-full border-2 border-white/10"
        ></div>
        
        <!-- Small circle -->
        <div 
            class="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] rounded-full bg-white/5"
        ></div>

        <!-- Additional shapes -->
        <div 
            class="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] rotate-45 border-2 border-white/15"
        ></div>

        <div 
            class="absolute bottom-1/3 right-1/4 w-[15rem] h-[15rem] transform rotate-[30deg] border-2 border-white/10"
            style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        ></div>

        <div 
            class="absolute top-1/2 left-1/2 w-[35rem] h-[35rem] border-2 border-white/10"
            style="clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
        ></div>
        
        <!-- Floating dots grid with larger dots -->
        <div class="absolute inset-0 opacity-40"
             style="background-image: radial-gradient(circle at 2rem 2rem, var(--color-text) 0.5rem, transparent 0.5rem);
                    background-size: 8rem 8rem;">
        </div>
    </div>
    
    <!-- Content container -->
    <div class="relative h-full flex items-center">
        <div class="container mx-auto px-6 md:px-16 py-24">
            <div class="max-w-4xl">
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
