<script lang="ts">
const features = [
	{
		title: 'Expert Market Insight',
		description:
			'Leveraging decades of experience to provide you with unparalleled market intelligence',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>`
	},
	{
		title: 'Tailored Solutions',
		description:
			'Each client receives a customized approach based on their specific business requirements',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>`
	},
	{
		title: 'Transparent Process',
		description:
			'We maintain complete transparency throughout every stage of your property journey',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>`
	}
]
</script>

<div class="py-24 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto">
        <div class="flex flex-col items-center mb-16 relative">
            <!-- Decorative elements -->
            <div class="absolute -top-10 left-1/4 w-20 h-20 rounded-full bg-blue-50 opacity-50"></div>
            <div class="absolute -bottom-10 right-1/4 w-32 h-32 rounded-full bg-blue-50 opacity-30"></div>
            
            <div class="relative">
                <span class="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 inline-block tracking-wider">WHO WE ARE</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#001233] to-[#003366]">
                    Excellence in Industrial Real Estate
                </h2>
                <div class="h-1 w-20 bg-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <p class="max-w-3xl mx-auto text-center text-gray-600 mt-8 text-lg leading-relaxed">
                At Sandesh Prakash, we differentiate ourselves through our commitment to transparency, 
                thorough analysis, and dedication to finding the perfect property match for our clients.
            </p>
        </div>
        
        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {#each features as feature, index}
                <div class="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group">
                    <!-- Decorative corner accent -->
                    <div class="absolute top-0 right-0 h-20 w-20 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
                    
                    <div class="text-blue-500 mb-5 relative">
                        {@html feature.icon}
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                    <p class="text-gray-600">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div> 