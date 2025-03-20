<script lang="ts">
import { pb } from '$lib/pocketbase'
import ImageIcon from 'lucide-svelte/icons/image'
import TrashIcon from 'lucide-svelte/icons/trash'
import XIcon from 'lucide-svelte/icons/x'
import { fade } from 'svelte/transition'

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

const { showModal, editingProperty, loading, onClose, onSuccess } = $props<{
	showModal: boolean
	editingProperty: Property | null
	loading: boolean
	onClose: () => void
	onSuccess: () => Promise<void>
}>()

const state = $state({
	formData: {
		type: '',
		featured: false,
		location: '',
		title: '',
		price: '',
		area: 0,
		address: '',
		images: [] as string[],
		description: ''
	},
	error: '',
	uploading: false,
	imageFiles: [] as File[]
})

$effect(() => {
	if (editingProperty) {
		state.formData = {
			type: editingProperty.type,
			featured: editingProperty.featured,
			location: editingProperty.location,
			title: editingProperty.title,
			price: editingProperty.price,
			area: editingProperty.area,
			address: editingProperty.address,
			images: editingProperty.images,
			description: editingProperty.description
		}
	} else {
		state.formData = {
			type: '',
			featured: false,
			location: '',
			title: '',
			price: '',
			area: 0,
			address: '',
			images: [],
			description: ''
		}
	}
})

const handleImageChange = async (e: Event) => {
	const input = e.target as HTMLInputElement
	if (!input.files?.length) return

	state.uploading = true
	state.error = ''

	try {
		const files = Array.from(input.files)
		state.imageFiles = files

		for (const file of files) {
			const formData = new FormData()
			formData.append('file', file)

			const response = await pb.collection('properties').upload('', formData)
			state.formData.images = [...state.formData.images, response.url]
		}
	} catch (err) {
		console.error('Failed to upload images:', err)
		state.error = 'Failed to upload images. Please try again.'
	} finally {
		state.uploading = false
	}
}

const removeImage = (index: number) => {
	state.formData.images = state.formData.images.filter((_, i) => i !== index)
}

const handleSubmit = async () => {
	if (
		!state.formData.title ||
		!state.formData.type ||
		!state.formData.location
	) {
		state.error = 'Please fill in all required fields'
		return
	}

	try {
		if (editingProperty) {
			await pb
				.collection('properties')
				.update(editingProperty.id, state.formData)
		} else {
			await pb.collection('properties').create(state.formData)
		}

		await onSuccess()
		onClose()
	} catch (err) {
		console.error('Failed to save property:', err)
		state.error = 'Failed to save property. Please try again.'
	}
}
</script>

{#if showModal}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
		transition:fade={{ duration: 200 }}
	>
		<div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
			<div class="p-6">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-xl font-semibold">
						{editingProperty ? 'Edit Property' : 'Add New Property'}
					</h2>
					<button
						onclick={onClose}
						class="text-gray-500 hover:text-gray-700"
						title="Close modal"
					>
						<XIcon class="h-6 w-6" />
					</button>
				</div>

				<form onsubmit={handleSubmit} class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label for="title" class="block text-sm font-medium text-gray-700">Title *</label>
							<input
								type="text"
								id="title"
								bind:value={state.formData.title}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
								required
							/>
						</div>

						<div>
							<label for="type" class="block text-sm font-medium text-gray-700">Type *</label>
							<select
								id="type"
								bind:value={state.formData.type}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
								required
							>
								<option value="">Select type</option>
								<option value="Apartment">Apartment</option>
								<option value="House">House</option>
								<option value="Villa">Villa</option>
								<option value="Commercial">Commercial</option>
							</select>
						</div>

						<div>
							<label for="location" class="block text-sm font-medium text-gray-700">Location *</label>
							<input
								type="text"
								id="location"
								bind:value={state.formData.location}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
								required
							/>
						</div>

						<div>
							<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
							<input
								type="text"
								id="price"
								bind:value={state.formData.price}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
							/>
						</div>

						<div>
							<label for="area" class="block text-sm font-medium text-gray-700">Area (sqft)</label>
							<input
								type="number"
								id="area"
								bind:value={state.formData.area}
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
							/>
						</div>

						<div>
							<label for="featured" class="flex items-center space-x-2">
								<input
									type="checkbox"
									id="featured"
									bind:checked={state.formData.featured}
									class="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
								/>
								<span class="text-sm font-medium text-gray-700">Featured Property</span>
							</label>
						</div>
					</div>

					<div>
						<label for="address" class="block text-sm font-medium text-gray-700">Address</label>
						<textarea
							id="address"
							bind:value={state.formData.address}
							rows="2"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
						></textarea>
					</div>

					<div>
						<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
						<textarea
							id="description"
							bind:value={state.formData.description}
							rows="4"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm"
						></textarea>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Images</label>
						<div class="flex flex-wrap gap-4">
							{#each state.formData.images as image, index}
								<div class="relative group">
									<img
										src={image}
										alt="Property"
										class="h-24 w-24 object-cover rounded"
									/>
									<button
										type="button"
										onclick={() => removeImage(index)}
										class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
										title="Remove image"
									>
										<TrashIcon class="h-4 w-4" />
									</button>
								</div>
							{/each}
							<label class="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[var(--color-primary)] transition-colors">
								<input
									type="file"
									accept="image/*"
									multiple
									onchange={handleImageChange}
									class="hidden"
								/>
								<ImageIcon class="h-8 w-8 text-gray-400" />
							</label>
						</div>
					</div>

					{#if state.error}
						<p class="text-red-600 text-sm">{state.error}</p>
					{/if}

					<div class="flex justify-end space-x-3">
						<button
							type="button"
							onclick={onClose}
							class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
							disabled={loading || state.uploading}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] border border-transparent rounded-md shadow-sm hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
							disabled={loading || state.uploading}
						>
							{loading || state.uploading ? 'Loading...' : editingProperty ? 'Save Changes' : 'Add Property'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
