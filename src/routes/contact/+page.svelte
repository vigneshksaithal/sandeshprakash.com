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

<main class="min-h-screen">
  <!-- Hero Section with Blue Background -->
  <div class="bg-[var(--color-primary)] text-[var(--color-text)] py-24">
    <div class="container mx-auto px-6 md:px-16 text-center">
      <span class="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">Contact Us</span>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Get In Touch</h1>
      <p class="text-xl opacity-90">Have questions about industrial properties? Our team is ready to help.</p>
    </div>
  </div>

  <!-- Contact Info Cards -->
  <div class="container mx-auto px-6 md:px-16 py-24">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <!-- Email Card -->
      <div class="bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
        <div class="bg-[var(--color-primary)] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <MailIcon class="h-8 w-8 text-white" />
        </div>
        <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Email Us</h3>
        <p class="text-[var(--color-gray-medium)] mb-4">Our team usually responds within 24 hours</p>
        <a href="mailto:info@sandeshprakash.com" class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">info@sandeshprakash.com</a>
      </div>

      <!-- Phone Card -->
      <div class="bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
        <div class="bg-[var(--color-primary)] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <PhoneIcon class="h-8 w-8 text-white" />
        </div>
        <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Call Us</h3>
        <p class="text-[var(--color-gray-medium)] mb-4">Mon-Fri from 9am to 6pm IST</p>
        <a href="tel:+919876543210" class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">+91 9876543210</a>
      </div>

      <!-- Location Card -->
      <div class="bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
        <div class="bg-[var(--color-primary)] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <MapPinIcon class="h-8 w-8 text-white" />
        </div>
        <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Visit Us</h3>
        <p class="text-[var(--color-gray-medium)] mb-4">Our office is centrally located</p>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">123 Tech Park, Koramangala, Bengaluru</a>
      </div>
    </div>
  </div>

  <!-- Contact Form Section -->
  <div class="bg-[var(--color-gray-light)] py-24">
    <div class="container mx-auto px-6 md:px-16">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Form -->
        <div class="bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
          <h2 class="text-3xl font-bold text-[var(--color-text-dark)] mb-6">Send Us a Message</h2>
          
          {#if success}
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              <p>Thank you for your message. We'll get back to you soon.</p>
            </div>
          {/if}

          {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          {/if}

          <form on:submit={handleSubmit} class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-[var(--color-text-dark)] mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  required
                  class="w-full px-4 py-2 border border-[var(--color-gray-medium)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label for="email" class="block text-[var(--color-text-dark)] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  bind:value={formData.email}
                  required
                  class="w-full px-4 py-2 border border-[var(--color-gray-medium)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block text-[var(--color-text-dark)] mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  bind:value={formData.phone}
                  required
                  class="w-full px-4 py-2 border border-[var(--color-gray-medium)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label for="subject" class="block text-[var(--color-text-dark)] mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  bind:value={formData.subject}
                  required
                  class="w-full px-4 py-2 border border-[var(--color-gray-medium)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="What is this about?"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-[var(--color-text-dark)] mb-2">Message</label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="6"
                class="w-full px-4 py-2 border border-[var(--color-gray-medium)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              class="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <!-- Map -->
        <div class="bg-[var(--color-card-bg)] rounded-2xl shadow-[var(--shadow-md)] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.599285073258!2d77.6340175!3d12.9378136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14487ef95871%3A0xd97ef43188c50391!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1648545377665!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style="border:0; min-height: 500px;"
            allowfullscreen={true}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</main>

<Footer />