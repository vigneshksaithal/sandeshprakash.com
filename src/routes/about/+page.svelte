<script lang="ts">
import { onMount } from 'svelte'
import CallToAction from '../CallToAction.svelte'
import Footer from '../Footer.svelte'
import Navbar from '../Navbar.svelte'

let isVisible = false
let imgSrc = '/industrial-building.jpg'

function handleImageError() {
	imgSrc =
		'https://images.unsplash.com/photo-1565976469782-17b9b75a5f3f?q=80&w=2574&auto=format&fit=crop'
}

onMount(() => {
	isVisible = true
})
</script>

<Navbar />

<main class="min-h-screen">
  <!-- Hero Section with Blue Background -->
  <div class="bg-[var(--color-primary)] text-[var(--color-text)] py-24">
    <div class="container mx-auto px-6 md:px-16 text-center">
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
        <h2 class="text-3xl font-bold text-[var(--color-text-dark)]">Leading Industrial and Commercial Real Estate Experts in Bengaluru</h2>
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
          on:error={handleImageError}
        />
      </div>
    </div>
  </div>

  <!-- Mission and Vision Section -->
  <div class="bg-[var(--color-gray-light)] py-24">
    <div class="container mx-auto px-6 md:px-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
          <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Our Mission</h3>
          <p class="text-[var(--color-gray-medium)]">
            To deliver exceptional industrial and commercial real estate solutions through market expertise, transparency, and personalized service that exceeds client expectations.
          </p>
        </div>
        <div class="bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
          <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Our Vision</h3>
          <p class="text-[var(--color-gray-medium)]">
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

<style>
  /* Add any component-specific styles here */
</style>