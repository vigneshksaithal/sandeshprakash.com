<script lang="ts">
import { pb } from '$lib/pocketbase'
import { onMount } from 'svelte'
import { goto } from '$app/navigation'
import PlusIcon from 'lucide-svelte/icons/plus'
import TrashIcon from 'lucide-svelte/icons/trash'
import ArchiveIcon from 'lucide-svelte/icons/archive'
import EyeIcon from 'lucide-svelte/icons/eye'
import EyeOffIcon from 'lucide-svelte/icons/eye-off'

interface Property {
	id: string
	type: string
	featured: boolean
	location: string
	name: string
	price: number
	size: number
	address: string
	image: string
	status: string
	description: string
	created: string
	updated: string
}

let properties: Property[] = []
let loading = false
let error = ''
let isAuthenticated = false

// Form data
let formData = {
	name: '',
	type: 'Warehouse',
	featured: false,
	location: '',
	price: 0,
	size: 0,
	address: '',
	description: '',
	image: null as File | null,
	status: 'active'
}

// Check authentication on mount
onMount(async () => {
	if (!pb.authStore.isValid) {
		goto('/login?redirect=/dashboard')
		return
	}
	isAuthenticated = true
	await loadProperties()
})

async function loadProperties() {
	try {
		loading = true
		const records = await pb.collection('properties').getList<Property>(1, 50, {
			sort: '-created'
		})
		properties = records.items.map((item) => ({
			...item,
			image: pb.files.getUrl(item, item.image)
		}))
	} catch (err) {
		error = 'Failed to load properties'
		console.error(err)
	} finally {
		loading = false
	}
}

async function handleSubmit() {
	try {
		loading = true
		const formDataObj = new FormData()

		// Add all form fields
		for (const [key, value] of Object.entries(formData)) {
			if (key === 'image' && value instanceof File) {
				formDataObj.append('image', value)
			} else if (key !== 'image') {
				formDataObj.append(key, String(value))
			}
		}

		await pb.collection('properties').create(formDataObj)

		// Reset form
		formData = {
			name: '',
			type: 'Warehouse',
			featured: false,
			location: '',
			price: 0,
			size: 0,
			address: '',
			description: '',
			image: null,
			status: 'active'
		}

		await loadProperties()
	} catch (err) {
		error = 'Failed to create property'
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

async function toggleStatus(id: string, status: string) {
	try {
		const newStatus = status === 'active' ? 'archived' : 'active'
		await pb.collection('properties').update(id, { status: newStatus })
		await loadProperties()
	} catch (err) {
		error = 'Failed to update property status'
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

function handleImageChange(event: Event) {
	const input = event.target as HTMLInputElement
	formData.image = input.files?.[0] ?? null
}
</script>

{#if isAuthenticated}
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<h1 class="text-2xl sm:text-3xl font-bold mb-8">Property Dashboard</h1>

		{#if error}
			<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
				{error}
			</div>
		{/if}

		<!-- Add Property Form -->
		<div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
			<h2 class="text-lg sm:text-xl font-semibold mb-4">Add New Property</h2>
			<form on:submit|preventDefault={handleSubmit} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="space-y-1">
					<label class="block text-sm font-medium text-gray-700">Name</label>
					<input
						type="text"
						bind:value={formData.name}
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
					<label class="block text-sm font-medium text-gray-700">Location</label>
					<input
						type="text"
						bind:value={formData.location}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
					/>
				</div>

				<div class="space-y-1">
					<label class="block text-sm font-medium text-gray-700">Price (Cr)</label>
					<input
						type="number"
						bind:value={formData.price}
						required
						min="0"
						step="0.01"
						class="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
					/>
				</div>

				<div class="space-y-1">
					<label class="block text-sm font-medium text-gray-700">Size (sqft)</label>
					<input
						type="number"
						bind:value={formData.size}
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
					<label class="block text-sm font-medium text-gray-700">Image</label>
					<input
						type="file"
						accept="image/*"
						on:change={handleImageChange}
						required
						class="w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					/>
				</div>

				<div class="flex items-center space-x-4">
					<label class="flex items-center cursor-pointer">
						<input
							type="checkbox"
							bind:checked={formData.featured}
							class="form-checkbox h-5 w-5 text-blue-600 rounded"
						/>
						<span class="ml-2 text-sm text-gray-700">Featured Property</span>
					</label>
				</div>

				<div class="sm:col-span-2">
					<button
						type="submit"
						disabled={loading}
						class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-base font-medium transition-colors duration-200"
					>
						<PlusIcon class="w-5 h-5 mr-2" />
						Add Property
					</button>
				</div>
			</form>
		</div>

		<!-- Properties List -->
		<div class="bg-white rounded-lg shadow-sm overflow-hidden">
			<!-- Mobile View -->
			<div class="block sm:hidden">
				{#each properties as property}
					<div class="p-4 border-b border-gray-200 last:border-b-0">
						<div class="flex items-start space-x-4">
							<img src={property.image} alt={property.name} class="h-24 w-24 object-cover rounded" />
							<div class="flex-1 min-w-0">
								<h3 class="text-base font-medium text-gray-900 truncate">{property.name}</h3>
								<p class="text-sm text-gray-500">{property.type}</p>
								<div class="mt-2 space-y-1">
									<p class="text-sm text-gray-900">₹{property.price} Cr</p>
									<p class="text-sm text-gray-500">{property.size} sqft</p>
									<p class="text-sm text-gray-500">{property.location}</p>
								</div>
								<div class="mt-3 flex flex-wrap gap-2">
									<span class="px-2 py-1 text-xs font-semibold rounded-full 
										{property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
										{property.status}
									</span>
									{#if property.featured}
										<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
											Featured
										</span>
									{/if}
								</div>
								<div class="mt-4 flex space-x-4">
									<button
										on:click={() => toggleFeatured(property.id, property.featured)}
										class="text-blue-600 hover:text-blue-900"
										title={property.featured ? 'Remove from featured' : 'Add to featured'}
									>
										{#if property.featured}
											<EyeOffIcon class="h-6 w-6" />
										{:else}
											<EyeIcon class="h-6 w-6" />
										{/if}
									</button>
									<button
										on:click={() => toggleStatus(property.id, property.status)}
										class="text-yellow-600 hover:text-yellow-900"
										title={property.status === 'active' ? 'Archive property' : 'Activate property'}
									>
										<ArchiveIcon class="h-6 w-6" />
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
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each properties as property}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4">
									<div class="flex items-center">
										<div class="h-20 w-20 flex-shrink-0">
											<img src={property.image} alt={property.name} class="h-20 w-20 object-cover rounded" />
										</div>
										<div class="ml-4">
											<div class="text-sm font-medium text-gray-900">{property.name}</div>
											<div class="text-sm text-gray-500">{property.type}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm text-gray-900">₹{property.price} Cr</div>
									<div class="text-sm text-gray-500">{property.size} sqft</div>
									<div class="text-sm text-gray-500">{property.location}</div>
								</td>
								<td class="px-6 py-4">
									<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
										{property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
										{property.status}
									</span>
									{#if property.featured}
										<span class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
											Featured
										</span>
									{/if}
								</td>
								<td class="px-6 py-4 space-x-2">
									<button
										on:click={() => toggleFeatured(property.id, property.featured)}
										class="text-blue-600 hover:text-blue-900"
										title={property.featured ? 'Remove from featured' : 'Add to featured'}
									>
										{#if property.featured}
											<EyeOffIcon class="h-5 w-5" />
										{:else}
											<EyeIcon class="h-5 w-5" />
										{/if}
									</button>
									<button
										on:click={() => toggleStatus(property.id, property.status)}
										class="text-yellow-600 hover:text-yellow-900"
										title={property.status === 'active' ? 'Archive property' : 'Activate property'}
									>
										<ArchiveIcon class="h-5 w-5" />
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
	</div>
{/if} 