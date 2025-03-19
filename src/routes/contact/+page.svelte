<!-- biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> -->
<script lang="ts">
import { pb } from '$lib/pocketbase/client'
import MailIcon from 'lucide-svelte/icons/mail'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import PhoneIcon from 'lucide-svelte/icons/phone'
import Footer from '../Footer.svelte'
import Navbar from '../Navbar.svelte'

let formData = {
	name: '',
	email: '',
	phone: '',
	subject: '',
	message: ''
}

let loading = false
let success = false
let error = ''

const handleSubmit = async (e: Event) => {
	e.preventDefault()
	loading = true
	error = ''
	success = false

	try {
		await pb.collection('contact_submissions').create({
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			message: `${formData.subject}\n\n${formData.message}`
		})

		success = true
		formData = {
			name: '',
			email: '',
			phone: '',
			subject: '',
			message: ''
		}
	} catch (err) {
		console.error('Failed to submit form:', err)
		error = 'Failed to submit form. Please try again.'
	}

	loading = false
}
</script>

<Navbar />

<!-- Contact Header Section -->
<div class="relative py-16 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border-8 border-white opacity-5"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border-8 border-white opacity-5"></div>
    <div class="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-[var(--color-primary-light)] opacity-10"></div>
  </div>
  
  <div class="container mx-auto px-6 relative z-10 text-center">
    <h2 class="text-sm font-semibold tracking-wider text-[var(--color-gray-light)] uppercase mb-2">Contact Us</h2>
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h1>
    <p class="max-w-2xl mx-auto text-[var(--color-text)] text-lg">
      Have questions about industrial properties? Our team is ready to help you find 
      the perfect space for your business.
    </p>
  </div>
</div>

<!-- Contact Information Cards -->
<div class="py-16 px-6 bg-gray-50">
  <div class="container mx-auto max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Email Card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-8">
        <div class="bg-[var(--color-primary)] p-4 rounded-full mb-6">
          <MailIcon class="h-8 w-8 text-white" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
        <p class="text-gray-600 mb-4 text-center">Our team usually responds within 24 hours</p>
        <a href="mailto:info@sandeshprakash.com" class="text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)] transition-colors">info@sandeshprakash.com</a>
      </div>
      
      <!-- Call Card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-8">
        <div class="bg-[var(--color-primary)] p-4 rounded-full mb-6">
          <PhoneIcon class="h-8 w-8 text-white" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
        <p class="text-gray-600 mb-4 text-center">Mon-Fri from 9am to 6pm IST</p>
        <a href="tel:+919876543210" class="text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)] transition-colors">+91 9876543210</a>
      </div>
      
      <!-- Visit Card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-8">
        <div class="bg-[var(--color-primary)] p-4 rounded-full mb-6">
          <MapPinIcon class="h-8 w-8 text-white" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
        <p class="text-gray-600 mb-4 text-center">Our office is centrally located</p>
        <a href="https://maps.google.com/?q=123+Tech+Park,+Koramangala,+Bengaluru,+Karnataka+560034" target="_blank" class="text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)] transition-colors text-center">123 Tech Park, Koramangala, Bengaluru, Karnataka 560034</a>
      </div>
    </div>
  </div>
</div>

<!-- Contact Form Section -->
<div class="py-16 px-6 bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)]">
  <div class="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-12">
    <!-- Form Column -->
    <div class="lg:col-span-3">
      <div class="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/20">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">Send Us a Message</h2>
        <p class="text-[var(--color-text)] mb-8">
          Whether you're looking for a warehouse, manufacturing facility, or have general
          questions about industrial real estate in Bengaluru, we're here to help.
        </p>
        
        {#if success}
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong class="font-bold">Success!</strong>
                <span class="block sm:inline"> Thank you for your message. We'll get back to you soon.</span>
            </div>
        {/if}

        {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline"> {error}</span>
            </div>
        {/if}

        <form class="space-y-6" on:submit={handleSubmit}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="fullName" class="block text-sm font-medium text-[var(--color-text)] mb-2">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                bind:value={formData.name}
                required
                class="w-full px-4 py-3 bg-white/5 border border-[var(--color-primary-light)]/30 rounded-lg text-white placeholder-[var(--color-gray-light)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/50"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                bind:value={formData.email}
                required
                class="w-full px-4 py-3 bg-white/5 border border-[var(--color-primary-light)]/30 rounded-lg text-white placeholder-[var(--color-gray-light)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/50"
                placeholder="your.email@example.com" 
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="phone" class="block text-sm font-medium text-[var(--color-text)] mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                bind:value={formData.phone}
                required
                class="w-full px-4 py-3 bg-white/5 border border-[var(--color-primary-light)]/30 rounded-lg text-white placeholder-[var(--color-gray-light)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/50"
                placeholder="Your phone number" 
              />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-[var(--color-text)] mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                bind:value={formData.subject}
                required
                class="w-full px-4 py-3 bg-white/5 border border-[var(--color-primary-light)]/30 rounded-lg text-white placeholder-[var(--color-gray-light)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/50"
                placeholder="What is this regarding?" 
              />
            </div>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-[var(--color-text)] mb-2">Message</label>
            <textarea 
              id="message" 
              rows="6" 
              bind:value={formData.message}
              required
              class="w-full px-4 py-3 bg-white/5 border border-[var(--color-primary-light)]/30 rounded-lg text-white placeholder-[var(--color-gray-light)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/50 resize-none"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            class="px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-lg hover:bg-[var(--color-gray-light)] focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
    
    <!-- Map Column -->
    <div class="lg:col-span-2">
      <div class="h-full rounded-2xl overflow-hidden border border-white/20">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.599285073258!2d77.6340175!3d12.9378136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14487ef95871%3A0xd97ef43188c50391!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1648545377665!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen={true}
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Map showing our office location"
          class="min-h-[400px]"
        ></iframe>
      </div>
    </div>
  </div>
</div>

<Footer /> 