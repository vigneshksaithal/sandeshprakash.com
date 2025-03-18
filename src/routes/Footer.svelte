<script lang="ts">
import FacebookIcon from 'lucide-svelte/icons/facebook'
import InstagramIcon from 'lucide-svelte/icons/instagram'
import LinkedinIcon from 'lucide-svelte/icons/linkedin'
import MailIcon from 'lucide-svelte/icons/mail'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import PhoneIcon from 'lucide-svelte/icons/phone'
import TwitterIcon from 'lucide-svelte/icons/twitter'

const quickLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Properties', href: '/properties' },
	{ label: 'Contact', href: '/contact' }
]

const propertyTypes = [
	{ label: 'Warehouses', href: '/properties/warehouses' },
	{
		label: 'Manufacturing Facilities',
		href: '/properties/manufacturing'
	},
	{ label: 'Industrial Land', href: '/properties/land' },
	{ label: 'Office Spaces', href: '/properties/office' }
]

const currentYear = new Date().getFullYear()
</script>

<footer class="relative">
    <!-- Top wave decoration -->
    <div
        class="absolute top-0 left-0 right-0 w-full overflow-hidden"
        style="height: 60px; transform: translateY(-99%);"
    >
        <svg
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            style="fill: #0A1928; width: 100%; height: 60px; transform: rotate(180deg);"
        >
            <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
            />
            <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
            />
            <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            />
        </svg>
    </div>

    <!-- Footer main content -->
    <div
        class="bg-gradient-to-b from-[#0A1928] to-[#001233] text-white pt-24 pb-10"
    >
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
                        Bengaluru's premier industrial real estate firm
                        specializing in warehouses, manufacturing facilities,
                        and industrial land.
                    </p>

                    <!-- Social media -->
                    <div class="flex space-x-4">
                        <a
                            href="#"
                            aria-label="Facebook"
                            class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                            <FacebookIcon class="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                            <TwitterIcon class="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                            <InstagramIcon class="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            class="bg-white/10 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        >
                            <LinkedinIcon class="h-5 w-5" />
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
                                <a
                                    href={link.href}
                                    class="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                                >
                                    <span
                                        class="w-0 h-[1px] bg-blue-400 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"
                                    ></span>
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
                                <a
                                    href={link.href}
                                    class="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                                >
                                    <span
                                        class="w-0 h-[1px] bg-blue-400 mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"
                                    ></span>
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
                        <li
                            class="flex items-start text-gray-400 hover:text-gray-300 transition-colors duration-300 group"
                        >
                            <div
                                class="mt-0.5 mr-3 bg-white/10 group-hover:bg-blue-600/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300"
                            >
                                <PhoneIcon class="h-4 w-4 text-blue-400" />
                            </div>
                            <span>+91 98765 43210</span>
                        </li>
                        <li
                            class="flex items-start text-gray-400 hover:text-gray-300 transition-colors duration-300 group"
                        >
                            <div
                                class="mt-0.5 mr-3 bg-white/10 group-hover:bg-blue-600/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300"
                            >
                                <MailIcon class="h-4 w-4 text-blue-400" />
                            </div>
                            <span>info@sandeshprakash.com</span>
                        </li>
                        <li
                            class="flex items-start text-gray-400 hover:text-gray-300 transition-colors duration-300 group"
                        >
                            <div
                                class="mt-0.5 mr-3 bg-white/10 group-hover:bg-blue-600/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300"
                            >
                                <MapPinIcon class="h-4 w-4 text-blue-400" />
                            </div>
                            <span
                                >123 Tech Park, Koramangala,<br />Bengaluru,
                                Karnataka 560034</span
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-gray-800 pt-8">
                <div
                    class="flex flex-col md:flex-row justify-between items-center"
                >
                    <p class="text-gray-500 text-sm mb-4 md:mb-0">
                        © {currentYear} Sandesh Prakash Real Estate. All rights
                        reserved.
                    </p>
                    <div class="flex space-x-6">
                        <a
                            href="/privacy-policy"
                            class="text-gray-500 hover:text-white text-sm"
                            >Privacy Policy</a
                        >
                        <a
                            href="/terms"
                            class="text-gray-500 hover:text-white text-sm"
                            >Terms of Service</a
                        >
                        <a
                            href="/sitemap"
                            class="text-gray-500 hover:text-white text-sm"
                            >Sitemap</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
