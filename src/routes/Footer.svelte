<script lang="ts">
import FacebookIcon from 'lucide-svelte/icons/facebook'
import InstagramIcon from 'lucide-svelte/icons/instagram'
import LinkedinIcon from 'lucide-svelte/icons/linkedin'
import MailIcon from 'lucide-svelte/icons/mail'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import PhoneIcon from 'lucide-svelte/icons/phone'
import TwitterIcon from 'lucide-svelte/icons/twitter'

const currentYear = new Date().getFullYear()

let mouseX = 0
let mouseY = 0

function handleMouseMove(event: MouseEvent) {
	const target = event.currentTarget as HTMLElement
	const rect = target.getBoundingClientRect()
	mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 20
	mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 20
}
</script>

<footer class="relative bg-[var(--color-primary-dark)]" on:mousemove={handleMouseMove}>
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)] opacity-90 animate-gradient"></div>
    
    <!-- Decorative elements with parallax -->
    <div class="absolute inset-0 overflow-hidden">
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
    
    <!-- Main content -->
    <div class="relative pt-24 pb-12">
        <div class="container mx-auto px-6 md:px-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                <!-- Company info -->
                <div class="md:col-span-5">
                    <a href="/" class="inline-block mb-8">
                        <h3 class="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            Sandesh Prakash
                        </h3>
                    </a>
                    <p class="text-white/70 mb-8 text-lg leading-relaxed max-w-lg">
                        Bengaluru's premier industrial and commercial real estate agency,
                        specializing in buying, selling and renting of warehouses,
                        manufacturing facilities, commercial spaces and industrial land.
                    </p>

                    <!-- Social media -->
                    <div class="flex gap-4">
                        {#each [{icon: FacebookIcon, label: 'Facebook'}, {icon: TwitterIcon, label: 'Twitter'}, {icon: InstagramIcon, label: 'Instagram'}, {icon: LinkedinIcon, label: 'LinkedIn'}] as {icon: Icon, label}}
                            <a href="#" 
                               aria-label={label}
                               class="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div class="absolute inset-0 bg-white/10"></div>
                                <Icon class="h-5 w-5 text-white relative z-10" />
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="md:col-span-3">
                    <h4 class="text-lg font-medium text-white mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] mr-2"></span>
                        Quick Links
                    </h4>
                    <ul class="space-y-4">
                        {#each ['Home', 'About', 'Properties', 'Contact'] as link}
                            <li>
                                <a href="/{link.toLowerCase()}" 
                                   class="text-white/70 hover:text-white transition-colors duration-300 flex items-center group">
                                    <span class="w-0 h-[1px] bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                                    {link}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="md:col-span-4">
                    <h4 class="text-lg font-medium text-white mb-6 flex items-center">
                        <span class="w-6 h-[2px] bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] mr-2"></span>
                        Contact Us
                    </h4>
                    <ul class="space-y-6">
                        {#each [
                            { icon: PhoneIcon, text: '+91 98765 43210' },
                            { icon: MailIcon, text: 'info@sandeshprakash.com' },
                            { icon: MapPinIcon, text: '123 Tech Park, Koramangala,\nBengaluru, Karnataka 560034' }
                        ] as { icon: Icon, text }}
                            <li class="flex items-start text-white/70 hover:text-white transition-colors duration-300 group">
                                <div class="mt-1 mr-4 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center group-hover:from-[var(--color-secondary)]/30 group-hover:to-[var(--color-accent)]/30 transition-colors duration-300">
                                    <Icon class="h-4 w-4 text-[var(--color-accent)]" />
                                </div>
                                <span class="whitespace-pre-line">{text}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-white/10 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-white/50 text-sm">
                        © {currentYear} Sandesh Prakash. All rights reserved.
                    </p>
                    <div class="flex gap-8">
                        {#each ['Privacy Policy', 'Terms of Service', 'Sitemap'] as link}
                            <a href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                               class="text-white/50 hover:text-white text-sm transition-colors duration-300">
                                {link}
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
