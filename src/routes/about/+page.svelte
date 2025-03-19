<script lang="ts">
import EyeIcon from 'lucide-svelte/icons/eye'
import TargetIcon from 'lucide-svelte/icons/target'
import { onMount } from 'svelte'
import CallToAction from '../CallToAction.svelte'
import Footer from '../Footer.svelte'
import Navbar from '../Navbar.svelte'

let isVisible = false
let imgSrc = '/industrial-building.jpg'
let mouseX = 0
let mouseY = 0

const handleImageError = () => {
	imgSrc = '/building.jpg'
}

const handleMouseMove = (event: MouseEvent) => {
	const target = event.currentTarget as HTMLElement
	const rect = target.getBoundingClientRect()
	mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 20
	mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 20
}

onMount(() => {
	isVisible = true
})
</script>

<Navbar />

<main class="min-h-screen">
  <!-- Hero Section with Blue Background -->
  <div class="relative bg-[var(--color-primary)] text-[var(--color-text)] py-24 overflow-hidden" onmousemove={handleMouseMove}>
    <!-- Animated shapes -->
    <div class="absolute inset-0">
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
      
      <!-- Small circle -->
      <div 
        class="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] rounded-full bg-white/5"
        style="transform: translate3d({mouseX * 0.4}px, {mouseY * 0.4}px, 0)"
      ></div>

      <!-- Square -->
      <div 
        class="absolute bottom-1/3 right-1/4 w-[25rem] h-[25rem] rotate-45 border border-white/10"
        style="transform: translate3d({mouseX * 0.7}px, {mouseY * 0.7}px, 0)"
      ></div>

      <!-- Floating dots -->
      <div class="absolute inset-0 opacity-10"
           style="background-image: radial-gradient(circle at 1rem 1rem, var(--color-text) 0.15rem, transparent 0.15rem);
                  background-size: 4rem 4rem;
                  transform: translate3d({mouseX * 0.3}px, {mouseY * 0.3}px, 0)">
      </div>
    </div>

    <div class="container mx-auto px-6 md:px-16 text-center relative">
      <span class="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">About Us</span>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">We're Sandesh Prakash</h1>
      <p class="text-xl opacity-90">Specialized Industrial and Commercial Real Estate Solutions</p>
    </div>
  </div>

  <!-- Our Story Section -->
  <div class="container mx-auto px-6 md:px-16 py-24">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-6">
        <span class="text-[var(--color-primary)] font-medium">Our Story</span>
        <h2 class="text-4xl font-bold text-[var(--color-text-dark)] leading-12">Leading Industrial and Commercial Real Estate Experts</h2>
        <p class="text-[var(--color-gray-medium)] leading-relaxed">
          Sandesh Prakash is a specialized real estate firm focusing exclusively on industrial and commercial properties, including warehouses, manufacturing facilities, office spaces, and commercial land in Bengaluru.
        </p>
        <p class="text-[var(--color-gray-medium)] leading-relaxed">
          Founded in 2010, Sandesh Prakash Real Estate has established itself as a market leader in industrial and commercial real estate. Our dedicated team of professionals brings extensive expertise in helping businesses find and acquire the perfect industrial or commercial spaces that meet their specific requirements.
        </p>
      </div>
      <div class="relative h-[400px] rounded-2xl overflow-hidden shadow-[var(--shadow-xl)]">
        <img 
          src={imgSrc}
          alt="Industrial Building" 
          class="w-full h-full object-cover"
          onerror={handleImageError}
        />
      </div>
    </div>
  </div>

  <!-- Mission and Vision Section -->
  <div class="bg-white py-24">
    <div class="container mx-auto px-6 md:px-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="group bg-white p-8 rounded-2xl shadow-[var(--shadow-lg)] border border-[var(--color-primary-light)]/20 transition-all duration-500 hover:shadow-[var(--shadow-xl)]">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
              <TargetIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-[var(--color-text-dark)]">Our Mission</h3>
          </div>
          <p class="text-[var(--color-gray-medium)] leading-relaxed">
            To deliver exceptional industrial and commercial real estate solutions through market expertise, transparency, and personalized service that exceeds client expectations.
          </p>
        </div>
        <div class="group bg-white p-8 rounded-2xl shadow-[var(--shadow-lg)] border border-[var(--color-primary-light)]/20 transition-all duration-500 hover:shadow-[var(--shadow-xl)]">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
              <EyeIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-[var(--color-text-dark)]">Our Vision</h3>
          </div>
          <p class="text-[var(--color-gray-medium)] leading-relaxed">
            To be Bengaluru's most trusted advisor in industrial and commercial real estate, recognized for our deep market knowledge and unwavering commitment to client success.
          </p>
        </div>
      </div>
    </div>
  </div>

  <CallToAction />

  <!-- Stats Section -->
  <div class="bg-[var(--color-card-bg)] py-24">
    <div class="container mx-auto px-6 md:px-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-[var(--color-primary)]">10+</div>
          <div class="text-[var(--color-primary)] opacity-90">Years of Expertise</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[var(--color-primary)]">500+</div>
          <div class="text-[var(--color-primary)] opacity-90">Business Clients</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[var(--color-primary)]">1000+</div>
          <div class="text-[var(--color-primary)] opacity-90">Properties Transacted</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[var(--color-primary)]">98%</div>
          <div class="text-[var(--color-primary)] opacity-90">Client Satisfaction</div>
        </div>
      </div>
    </div>
  </div>
</main>

<Footer />