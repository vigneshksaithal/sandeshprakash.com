<script lang="ts">
import { pb } from '$lib/pocketbase'
import PropertyModal from './PropertyModal.svelte'

interface Property {
	id: string
	type: 'Warehouse' | 'Manufacturing' | 'Industrial Land' | 'Commercial'
	featured: boolean
	status: 'active' | 'archive'
	location: string
	title: string
	price: number
	area: string
	description: string
	images: string[]
	created: string
	updated: string
	isActive: boolean
}

const { properties, loading, onRefresh } = $props<{
	properties: Property[]
	loading: boolean
	onRefresh: () => Promise<void>
}>()

const state = $state({
	showEditModal: false,
	editingProperty: null as Property | null
})

const openEditModal = (property: Property) => {
	state.editingProperty = property
	state.showEditModal = true
}

const toggleFeatured = async (id: string, featured: boolean) => {
	try {
		await pb.collection('properties').update(id, { featured: !featured })
		await onRefresh()
	} catch (err) {
		console.error('Failed to update property:', err)
	}
}

const deleteProperty = async (id: string) => {
	if (!confirm('Are you sure you want to delete this property?')) return

	try {
		await pb.collection('properties').delete(id)
		await onRefresh()
	} catch (err) {
		console.error('Failed to delete property:', err)
	}
}
</script>

<!-- Mobile View -->
<div class="block md:hidden space-y-4">
	{#each properties as property}
		<div class="bg-white rounded-lg shadow-sm border border-gray-200">
			<div class="p-4 cursor-pointer" onclick={() => openEditModal(property)}>
				<div class="flex gap-4">
					<div class="flex-shrink-0">
						<img 
							src={property.images[0]} 
							alt={property.title} 
							class="h-24 w-24 object-cover rounded-lg"
						/>
					</div>
					<div class="flex-1 min-w-0">
						<div class="flex items-start justify-between">
							<h3 class="text-base font-medium text-gray-900 truncate">{property.title}</h3>
							<button
								onclick={(e) => {
									e.stopPropagation()
									toggleFeatured(property.id, property.featured)
								}}
								class={`px-2 py-1 text-xs font-semibold rounded-full transition-colors ${property.featured ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
							>
								Featured
							</button>
						</div>
						<p class="mt-1 text-sm text-gray-600">{property.location}</p>
						<div class="mt-2 flex items-center justify-between">
							<p class="text-sm text-gray-900">
								{typeof property.price === 'number' 
									? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(property.price)
									: property.price}
							</p>
							<button
								onclick={(e) => {
									e.stopPropagation()
									deleteProperty(property.id)
								}}
								class="text-red-600 hover:text-red-900 p-2 -mr-2"
								title="Delete property"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M3 6h18" />
									<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
									<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<!-- Desktop View -->
<div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Location</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Featured</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"></th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			{#each properties as property}
				<tr class="group cursor-pointer hover:bg-gray-50" onclick={() => openEditModal(property)}>
					<td class="px-6 py-4">
						<div class="flex items-center">
							<div class="flex-shrink-0 h-10 w-10">
								<img 
									src={property.images[0]} 
									alt={property.title}
									class="h-10 w-10 rounded-lg object-cover" 
								/>
							</div>
							<div class="ml-4">
								<div class="text-sm font-medium text-gray-900">{property.title}</div>
							</div>
						</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-700">{property.location}</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-900">
							{typeof property.price === 'number' 
								? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(property.price)
								: property.price}
						</div>
					</td>
					<td class="px-6 py-4">
						<button
							onclick={(e) => {
								e.stopPropagation()
								toggleFeatured(property.id, property.featured)
							}}
							class={`px-2 py-1 text-xs font-semibold rounded-full transition-colors ${property.featured ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
						>
							Featured
						</button>
					</td>
					<td class="px-6 py-4">
						<button
							onclick={(e) => {
								e.stopPropagation()
								deleteProperty(property.id)
							}}
							class="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-900 p-1"
							title="Delete property"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 6h18" />
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							</svg>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if properties.length === 0}
	<div class="text-center py-8 text-gray-500">
		No properties found
	</div>
{/if}

<PropertyModal
	showModal={state.showEditModal}
	editingProperty={state.editingProperty}
	{loading}
	onClose={() => {
		state.showEditModal = false
		state.editingProperty = null
	}}
	onSuccess={onRefresh}
/>
