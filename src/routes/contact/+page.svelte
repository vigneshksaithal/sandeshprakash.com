<script lang="ts">
import { pb } from '$lib/pocketbase'
import MailIcon from 'lucide-svelte/icons/mail'
import MapPinIcon from 'lucide-svelte/icons/map-pin'
import PhoneIcon from 'lucide-svelte/icons/phone'
import { onMount } from 'svelte'
import Footer from '../Footer.svelte'
import Navbar from '../Navbar.svelte'

interface Property {
	id: string
	title: string
}

let properties: Property[] = []
let formData = {
	name: '',
	email: '',
	phone: '',
	subject: '',
	message: '',
	property: ''
}

let loading = false
let success = false
let error = ''

onMount(async () => {
	try {
		const records = await pb
			.collection('properties')
			.getList<Property>(1, 100, {
				fields: 'id,title',
				filter: 'status = "active"'
			})
		properties = records.items
	} catch (err) {
		console.error('Failed to load properties:', err)
		error = 'Failed to load properties'
	}
})

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
			message: `${formData.subject}\n\n${formData.message}`,
			property: formData.property || null,
			status: 'new'
		})

		success = true
		formData = {
			name: '',
			email: '',
			phone: '',
			subject: '',
			message: '',
			property: ''
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
  <div class="relative bg-[var(--color-primary-dark)] text-[var(--color-text)] py-20 overflow-hidden">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary)] opacity-90 animate-gradient"></div>
    
    <!-- Animated shapes -->
    <div class="absolute inset-0">
      <!-- Large circle -->
      <div class="absolute -top-1/4 -right-1/4 w-[40rem] h-[40rem] rounded-full border border-white/10"></div>
      
      <!-- Medium circle -->
      <div class="absolute -bottom-1/4 -left-1/4 w-[30rem] h-[30rem] rounded-full border border-white/10"></div>

      <!-- Diagonal lines -->
      <div 
        class="absolute top-0 left-0 w-full h-full"
        style="background-image: linear-gradient(45deg, var(--color-text) 1px, transparent 1px);
               background-size: 5rem 5rem;
               opacity: 0.05;"
      ></div>

      <!-- Floating dots -->
      <div class="absolute inset-0 opacity-10"
           style="background-image: radial-gradient(circle at 1rem 1rem, var(--color-text) 0.15rem, transparent 0.15rem);
                  background-size: 4rem 4rem;">
      </div>
    </div>

    <div class="container mx-auto px-6 md:px-16 text-center relative max-w-7xl">
      <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-[var(--color-text)] text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">GET IN TOUCH</span>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Let's Start a
        <span class="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-transparent bg-clip-text">
          Conversation
        </span>
      </h1>
      <p class="text-xl text-white/80 mb-8 font-light max-w-4xl mx-auto">
        Our team is ready to help you find the perfect space for your business needs.
      </p>
    </div>
  </div>

  <!-- Contact Info Cards -->
  <div class="bg-[var(--color-card-bg)] py-20">
    <div class="container mx-auto px-6 md:px-16 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Email Card -->
        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <MailIcon class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Email Us</h3>
          <p class="text-[var(--color-gray-medium)] mb-4">Quick response within 24 hours</p>
          <a href="mailto:info@sandeshprakash.com" class="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">info@sandeshprakash.com</a>
        </div>

        <!-- Phone Card -->
        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <PhoneIcon class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Call Us</h3>
          <p class="text-[var(--color-gray-medium)] mb-4">9am to 6pm IST (Mon-Fri)</p>
          <a href="tel:+919632305082" class="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">+91 9632305082</a>
        </div>

        <!-- Location Card -->
        <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <MapPinIcon class="h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Visit Us</h3>
          <p class="text-[var(--color-gray-medium)] mb-4">Central Bangalore Location</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">No 948/A, 3rd Cross, IT I Layout Nagarabhavi 2nd Stage, Bangalore North, 560072</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Contact Form Section -->
  <div class="bg-[var(--color-gray-light)] py-20">
    <div class="container mx-auto px-6 md:px-16 max-w-7xl">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Form -->
        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <h2 class="text-3xl font-bold text-[var(--color-text-dark)] mb-8">Send Us a Message</h2>
          
          {#if success}
            <div class="bg-green-50 border border-green-200 text-green-600 px-6 py-4 rounded-xl mb-6">
              <p>Thank you for your message. We'll get back to you soon.</p>
            </div>
          {/if}

          {#if error}
            <div class="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-6">
              <p>{error}</p>
            </div>
          {/if}

          <form onsubmit={handleSubmit} class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-[var(--color-text-dark)] font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  bind:value={formData.name}
                  required
                  class="w-full px-4 py-3 bg-[var(--color-gray-light)] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label for="email" class="block text-[var(--color-text-dark)] font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  bind:value={formData.email}
                  required
                  class="w-full px-4 py-3 bg-[var(--color-gray-light)] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block text-[var(--color-text-dark)] font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  bind:value={formData.phone}
                  required
                  class="w-full px-4 py-3 bg-[var(--color-gray-light)] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label for="subject" class="block text-[var(--color-text-dark)] font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  bind:value={formData.subject}
                  required
                  class="w-full px-4 py-3 bg-[var(--color-gray-light)] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="What is this about?"
                />
              </div>
            </div>

            <div>
              <label for="property" class="block text-[var(--color-text-dark)] font-medium mb-2">Select Property (Optional)</label>
              <select
                id="property"
                bind:value={formData.property}
                class="w-full px-4 py-3 bg-[var(--color-gray-light)] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="">Select a property</option>
                {#each properties as property}
                  <option value={property.id}>{property.title}</option>
                {/each}
              </select>
            </div>

            <div>
              <label for="message" class="block text-[var(--color-text-dark)] font-medium mb-2">Message</label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="6"
                class="w-full px-4 py-3 bg-[var(--color-gray-light)] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              class="group relative px-8 py-4 bg-[var(--color-primary)] text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl w-full"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span class="relative font-semibold text-lg">
                {loading ? 'Sending...' : 'Send Message'}
              </span>
            </button>
          </form>
        </div>

        <!-- Map -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d570.6648837091245!2d77.50854747163966!3d12.96897276103988!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3c2ecc5d86eb%3A0xa3175b959446999c!2s948%2C%20Papreddy%20Palya%2C%202nd%20Stage%2C%20Naagarabhaavi%2C%20Bengaluru%2C%20Karnataka%20560072!5e1!3m2!1sen!2sin!4v1742535221283!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style="border:0; min-height: 600px;"
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