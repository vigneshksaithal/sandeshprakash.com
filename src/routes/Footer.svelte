<script lang="ts">
const quickLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Properties', href: '/properties' },
	{ label: 'Contact', href: '/contact' }
]

const propertyTypes = [
	{ label: 'Warehouses', href: '/properties/warehouses' },
	{ label: 'Manufacturing Facilities', href: '/properties/manufacturing' },
	{ label: 'Industrial Land', href: '/properties/land' },
	{ label: 'Office Spaces', href: '/properties/office' }
]

const currentYear = new Date().getFullYear()
</script>

<footer class="relative">
    <!-- Top wave decoration -->
    <div class="absolute top-0 left-0 right-0 w-full overflow-hidden" style="height: 60px; transform: translateY(-99%);">
        <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" style="fill: #0A1928; width: 100%; height: 60px; transform: rotate(180deg);">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
    </div>

    <!-- Footer main content -->
    <div class="bg-gradient-to-b from-[#0A1928] to-[#001233] text-white pt-24 pb-10">
        <div class="container mx-auto px-6 md:px-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
                <!-- Company info -->
                <div class="md:col-span-4">
                    <a href="/" class="inline-block mb-6">
                        <h3 class="text-2xl font-bold">
                            <span class="text-white">Sandesh Prakash</span>
                            <span class="text-blue-400">Real Estate</span>
                        </h3>
                    </a>
                    <p class="text-gray-400 mb-8 leading-relaxed">
                        Bengaluru's premier industrial real estate firm specializing in 
                        warehouses, manufacturing facilities, and industrial land.
                    </p>
                    
                    <!-- Social media -->
                    <div class="flex space-x-4">
                        <a href="#" class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a href="#" class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#" class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="#" class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div class="md:col-span-2">
                    <h4 class="text-lg font-medium mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-blue-400 mr-2"></span>
                        Quick Links
                    </h4>
                    <ul class="space-y-3">
                        {#each quickLinks as link}
                            <li>
                                <a href={link.href} class="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                                    <span class="w-0 h-[1px] bg-blue-400 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                                    {link.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
                
                <!-- Property Types -->
                <div class="md:col-span-2">
                    <h4 class="text-lg font-medium mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-blue-400 mr-2"></span>
                        Property Types
                    </h4>
                    <ul class="space-y-3">
                        {#each propertyTypes as link}
                            <li>
                                <a href={link.href} class="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                                    <span class="w-0 h-[1px] bg-blue-400 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                                    {link.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
                
                <!-- Contact Info -->
                <div class="md:col-span-4">
                    <h4 class="text-lg font-medium mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-blue-400 mr-2"></span>
                        Contact Us
                    </h4>
                    <ul class="space-y-4">
                        <li class="flex items-start text-gray-400 hover:text-gray-300 transition-colors duration-300 group">
                            <div class="mt-0.5 mr-3 bg-white/10 group-hover:bg-blue-600/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span>+91 98765 43210</span>
                        </li>
                        <li class="flex items-start text-gray-400 hover:text-gray-300 transition-colors duration-300 group">
                            <div class="mt-0.5 mr-3 bg-white/10 group-hover:bg-blue-600/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span>info@sandeshprakash.com</span>
                        </li>
                        <li class="flex items-start text-gray-400 hover:text-gray-300 transition-colors duration-300 group">
                            <div class="mt-0.5 mr-3 bg-white/10 group-hover:bg-blue-600/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span>123 Tech Park, Koramangala,<br />Bengaluru, Karnataka 560034</span>
                        </li>
                    </ul>
                    
                    <!-- Newsletter sign-up -->
                    <div class="mt-8 pt-8 border-t border-gray-800">
                        <h4 class="text-lg font-medium mb-4">Newsletter</h4>
                        <p class="text-gray-400 mb-4">Subscribe to get updates on our latest properties</p>
                        <div class="flex">
                            <input type="email" placeholder="Your email" class="bg-white/10 border border-gray-700 rounded-l-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow" />
                            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-t border-gray-800 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-500 text-sm mb-4 md:mb-0">
                        © {currentYear} Sandesh Prakash Real Estate. All rights reserved.
                    </p>
                    <div class="flex space-x-6">
                        <a href="/privacy-policy" class="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
                        <a href="/terms" class="text-gray-500 hover:text-white text-sm">Terms of Service</a>
                        <a href="/sitemap" class="text-gray-500 hover:text-white text-sm">Sitemap</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer> 