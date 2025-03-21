<div class="relative py-32 overflow-hidden bg-[var(--color-primary-dark)]">
    <!-- Animated gradient background -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)] opacity-90 animate-gradient"
    ></div>

    <!-- Decorative elements -->
    <div class="absolute inset-0">
        <!-- Large circle -->
        <div
            class="absolute -top-1/4 -right-1/4 w-[40rem] h-[40rem] rounded-full border border-white/10"
        ></div>

        <!-- Medium circle -->
        <div
            class="absolute -bottom-1/4 -left-1/4 w-[30rem] h-[30rem] rounded-full border border-white/10"
        ></div>

        <!-- Diagonal lines -->
        <div
            class="absolute top-0 left-0 w-full h-full"
            style="background-image: linear-gradient(45deg, var(--color-text) 1px, transparent 1px);
                   background-size: 5rem 5rem;
                   opacity: 0.05;"
        ></div>

        <!-- Crossing lines -->
        <div
            class="absolute top-0 left-0 w-full h-full"
            style="background-image: linear-gradient(-45deg, var(--color-text) 1px, transparent 1px);
                   background-size: 5rem 5rem;
                   opacity: 0.05;"
        ></div>

        <!-- Hexagon pattern -->
        <div
            class="absolute top-0 left-0 w-full h-full opacity-5"
            style="background-image: url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 20V40L30 55L5 40V20L30 5Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E');
                   background-size: 4rem 4rem;"
        ></div>

        <!-- Floating dots -->
        <div
            class="absolute inset-0 opacity-10"
            style="background-image: radial-gradient(circle at 1rem 1rem, var(--color-text) 0.15rem, transparent 0.15rem);
                    background-size: 4rem 4rem;"
        ></div>

        <!-- Wavy lines -->
        <div
            class="absolute top-0 left-0 w-full h-full opacity-10"
            style="background-image: repeating-linear-gradient(0deg, var(--color-text), var(--color-text) 1px, transparent 1px, transparent 20px);
                   background-size: 100% 20px;
                   transform: rotate(30deg)"
        ></div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 md:px-16 relative">
        <div class="max-w-4xl mx-auto text-center">
            <span
                class="inline-block px-4 py-2 rounded-full bg-white/10 text-[var(--color-text)] text-sm font-medium mb-8 backdrop-blur-sm border border-white/20"
            >
                EXPAND YOUR BUSINESS
            </span>

            <h2
                class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            >
                Looking for Premium
                <span
                    class="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-transparent bg-clip-text"
                >
                    Industrial & Commercial Space?
                </span>
            </h2>

            <p
                class="text-xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
            >
                From warehouses to manufacturing facilities, offices to
                industrial land - we're your trusted partner in finding,
                acquiring, or leasing the perfect commercial property in
                Bengaluru.
            </p>

            <div
                class="flex flex-col sm:flex-row justify-center items-center gap-6"
            >
                <a
                    href="/contact"
                    class="group relative px-8 py-4 bg-white text-[var(--color-primary)] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                    <span
                        class="relative font-semibold text-lg group-hover:text-white"
                        >Contact Us (Free Consultation)</span
                    >
                </a>

                <a
                    href="/properties"
                    class="group px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full backdrop-blur-sm hover:border-white/40 transition-all duration-500 hover:scale-105 w-full sm:w-auto"
                >
                    <span class="font-semibold text-lg">Browse Properties</span>
                </a>
            </div>
        </div>
    </div>
</div>
