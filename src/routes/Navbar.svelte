<script lang="ts">
const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
]

let isMenuOpen = false

function toggleMenu() {
	isMenuOpen = !isMenuOpen
}
</script>

<nav class="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-[var(--color-text)] py-6 px-6 md:px-16 fixed w-full z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
    <div class="container mx-auto flex justify-between items-center">
        <a href="/" class="text-[var(--color-text)] font-bold text-2xl relative group">
            <span class="inline-block transition-transform group-hover:translate-x-1 duration-300">Sandesh Prakash</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
        </a>
        
        <div class="hidden md:flex items-center space-x-12">
            {#each navLinks as link}
                <a href={link.href} class="relative font-medium text-[var(--color-text)]/90 hover:text-[var(--color-text)] transition duration-300 group">
                    {link.label}
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                </a>
            {/each}
            <a href="/contact" class="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-secondary)] px-8 py-3 rounded-full text-[var(--color-text)] font-medium shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 transform hover:-translate-y-0.5">
                Get In Touch
            </a>
        </div>
        
        <button class="md:hidden text-[var(--color-text)] focus:outline-none" on:click={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>

    {#if isMenuOpen}
        <div class="md:hidden absolute top-full left-0 right-0 bg-[var(--color-primary-dark)] shadow-[var(--shadow-card)] py-6 px-8 transition-all duration-300 ease-in-out transform origin-top" 
             class:opacity-0={!isMenuOpen}
             class:scale-y-0={!isMenuOpen}
             class:opacity-100={isMenuOpen}
             class:scale-y-100={isMenuOpen}>
            {#each navLinks as link}
                <a href={link.href} class="block py-3 text-[var(--color-text)]/90 hover:text-[var(--color-text)] transition duration-300 text-lg">
                    {link.label}
                </a>
            {/each}
            <a href="/contact" class="block py-3 mt-4 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-[var(--color-secondary)] px-8 rounded-full text-[var(--color-text)] font-medium text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                Get In Touch
            </a>
        </div>
    {/if}
</nav>

<!-- Add padding to push content below fixed navbar -->
<div class="h-24"></div>
