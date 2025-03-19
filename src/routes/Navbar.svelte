<script lang="ts">
import { onMount } from 'svelte'

let isScrolled = false
let isMenuOpen = false

function handleScroll() {
	isScrolled = window.scrollY > 20
}

onMount(() => {
	window.addEventListener('scroll', handleScroll)
	return () => window.removeEventListener('scroll', handleScroll)
})
</script>

<svelte:window on:scroll={handleScroll} />

<header 
    class="fixed top-0 left-0 right-0 z-50 bg-white"
    class:shadow-sm={isScrolled}
>
    <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="/" class="flex items-center">
                <span class="text-lg font-bold text-[var(--color-primary)]">Sandesh Prakash</span>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-6">
                <a 
                    href="/properties" 
                    class="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
                >
                    Properties
                </a>
                <a 
                    href="/about" 
                    class="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
                >
                    About
                </a>
                <a 
                    href="/contact" 
                    class="text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
                >
                    Contact
                </a>
                <a 
                    href="/dashboard" 
                    class="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    Dashboard
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button 
                class="md:hidden p-2"
                on:click={() => isMenuOpen = !isMenuOpen}
                aria-label="Toggle menu"
            >
                <svg 
                    class="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    {#if isMenuOpen}
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M6 18L18 6M6 6l12 12"
                        />
                    {:else}
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    {/if}
                </svg>
            </button>
        </div>

        <!-- Mobile Navigation -->
        {#if isMenuOpen}
            <div class="md:hidden py-2 border-t">
                <div class="flex flex-col space-y-2">
                    <a 
                        href="/properties" 
                        class="px-4 py-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
                        on:click={() => isMenuOpen = false}
                    >
                        Properties
                    </a>
                    <a 
                        href="/about" 
                        class="px-4 py-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
                        on:click={() => isMenuOpen = false}
                    >
                        About
                    </a>
                    <a 
                        href="/contact" 
                        class="px-4 py-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
                        on:click={() => isMenuOpen = false}
                    >
                        Contact
                    </a>
                    <a 
                        href="/dashboard" 
                        class="mx-4 py-2 bg-[var(--color-primary)] text-white text-center rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
                        on:click={() => isMenuOpen = false}
                    >
                        Dashboard
                    </a>
                </div>
            </div>
        {/if}
    </nav>
</header>

<!-- Spacer to prevent content from hiding under fixed navbar -->
<div class="h-16"></div>
