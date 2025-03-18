<!-- Create the about page -->
<script lang="ts">
import { onMount } from 'svelte'
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
  <div class="bg-[#0080FF] text-white py-20">
    <div class="container mx-auto px-4 text-center">
      <span class="inline-block px-4 py-1 bg-white/10 rounded-full text-sm mb-6">About Us</span>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">We're Sandesh Prakash Real Estate</h1>
      <p class="text-xl opacity-90">Premium Industrial Real Estate Solutions</p>
    </div>
  </div>

  <!-- Our Story Section -->
  <div class="container mx-auto px-4 py-16 md:py-24">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-6">
        <span class="text-[#0080FF] font-medium">Our Story</span>
        <h2 class="text-3xl font-bold text-gray-900">Bengaluru's Premier Industrial Real Estate Firm</h2>
        <p class="text-gray-600 leading-relaxed">
          Sandesh Prakash is Bengaluru's premier industrial real estate firm specializing in warehouses, manufacturing facilities, and industrial land.
        </p>
        <p class="text-gray-600 leading-relaxed">
          Sandesh Prakash Real Estate was founded in 2010 with a clear vision to transform the industrial real estate market in Bengaluru. Starting with a small team of dedicated professionals, we've grown to become a respected name in the industry, known for our expertise in warehouses and industrial spaces.
        </p>
      </div>
      <div class="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
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
  <div class="bg-gray-50 py-16 md:py-24">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12">
        <div class="bg-white p-8 rounded-2xl shadow-sm">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p class="text-gray-600">
            Our mission is to provide premium industrial real estate solutions with unmatched transparency and personalized service.
          </p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p class="text-gray-600">
            To be the most trusted industrial real estate advisor in Bengaluru, known for our integrity and market expertise.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Team Section -->
  <div class="container mx-auto px-4 py-16 md:py-24 text-center">
    <span class="inline-block px-4 py-1 bg-blue-50 text-[#0080FF] rounded-full text-sm mb-6">Our Team</span>
    <h2 class="text-3xl font-bold text-gray-900 mb-16">Meet Our Experts</h2>
    <div class="grid md:grid-cols-3 gap-8">
      {#each Array(3) as _, i}
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <h3 class="text-xl font-semibold text-gray-900">Expert Name</h3>
        <p class="text-gray-600">Position</p>
      </div>
      {/each}
    </div>
  </div>

  <!-- Stats Section -->
  <div class="bg-[#0080FF] text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold">10+</div>
          <div class="opacity-90">Years Experience</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold">500+</div>
          <div class="opacity-90">Happy Clients</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold">1000+</div>
          <div class="opacity-90">Properties Sold</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold">98%</div>
          <div class="opacity-90">Client Satisfaction</div>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="container mx-auto px-4 py-16 md:py-24 text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Ready to Work With Us?</h2>
    <p class="text-gray-600 max-w-2xl mx-auto mb-8">
      Whether you're looking to buy, sell, or invest in industrial real estate, we're here to help you every step of the way.
    </p>
    <a 
      href="/contact" 
      class="inline-block bg-[#0080FF] text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Get in Touch
    </a>
  </div>
</main>

<Footer />

<style>
  /* Add any component-specific styles here */
</style> 