<script lang="ts">
import { pb } from '$lib/pocketbase'
import EditIcon from 'lucide-svelte/icons/edit'
import EyeIcon from 'lucide-svelte/icons/eye'
import EyeOffIcon from 'lucide-svelte/icons/eye-off'
import TrashIcon from 'lucide-svelte/icons/trash'
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
		<div class="p-4 border-b border-gray-200 last:border-b-0">
			<div class="flex items-start space-x-4">
				<div class="flex-shrink-0 w-24">
					<img 
						src={property.images[0]} 
						alt={property.title} 
						class="h-24 w-24 object-cover rounded"
					/>
					{#if property.images.length > 1}
						<p class="text-xs text-gray-500 mt-1 text-center">+{property.images.length - 1} more</p>
					{/if}
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="text-base font-medium text-gray-900 truncate">{property.title}</h3>
					<p class="text-sm text-gray-500">{property.type}</p>
					<div class="mt-2 space-y-1">
						<p class="text-sm text-gray-900">{property.price}</p>
						<p class="text-sm text-gray-500">{property.area} sqft</p>
						<p class="text-sm text-gray-500">{property.location}</p>
					</div>
					<div class="mt-3 flex flex-wrap gap-2">
						{#if property.featured}
							<span class="px-2 py-1 text-xs font-semibold rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
								Featured
							</span>
						{/if}
					</div>
					<div class="mt-4 flex space-x-4">
						<button
							on:click={() => openEditModal(property)}
							class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
							title="Edit property"
						>
							<EditIcon class="h-6 w-6" />
						</button>
						<button
							on:click={() => toggleFeatured(property.id, property.featured)}
							class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
							title={property.featured ? 'Remove from featured' : 'Add to featured'}
						>
							{#if property.featured}
								<EyeOffIcon class="h-6 w-6" />
							{:else}
								<EyeIcon class="h-6 w-6" />
							{/if}
						</button>
						<button
							on:click={() => deleteProperty(property.id)}
							class="text-red-600 hover:text-red-900"
							title="Delete property"
						>
							<TrashIcon class="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<!-- Desktop View -->
<div class="hidden sm:block overflow-x-auto">
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			{#each properties as property}
				<tr class="hover:bg-gray-50">
					<td class="px-6 py-4">
						<div class="flex items-center">
							<div class="h-20 w-20 flex-shrink-0 relative group">
								<img 
									src={property.images[0]} 
									alt={property.title} 
									class="h-20 w-20 object-cover rounded"
								/>
								{#if property.images.length > 1}
									<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
										<span class="text-white text-sm">+{property.images.length - 1} more</span>
									</div>
								{/if}
							</div>
							<div class="ml-4">
								<div class="text-sm font-medium text-gray-900">{property.title}</div>
								<div class="text-sm text-gray-500">{property.type}</div>
							</div>
						</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-900">{property.price}</div>
						<div class="text-sm text-gray-500">{property.area} sqft</div>
						<div class="text-sm text-gray-500">{property.location}</div>
					</td>
					<td class="px-6 py-4">
						{#if property.featured}
							<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
								Featured
							</span>
						{/if}
					</td>
					<td class="px-6 py-4 space-x-2">
						<button
							on:click={() => openEditModal(property)}
							class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
							title="Edit property"
						>
							<EditIcon class="h-5 w-5" />
						</button>
						<button
							on:click={() => toggleFeatured(property.id, property.featured)}
							class="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
							title={property.featured ? 'Remove from featured' : 'Add to featured'}
						>
							{#if property.featured}
								<EyeOffIcon class="h-5 w-5" />
							{:else}
								<EyeIcon class="h-5 w-5" />
							{/if}
						</button>
						<button
							on:click={() => deleteProperty(property.id)}
							class="text-red-600 hover:text-red-900"
							title="Delete property"
						>
							<TrashIcon class="h-5 w-5" />
						</button>
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
