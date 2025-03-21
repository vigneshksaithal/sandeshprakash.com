<script lang="ts">
import BarChart4Icon from 'lucide-svelte/icons/bar-chart-4'
import BuildingIcon from 'lucide-svelte/icons/building'
import CalculatorIcon from 'lucide-svelte/icons/calculator'

const services = [
	{
		title: 'Paid Property Valuation',
		description:
			'We help you sell your property at the best price through our expert valuation services.',
		icon: CalculatorIcon
	},
	{
		title: 'Bank & NBFC Tie-ups',
		description:
			'Get assistance with loans for buying properties through our partnerships with banks and NBFCs.',
		icon: BuildingIcon
	},
	{
		title: 'CIBIL Score Check',
		description:
			'Get your CIBIL score checked to understand your loan eligibility and creditworthiness.',
		icon: BarChart4Icon
	}
]
</script>

<div class="py-24 px-6 md:px-16 bg-gradient-to-b from-white to-[var(--color-background)]">
  <div class="container mx-auto">
    <div class="flex flex-col items-center mb-16 relative">
      <!-- Decorative elements -->
      <div class="absolute -top-10 left-1/4 w-20 h-20 rounded-full bg-[var(--color-primary)]/5 opacity-50"></div>
      <div class="absolute -bottom-10 right-1/4 w-32 h-32 rounded-full bg-[var(--color-primary)]/5 opacity-30"></div>

      <div class="relative">
        <span class="bg-[var(--color-primary)]/5 text-[var(--color-primary)] px-4 py-1.5 rounded-full text-sm font-semibold mb-4 inline-block tracking-wider">OUR SERVICES</span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
          Value Added Services
        </h2>
        <div class="h-1 w-20 bg-[var(--color-accent)] mx-auto mt-4 rounded-full"></div>
      </div>

      <p class="max-w-3xl mx-auto text-center text-gray-600 mt-8 text-lg leading-relaxed">
        We go beyond traditional real estate services to provide comprehensive solutions that add value to your property journey.
      </p>
    </div>

    <!-- Service Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {#each services as service}
        <div class="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group">
          <!-- Decorative corner accent -->
          <div class="absolute top-0 right-0 h-20 w-20 bg-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>

          <div class="text-[var(--color-accent)] mb-5 relative">
            <svelte:component this={service.icon} size={40} strokeWidth={1.5} />
          </div>
          <h3 class="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
          <p class="text-gray-600">{service.description}</p>
        </div>
      {/each}
    </div>
  </div>
</div> 