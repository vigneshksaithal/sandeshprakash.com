<script lang="ts">
import FacebookIcon from 'lucide-svelte/icons/facebook'
import InstagramIcon from 'lucide-svelte/icons/instagram'
import LinkedinIcon from 'lucide-svelte/icons/linkedin'
import MailIcon from 'lucide-svelte/icons/mail'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import PhoneIcon from 'lucide-svelte/icons/phone'
import TwitterIcon from 'lucide-svelte/icons/twitter'

const currentYear = new Date().getFullYear()

const socialLinks = [
	{
		icon: FacebookIcon,
		label: 'Facebook',
		url: 'https://facebook.com/sandeshprakash'
	},
	{
		icon: TwitterIcon,
		label: 'Twitter',
		url: 'https://twitter.com/sandeshprakash'
	},
	{
		icon: InstagramIcon,
		label: 'Instagram',
		url: 'https://instagram.com/sandeshprakash'
	},
	{
		icon: LinkedinIcon,
		label: 'LinkedIn',
		url: 'https://www.linkedin.com/in/sandesh-prakash-34516819a/'
	}
]
</script>

<footer class="relative bg-[var(--color-primary-dark)]">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)] opacity-50 animate-gradient"></div>
    
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
        <!-- Large circle -->
        <div 
            class="absolute -top-1/4 -right-1/4 w-[40rem] h-[40rem] rounded-full border border-white/20"
        ></div>
        
        <!-- Medium circle -->
        <div 
            class="absolute -bottom-1/4 -left-1/4 w-[30rem] h-[30rem] rounded-full border border-white/20"
        ></div>
    </div>
    
    <!-- Main content -->
    <div class="relative pt-24 pb-12">
        <div class="container mx-auto px-6 md:px-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                <!-- Company info -->
                <div class="md:col-span-5">
                    <a href="/" class="inline-block mb-8">
                        <h3 class="text-3xl font-bold text-white">
                            Sandesh Prakash
                        </h3>
                    </a>
                    <p class="text-white text-lg leading-relaxed max-w-lg">
                        Bengaluru's premier industrial and commercial real estate agency,
                        specializing in buying, selling and renting of warehouses,
                        manufacturing facilities, commercial spaces and industrial land.
                    </p>

                    <!-- Social media -->
                    <div class="flex gap-4 mt-8">
                        {#each socialLinks as {icon: Icon, label, url}}
                            <a href={url}
                               aria-label={label}
                               class="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 overflow-hidden bg-white/20">
                                <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Icon class="h-5 w-5 text-white relative z-10" />
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="md:col-span-3">
                    <h4 class="text-lg font-medium text-white mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-white mr-2"></span>
                        Quick Links
                    </h4>
                    <ul class="space-y-4">
                        {#each ['Home', 'About', 'Properties', 'Contact'] as link}
                            <li>
                                <a href="/{link.toLowerCase()}" 
                                   class="text-white hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center group">
                                    <span class="w-0 h-[1px] bg-white mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                                    {link}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="md:col-span-4">
                    <h4 class="text-lg font-medium text-white mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-white mr-2"></span>
                        Contact Us
                    </h4>
                    <ul class="space-y-6">
                        {#each [
                            { icon: PhoneIcon, text: '+91 98765 43210' },
                            { icon: MailIcon, text: 'info@sandeshprakash.com' },
                            { icon: MapPinIcon, text: '123 Tech Park, Koramangala,\nBengaluru, Karnataka 560034' }
                        ] as { icon: Icon, text }}
                            <li class="flex text-white transition-colors duration-300 group">
                                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                                    <Icon class="h-4 w-4 text-white" />
                                </div>
                                <span class="ml-4 whitespace-pre-line flex items-center">{text}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-white/20 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-white text-sm">
                        © {currentYear} Sandesh Prakash. All rights reserved.
                    </p>
                    <div class="flex gap-8">
                        <a href="/privacy-policy.txt" 
                           class="text-white hover:text-[var(--color-accent)] text-sm transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="/terms.txt" 
                           class="text-white hover:text-[var(--color-accent)] text-sm transition-colors duration-300">
                            Terms of Service
                        </a>
                        <a href="/sitemap.xml" 
                           class="text-white hover:text-[var(--color-accent)] text-sm transition-colors duration-300">
                            Sitemap
                        </a>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <a href="https://vigneshaithal.com/contact" 
                       class="text-white/60 hover:text-white text-sm transition-colors duration-300">
                        Created by Vignesh Aithal
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
