<script lang="ts">
import { onMount } from 'svelte'
import { fade, fly } from 'svelte/transition'

interface Testimonial {
	id: string
	name: string
	company: string
	position: string
	quote: string
	image: string
}

const testimonials: Testimonial[] = [
	{
		id: '1',
		name: 'Rahul Sharma',
		company: 'ABC Manufacturing',
		position: 'CEO',
		quote:
			'Sandesh helped us find the perfect manufacturing space in record time. Their knowledge of the local market is exceptional and their guidance throughout the process was invaluable.',
		image: '/images/testimonial-1.jpg'
	},
	{
		id: '2',
		name: 'Priya Mehta',
		company: 'XYZ Logistics',
		position: 'Operations Director',
		quote:
			'The team at Sandesh Prakash Real Estate provided invaluable guidance throughout our warehouse search process. Their attention to detail and understanding of our specific needs made all the difference.',
		image: '/images/testimonial-2.jpg'
	}
]

function handleImageError(event: Event) {
	const img = event.target as HTMLImageElement
	img.src = '/images/default-avatar.jpg'
}

let activeIndex = 0
let isTransitioning = false
let mouseX = 0
let mouseY = 0
let autoRotateInterval: ReturnType<typeof setInterval>

function handleMouseMove(event: MouseEvent) {
	const target = event.currentTarget as HTMLElement
	const rect = target.getBoundingClientRect()
	mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 20
	mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 20
}

async function changeTestimonial(index: number) {
	if (isTransitioning || index === activeIndex) return
	isTransitioning = true
	activeIndex = index
	await new Promise((resolve) => setTimeout(resolve, 500))
	isTransitioning = false
}

function nextTestimonial() {
	changeTestimonial((activeIndex + 1) % testimonials.length)
}

function prevTestimonial() {
	changeTestimonial(
		(activeIndex - 1 + testimonials.length) % testimonials.length
	)
}

// Auto-rotate testimonials
onMount(() => {
	autoRotateInterval = setInterval(nextTestimonial, 5000)
	return () => clearInterval(autoRotateInterval)
})
</script>

<div class="py-24 px-6 md:px-16 bg-white relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full opacity-30 transform translate-x-1/2 translate-y-1/2"></div>
    
    <div class="container mx-auto relative">
        <div class="text-center mb-16">
            <span class="bg-[var(--color-primary)]/5 text-[var(--color-primary)] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-4 inline-block">CLIENT TESTIMONIALS</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mb-4">
                What Our Clients Say
            </h2>
            <div class="h-1 w-20 bg-[var(--color-accent)] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <!-- Large quote marks -->
        <div class="absolute top-1/2 left-0 -translate-y-1/2 text-[var(--color-primary)]/5 opacity-30">
            <svg class="w-32 h-32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
        </div>
        
        <!-- Testimonial carousel -->
        <div class="max-w-4xl mx-auto">
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/5 to-white shadow-xl p-1">
                <div class="bg-white rounded-xl p-8 md:p-12">
                    <div class="flex flex-col md:flex-row items-center">
                        <!-- Testimonial image and controls on small screens -->
                        <div class="md:hidden w-full mb-8 flex flex-col items-center">
                            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                                <img 
                                    src={testimonials[activeIndex].image} 
                                    alt={testimonials[activeIndex].name} 
                                    class="w-full h-full object-cover"
                                    onerror={handleImageError} 
                                />
                            </div>
                            
                            <!-- Navigation controls for mobile -->
                            <div class="flex justify-center space-x-2 mt-4">
                                {#each testimonials as _, i}
                                    <!-- svelte-ignore a11y_consider_explicit_label -->
                                    <button 
                                        class="w-2.5 h-2.5 rounded-full transition-all duration-300 {i === activeIndex ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-gray-light)]'}"
                                        onclick={() => activeIndex = i}
                                    ></button>
                                {/each}
                            </div>
                        </div>
                        
                        <!-- Testimonial content -->
                        <div class="md:flex-1 md:pr-8">
                            <div class="relative">
                                <!-- Small quote icon -->
                                <div class="absolute -top-6 -left-2 text-[var(--color-primary)]/5">
                                    <svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                
                                <p class="text-xl md:text-2xl text-[var(--color-gray-dark)] font-light italic leading-relaxed mb-8 pl-4">
                                    "{testimonials[activeIndex].quote}"
                                </p>
                                
                                <div class="pl-4">
                                    <h4 class="text-xl font-bold text-[var(--color-text-dark)]">{testimonials[activeIndex].name}</h4>
                                    <div class="flex items-center">
                                        <p class="text-[var(--color-accent)] font-medium">{testimonials[activeIndex].position}</p>
                                        <span class="mx-2 text-[var(--color-gray-medium)]">•</span>
                                        <p class="text-[var(--color-gray-dark)]">{testimonials[activeIndex].company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Testimonial image and controls on medium+ screens -->
                        <div class="hidden md:block">
                            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                                <img 
                                    src={testimonials[activeIndex].image} 
                                    alt={testimonials[activeIndex].name} 
                                    class="w-full h-full object-cover"
                                    onerror={handleImageError} 
                                />
                            </div>
                            
                            <!-- Navigation arrows -->
                            <div class="flex justify-between mt-6">
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button 
                                    class="w-10 h-10 rounded-full bg-[var(--color-gray-light)] hover:bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-gray-dark)] hover:text-[var(--color-accent)] transition-colors"
                                    onclick={prevTestimonial}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button 
                                    class="w-10 h-10 rounded-full bg-[var(--color-gray-light)] hover:bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-gray-dark)] hover:text-[var(--color-accent)] transition-colors"
                                    onclick={nextTestimonial}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Testimonial indicators for desktop -->
            <div class="hidden md:flex justify-center space-x-2 mt-8">
                {#each testimonials as _, i}
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button 
                        class="w-3 h-3 rounded-full transition-all duration-300 {i === activeIndex ? 'bg-[var(--color-accent)] w-8' : 'bg-[var(--color-gray-light)]'}"
                        onclick={() => activeIndex = i}
                    ></button>
                {/each}
            </div>
        </div>
    </div>
</div> 