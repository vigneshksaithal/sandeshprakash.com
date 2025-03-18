<script lang="ts">
import ChartBarIcon from 'lucide-svelte/icons/chart-bar'
import CreditCardIcon from 'lucide-svelte/icons/credit-card'
import SettingsIcon from 'lucide-svelte/icons/settings'

const features = [
	{
		title: 'Expert Market Insight',
		description:
			'Leveraging decades of experience to provide you with unparalleled market intelligence',
		icon: ChartBarIcon
	},
	{
		title: 'Tailored Solutions',
		description:
			'Each client receives a customized approach based on their specific business requirements',
		icon: SettingsIcon
	},
	{
		title: 'Transparent Process',
		description:
			'We maintain complete transparency throughout every stage of your property journey',
		icon: CreditCardIcon
	}
]
</script>

<div class="py-24 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto">
        <div class="flex flex-col items-center mb-16 relative">
            <!-- Decorative elements -->
            <div
                class="absolute -top-10 left-1/4 w-20 h-20 rounded-full bg-blue-50 opacity-50"
            ></div>
            <div
                class="absolute -bottom-10 right-1/4 w-32 h-32 rounded-full bg-blue-50 opacity-30"
            ></div>

            <div class="relative">
                <span
                    class="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 inline-block tracking-wider"
                    >WHO WE ARE</span
                >
                <h2
                    class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#001233] to-[#003366]"
                >
                    Excellence in Industrial Real Estate
                </h2>
                <div
                    class="h-1 w-20 bg-blue-500 mx-auto mt-4 rounded-full"
                ></div>
            </div>

            <p
                class="max-w-3xl mx-auto text-center text-gray-600 mt-8 text-lg leading-relaxed"
            >
                At Sandesh Prakash, we differentiate ourselves through our
                commitment to transparency, thorough analysis, and dedication to
                finding the perfect property match for our clients.
            </p>
        </div>

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {#each features as feature}
                <div
                    class="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group"
                >
                    <!-- Decorative corner accent -->
                    <div
                        class="absolute top-0 right-0 h-20 w-20 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"
                    ></div>

                    <div class="text-blue-500 mb-5 relative">
                        <svelte:component
                            this={feature.icon}
                            size={40}
                            strokeWidth={1.5}
                        />
                    </div>
                    <h3 class="text-xl font-semibold mb-3 text-gray-800">
                        {feature.title}
                    </h3>
                    <p class="text-gray-600">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
