<script lang="ts">
import { goto } from '$app/navigation'
import { pb } from '$lib/pocketbase'
import EditIcon from 'lucide-svelte/icons/edit'
import EyeIcon from 'lucide-svelte/icons/eye'
import EyeOffIcon from 'lucide-svelte/icons/eye-off'
import LogOutIcon from 'lucide-svelte/icons/log-out'
import PlusIcon from 'lucide-svelte/icons/plus'
import TrashIcon from 'lucide-svelte/icons/trash'
import { onMount } from 'svelte'
import { fade, scale } from 'svelte/transition'

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

interface Lead {
	id: string
	name: string
	email: string
	phone: string
	message: string
	created: string
	status: 'new' | 'contacted' | 'closed'
	property: string
	expand?: {
		property: Property
	}
}

let properties: Property[] = []
let leads: Lead[] = []
let loading = false
let error = ''
let showAddModal = false
let showEditModal = false
let editingProperty: Property | null = null
$: isAuthenticated = pb.authStore.isValid
$: activeTab = 'properties'

// Form data
let formData = {
	title: '',
	type: 'Warehouse',
	featured: false,
	location: '',
	price: '',
	area: 0,
	address: '',
	description: '',
	images: [] as File[]
}

// Check authentication on mount
onMount(async () => {
	if (!pb.authStore.isValid) {
		goto('/login?redirect=/dashboard')
		return
	}
	isAuthenticated = true
	await Promise.all([loadProperties(), loadLeads()])
})

async function loadProperties() {
	try {
		loading = true
		const records = await pb.collection('properties').getList<Property>(1, 50, {
			sort: '-created'
		})
		properties = records.items.map((item) => ({
			...item,
			images: item.images.map((img) => pb.files.getUrl(item, img))
		}))
	} catch (err) {
		error = 'Failed to load properties'
		console.error(err)
	} finally {
		loading = false
	}
}

async function loadLeads() {
	try {
		const records = await pb
			.collection('contact_submissions')
			.getList<Lead>(1, 50, {
				sort: '-created',
				expand: 'property'
			})
		leads = records.items
	} catch (err) {
		error = 'Failed to load leads'
		console.error(err)
	}
}

function openEditModal(property: Property) {
	editingProperty = property
	formData = {
		title: property.title,
		type: property.type,
		featured: property.featured,
		location: property.location,
		price: property.price as string,
		area: property.area,
		address: property.address,
		description: property.description,
		images: [] as File[]
	}
	showEditModal = true
}

async function handleSubmit() {
	try {
		loading = true
		const formDataObj = new FormData()

		// Add all form fields except images
		for (const [key, value] of Object.entries(formData)) {
			if (key !== 'images') {
				formDataObj.append(key, String(value))
			}
		}

		// Add multiple images
		for (const image of formData.images) {
			formDataObj.append('images', image)
		}

		await pb.collection('properties').create(formDataObj)

		// Reset form
		formData = {
			title: '',
			type: 'Warehouse',
			featured: false,
			location: '',
			price: '',
			area: 0,
			address: '',
			description: '',
			images: []
		}

		showAddModal = false
		await loadProperties()
	} catch (err) {
		error = 'Failed to create property'
		console.error(err)
	} finally {
		loading = false
	}
}

async function handleUpdate() {
	if (!editingProperty) return

	try {
		loading = true
		const formDataObj = new FormData()

		// Add all form fields except images
		for (const [key, value] of Object.entries(formData)) {
			if (key !== 'images') {
				formDataObj.append(key, String(value))
			}
		}

		// Add new images if any were selected
		for (const image of formData.images) {
			formDataObj.append('images+', image)
		}

		await pb.collection('properties').update(editingProperty.id, formDataObj)

		showEditModal = false
		editingProperty = null
		await loadProperties()
	} catch (err) {
		error = 'Failed to update property'
		console.error(err)
	} finally {
		loading = false
	}
}

async function toggleFeatured(id: string, featured: boolean) {
	try {
		await pb.collection('properties').update(id, { featured: !featured })
		await loadProperties()
	} catch (err) {
		error = 'Failed to update property'
		console.error(err)
	}
}

async function deleteProperty(id: string) {
	if (!confirm('Are you sure you want to delete this property?')) return

	try {
		await pb.collection('properties').delete(id)
		await loadProperties()
	} catch (err) {
		error = 'Failed to delete property'
		console.error(err)
	}
}

async function updateLeadStatus(id: string, status: Lead['status']) {
	try {
		await pb.collection('contact_submissions').update(id, { status })
		await loadLeads()
	} catch (err) {
		error = 'Failed to update lead status'
		console.error(err)
	}
}

async function deleteLead(id: string) {
	if (!confirm('Are you sure you want to delete this lead?')) return

	try {
		await pb.collection('contact_submissions').delete(id)
		await loadLeads()
	} catch (err) {
		error = 'Failed to delete lead'
		console.error(err)
	}
}

function handleImageChange(event: Event) {
	const input = event.target as HTMLInputElement
	if (input.files) {
		formData.images = Array.from(input.files)
	}
}

function handleLogout() {
	pb.authStore.clear()
	goto('/login')
}
</script>

{#if isAuthenticated}
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-2xl sm:text-3xl font-bold">Property Dashboard</h1>
			<button
				on:click={handleLogout}
				class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
			>
				<LogOutIcon class="w-5 h-5 mr-2" />
				Logout
			</button>
		</div>

		{#if error}
			<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
				{error}
			</div>
		{/if}

		<!-- Tab Navigation -->
		<div class="flex space-x-4 mb-8">
			<button
				class="px-6 py-2 rounded-lg font-medium transition-colors duration-200 {activeTab === 'properties' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-gray-light)] text-[var(--color-gray-dark)] hover:bg-[var(--color-gray-medium)]'}"
				on:click={() => activeTab = 'properties'}
			>
				Properties
			</button>
			<button
				class="px-6 py-2 rounded-lg font-medium transition-colors duration-200 {activeTab === 'leads' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-gray-light)] text-[var(--color-gray-dark)] hover:bg-[var(--color-gray-medium)]'}"
				on:click={() => activeTab = 'leads'}
			>
				Leads
			</button>
		</div>

		{#if activeTab === 'properties'}
			<!-- Add Property Button -->
			<div class="mb-8">
				<button
					on:click={() => showAddModal = true}
					class="inline-flex items-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-light)] transition-colors duration-200"
				>
					<PlusIcon class="w-5 h-5 mr-2" />
					Add Property
				</button>
			</div>

			<!-- Add Property Modal -->
			{#if showAddModal}
				<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" transition:fade>
					<div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" transition:scale={{duration: 300, start: 0.95}}>
						<div class="flex justify-between items-center mb-6">
							<h2 class="text-xl font-semibold">Add New Property</h2>
							<button 
								on:click={() => showAddModal = false}
								class="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>

						<form on:submit|preventDefault={handleSubmit} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Title</label>
								<input
									type="text"
									bind:value={formData.title}
									required
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Type</label>
								<select
									bind:value={formData.type}
									required
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								>
									<option value="Warehouse">Warehouse</option>
									<option value="Manufacturing Facility">Manufacturing Facility</option>
									<option value="Industrial Land">Industrial Land</option>
								</select>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Price</label>
								<input
									type="text"
									bind:value={formData.price}
									required
									placeholder="e.g. ₹20 Cr, Price on Request"
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Area (sqft)</label>
								<input
									type="number"
									bind:value={formData.area}
									required
									min="0"
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Address</label>
								<input
									type="text"
									bind:value={formData.address}
									required
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="sm:col-span-2 space-y-1">
								<label class="block text-sm font-medium text-gray-700">Description</label>
								<textarea
									bind:value={formData.description}
									required
									rows="3"
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								></textarea>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Images</label>
								<input
									type="file"
									accept="image/*"
									on:change={handleImageChange}
									required={!editingProperty}
									multiple
									class="w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[var(--color-primary)]/5 file:text-[var(--color-primary)] hover:file:bg-[var(--color-primary)]/10"
								/>
								{#if formData.images.length > 0}
									<p class="text-sm text-gray-500 mt-2">{formData.images.length} images selected</p>
								{/if}
							</div>

							<div class="flex items-center space-x-4">
								<label class="flex items-center cursor-pointer">
									<input
										type="checkbox"
										bind:checked={formData.featured}
										class="form-checkbox h-5 w-5 text-[var(--color-primary)] rounded"
									/>
									<span class="ml-2 text-sm text-gray-700">Featured Property</span>
								</label>
							</div>

							<div class="sm:col-span-2 flex justify-end space-x-4">
								<button
									type="button"
									on:click={() => showAddModal = false}
									class="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									class="px-6 py-3 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-light)] disabled:opacity-50 transition-colors duration-200"
								>
									Add Property
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}

			<!-- Edit Property Modal -->
			{#if showEditModal}
				<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" transition:fade>
					<div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" transition:scale={{duration: 300, start: 0.95}}>
						<div class="flex justify-between items-center mb-6">
							<h2 class="text-xl font-semibold">Edit Property</h2>
							<button 
								on:click={() => showEditModal = false}
								class="text-gray-500 hover:text-gray-700"
							>
								✕
							</button>
						</div>

						<form on:submit|preventDefault={handleUpdate} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Title</label>
								<input
									type="text"
									bind:value={formData.title}
									required
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Type</label>
								<select
									bind:value={formData.type}
									required
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								>
									<option value="Warehouse">Warehouse</option>
									<option value="Manufacturing Facility">Manufacturing Facility</option>
									<option value="Industrial Land">Industrial Land</option>
								</select>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Price</label>
								<input
									type="text"
									bind:value={formData.price}
									required
									placeholder="e.g. ₹20 Cr, Price on Request"
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Area (sqft)</label>
								<input
									type="number"
									bind:value={formData.area}
									required
									min="0"
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Address</label>
								<input
									type="text"
									bind:value={formData.address}
									required
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								/>
							</div>

							<div class="sm:col-span-2 space-y-1">
								<label class="block text-sm font-medium text-gray-700">Description</label>
								<textarea
									bind:value={formData.description}
									required
									rows="3"
									class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
								></textarea>
							</div>

							<div class="space-y-1">
								<label class="block text-sm font-medium text-gray-700">Add New Images</label>
								<input
									type="file"
									accept="image/*"
									on:change={handleImageChange}
									multiple
									class="w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[var(--color-primary)]/5 file:text-[var(--color-primary)] hover:file:bg-[var(--color-primary)]/10"
								/>
								{#if formData.images.length > 0}
									<p class="text-sm text-gray-500 mt-2">{formData.images.length} new images selected</p>
								{/if}
							</div>

							<div class="flex items-center space-x-4">
								<label class="flex items-center cursor-pointer">
									<input
										type="checkbox"
										bind:checked={formData.featured}
										class="form-checkbox h-5 w-5 text-[var(--color-primary)] rounded"
									/>
									<span class="ml-2 text-sm text-gray-700">Featured Property</span>
								</label>
							</div>

							<div class="sm:col-span-2 flex justify-end space-x-4">
								<button
									type="button"
									on:click={() => showEditModal = false}
									class="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={loading}
									class="px-6 py-3 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-light)] disabled:opacity-50 transition-colors duration-200"
								>
									Update Property
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}

			<!-- Properties List -->
			<div class="bg-white rounded-lg shadow-sm overflow-hidden">
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
			</div>
		{:else}
			<!-- Leads Section -->
			<div class="bg-white rounded-lg shadow-sm overflow-hidden">
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each leads as lead}
								<tr class="hover:bg-gray-50">
									<td class="px-6 py-4">
										<div class="text-sm font-medium text-gray-900">{lead.name}</div>
										<div class="text-sm text-gray-500">{lead.email}</div>
										<div class="text-sm text-gray-500">{lead.phone}</div>
									</td>
									<td class="px-6 py-4">
										<div class="text-sm text-gray-900 max-w-md whitespace-pre-wrap">{lead.message}</div>
										{#if lead.expand?.property}
											<div class="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
												Property: {lead.expand.property.title}
											</div>
										{/if}
									</td>
									<td class="px-6 py-4">
										<select
											value={lead.status}
											on:change={(e) => updateLeadStatus(lead.id, e.currentTarget.value as Lead['status'])}
											class="text-sm rounded-full px-3 py-1 font-semibold
												{lead.status === 'new' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 
												lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
												'bg-green-100 text-green-800'}"
										>
											<option value="new">New</option>
											<option value="contacted">Contacted</option>
											<option value="closed">Closed</option>
										</select>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{new Date(lead.created).toLocaleDateString()}
									</td>
									<td class="px-6 py-4">
										<button
											on:click={() => deleteLead(lead.id)}
											class="text-red-600 hover:text-red-900"
											title="Delete lead"
										>
											<TrashIcon class="h-5 w-5" />
										</button>
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="5" class="px-6 py-4 text-center text-gray-500">
										No leads found
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
{/if} 