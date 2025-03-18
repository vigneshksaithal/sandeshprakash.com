<script lang="ts">
const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
]
</script>

<nav class="bg-gradient-to-r from-[#001233] to-[#062a4f] text-white py-5 px-6 md:px-16 fixed w-full z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
    <div class="container mx-auto flex justify-between items-center">
        <a href="/" class="text-white font-bold text-xl relative group">
            <span class="inline-block transition-transform group-hover:translate-x-1 duration-300">Sandesh Prakash</span>
            <span class="text-blue-400 ml-1">Real Estate</span>
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        
        <div class="hidden md:flex items-center space-x-10">
            {#each navLinks as link}
                <a href={link.href} class="relative font-medium text-gray-100 hover:text-white transition duration-300 group">
                    {link.label}
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
            {/each}
            <a href="/get-in-touch" class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2.5 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Get In Touch
            </a>
        </div>
        
        <button class="md:hidden text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
</nav>

<!-- Add padding to push content below fixed navbar -->
<div class="h-20"></div>
