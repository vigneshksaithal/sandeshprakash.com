<script lang="ts">
import { pb } from '$lib/pocketbase'
import PropertyModal from './PropertyModal.svelte'

interface Property {
	id: string
	type: string
	featured: boolean
	location: string
	title: string
	price: string | number
	area: number
	address: string
	images: string[]
	description: string
	created: string
	updated: string
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
<div class="block sm:hidden">
	{#each properties as property}
		<div class="border-b border-gray-300 last:border-b-0">
			<div class="p-4 cursor-pointer" onclick={() => openEditModal(property)}>
				<div class="flex items-center space-x-4">
					<div class="flex-shrink-0 w-24">
						<img 
							src={property.images[0]} 
							alt={property.title} 
							class="h-24 w-24 object-cover rounded"
						/>
					</div>
					<div class="flex-1 min-w-0">
						<h3 class="text-base font-medium text-gray-900 truncate">{property.title}</h3>
						<p class="text-sm text-gray-500 mt-1">{property.location}</p>
						{#if property.featured}
							<span class="mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
								Featured
							</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<!-- Desktop View -->
<div class="hidden sm:block overflow-x-auto">
	<table class="min-w-full divide-y divide-gray-300">
		<thead class="bg-gray-100">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Location</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Featured</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-300">
			{#each properties as property}
				<tr class="group cursor-pointer hover:bg-gray-50" onclick={() => openEditModal(property)}>
					<td class="px-6 py-4">
						<div class="text-sm font-medium text-gray-900">{property.title}</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-700">{property.location}</div>
					</td>
					<td class="px-6 py-4">
						{#if property.featured}
							<span class="px-2 py-1 text-xs font-semibold rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
								Featured
							</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

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
