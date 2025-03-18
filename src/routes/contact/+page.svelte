<script lang="ts">
import Footer from '../Footer.svelte'
import Navbar from '../Navbar.svelte'
</script>

<Navbar />

<!-- Contact Header Section -->
<div class="relative py-16 bg-gradient-to-r from-blue-900 to-blue-700">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border-8 border-white opacity-5"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border-8 border-white opacity-5"></div>
    <div class="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-blue-300 opacity-10"></div>
  </div>
  
  <div class="container mx-auto px-6 relative z-10 text-center">
    <h2 class="text-sm font-semibold tracking-wider text-blue-200 uppercase mb-2">Contact Us</h2>
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h1>
    <p class="max-w-2xl mx-auto text-blue-100 text-lg">
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
        <div class="bg-blue-700 p-4 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
        <p class="text-gray-600 mb-4 text-center">Our team usually responds within 24 hours</p>
        <a href="mailto:info@sandeshprakash.com" class="text-blue-700 font-medium hover:text-blue-800 transition-colors">info@sandeshprakash.com</a>
      </div>
      
      <!-- Call Card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-8">
        <div class="bg-blue-700 p-4 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
        <p class="text-gray-600 mb-4 text-center">Mon-Fri from 9am to 6pm IST</p>
        <a href="tel:+919876543210" class="text-blue-700 font-medium hover:text-blue-800 transition-colors">+91 9876543210</a>
      </div>
      
      <!-- Visit Card -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-8">
        <div class="bg-blue-700 p-4 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
        <p class="text-gray-600 mb-4 text-center">Our office is centrally located</p>
        <a href="https://maps.google.com/?q=123+Tech+Park,+Koramangala,+Bengaluru,+Karnataka+560034" target="_blank" class="text-blue-700 font-medium hover:text-blue-800 transition-colors text-center">123 Tech Park, Koramangala, Bengaluru, Karnataka 560034</a>
      </div>
    </div>
  </div>
</div>

<!-- Contact Form Section -->
<div class="py-16 px-6 bg-gradient-to-br from-blue-900 to-blue-700">
  <div class="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-12">
    <!-- Form Column -->
    <div class="lg:col-span-3">
      <div class="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/20">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">Send Us a Message</h2>
        <p class="text-blue-100 mb-8">
          Whether you're looking for a warehouse, manufacturing facility, or have general
          questions about industrial real estate in Bengaluru, we're here to help.
        </p>
        
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="fullName" class="block text-sm font-medium text-blue-100 mb-2">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                class="w-full px-4 py-3 bg-white/5 border border-blue-300/30 rounded-lg text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-blue-100 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                class="w-full px-4 py-3 bg-white/5 border border-blue-300/30 rounded-lg text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                placeholder="your.email@example.com" 
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="phone" class="block text-sm font-medium text-blue-100 mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                class="w-full px-4 py-3 bg-white/5 border border-blue-300/30 rounded-lg text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                placeholder="Your phone number" 
              />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-blue-100 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                class="w-full px-4 py-3 bg-white/5 border border-blue-300/30 rounded-lg text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
                placeholder="What is this regarding?" 
              />
            </div>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-blue-100 mb-2">Message</label>
            <textarea 
              id="message" 
              rows="6" 
              class="w-full px-4 py-3 bg-white/5 border border-blue-300/30 rounded-lg text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-300/50 resize-none"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>
          
          <button 
            type="submit"
            class="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-300"
          >
            Send Message
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