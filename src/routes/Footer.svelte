<script lang="ts">
import FacebookIcon from 'lucide-svelte/icons/facebook'
import InstagramIcon from 'lucide-svelte/icons/instagram'
import LinkedinIcon from 'lucide-svelte/icons/linkedin'
import MailIcon from 'lucide-svelte/icons/mail'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import PhoneIcon from 'lucide-svelte/icons/phone'
import TwitterIcon from 'lucide-svelte/icons/twitter'

const currentYear = new Date().getFullYear()
</script>

<footer class="relative">
    <!-- Footer main content -->
    <div
        class="bg-gradient-to-b from-[#0A1928] to-[#001233] text-white pt-16 pb-10"
    >
        <div class="container mx-auto px-6 md:px-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
                <!-- Company info -->
                <div class="md:col-span-6">
                    <a href="/" class="inline-block mb-6">
                        <h3 class="text-2xl font-bold">
                            <span class="text-white">Sandesh Prakash</span>
                        </h3>
                    </a>
                    <p class="text-gray-400 mb-8 leading-relaxed">
                        Bengaluru's premier industrial and commercial real estate agency,
                        specializing in buying, selling and renting of warehouses,
                        manufacturing facilities, commercial spaces and industrial land.
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

                <!-- Contact Info -->
                <div class="md:col-span-6">
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
                        © {currentYear} Sandesh Prakash. All rights
                        reserved.
                    </p>
                    <div class="flex space-x-6">
                        <a
                            href="/privacy-policy.txt"
                            class="text-gray-500 hover:text-white text-sm"
                            >Privacy Policy</a
                        >
                        <a
                            href="/terms.txt"
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
