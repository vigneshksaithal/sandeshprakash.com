<script lang="ts">
import { pb } from '$lib/pocketbase'
import ImageIcon from 'lucide-svelte/icons/image'
import TrashIcon from 'lucide-svelte/icons/trash'
import XIcon from 'lucide-svelte/icons/x'
import { fade } from 'svelte/transition'

interface Property {
	id: string
	type: 'Warehouse' | 'Manufacturing' | 'Industrial Land' | 'Commercial'
	featured: boolean
	status: 'active' | 'archive'
	location: string
	title: string
	price: string
	area: string
	description: string
	images: string[]
	created: string
	updated: string
	isActive: boolean
}

interface FormData {
	type: Property['type']
	featured: boolean
	status: Property['status']
	location: string
	title: string
	price: string
	area: string
	description: string
	images: (string | File)[]
	isActive: boolean
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
		type: '' as Property['type'],
		featured: false,
		status: 'active' as Property['status'],
		location: '',
		title: '',
		price: '',
		area: '',
		description: '',
		images: [] as (string | File)[],
		isActive: true
	} as FormData,
	error: '',
	uploading: false,
	imageFiles: [] as File[],
	imagePreviews: [] as string[]
})

$effect(() => {
	if (editingProperty) {
		state.formData = {
			type: editingProperty.type,
			featured: editingProperty.featured,
			status: editingProperty.status,
			location: editingProperty.location,
			title: editingProperty.title,
			price: editingProperty.price,
			area: editingProperty.area,
			description: editingProperty.description,
			images: editingProperty.images,
			isActive: editingProperty.isActive
		}
		state.imagePreviews = editingProperty.images
	} else {
		state.formData = {
			type: '' as Property['type'],
			featured: false,
			status: 'active',
			location: '',
			title: '',
			price: '',
			area: '',
			description: '',
			images: [],
			isActive: true
		}
		state.imagePreviews = []
	}
})

const handleImageChange = async (e: Event) => {
	const input = e.target as HTMLInputElement
	if (!input.files?.length) return

	state.uploading = true
	state.error = ''

	try {
		const files = Array.from(input.files)
		state.imageFiles = [...state.imageFiles, ...files]

		// Generate previews
		const newPreviews = await Promise.all(
			files.map((file) => {
				return new Promise<string>((resolve) => {
					const reader = new FileReader()
					reader.onload = (e) => resolve(e.target?.result as string)
					reader.readAsDataURL(file)
				})
			})
		)

		state.imagePreviews = [...state.imagePreviews, ...newPreviews]
		state.formData.images = [...state.formData.images, ...files]
	} catch (err) {
		console.error('Failed to handle images:', err)
		state.error = 'Failed to handle images. Please try again.'
	} finally {
		state.uploading = false
	}
}

const removeImage = (index: number) => {
	state.formData.images = state.formData.images.filter((_, i) => i !== index)
	state.imagePreviews = state.imagePreviews.filter((_, i) => i !== index)
	state.imageFiles = state.imageFiles.filter((_, i) => i !== index)
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
		const formData = new FormData()
		for (const [key, value] of Object.entries(state.formData)) {
			if (key === 'images') {
				if (Array.isArray(value)) {
					// Handle existing images
					if (editingProperty) {
						const existingImages = value.filter(
							(img) => typeof img === 'string'
						)
						formData.append('images-', JSON.stringify(existingImages))
					}
					// Handle new images
					const newImages = value.filter((img) => img instanceof File)
					for (const image of newImages) {
						if (image instanceof File) {
							formData.append('images+', image)
						}
					}
				}
			} else {
				// Safely handle null/undefined values
				const stringValue =
					value === null || value === undefined ? '' : value.toString()
				formData.append(key, stringValue)
			}
		}

		if (editingProperty) {
			await pb.collection('properties').update(editingProperty.id, formData)
		} else {
			await pb.collection('properties').create(formData)
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
		class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-2 md:p-4 z-50 overflow-y-auto"
		transition:fade={{ duration: 200 }}
	>
		<div class="bg-[var(--color-card-bg)] rounded-2xl w-full max-w-2xl shadow-[var(--shadow-lg)] border border-[var(--color-primary-light)]/20 my-4 max-h-[90vh] flex flex-col">
			<div class="p-4 md:p-6 overflow-y-auto">
				<div class="flex justify-between items-center mb-4 md:mb-6 sticky top-0 bg-[var(--color-card-bg)] z-10 py-2">
					<h2 class="text-lg md:text-xl font-semibold text-[var(--color-text-dark)]">
						{editingProperty ? 'Edit Property' : 'Add New Property'}
					</h2>
					<button
						onclick={onClose}
						class="text-[var(--color-gray-medium)] hover:text-[var(--color-text-dark)] transition-colors p-2"
						title="Close modal"
					>
						<XIcon class="h-5 w-5" />
					</button>
				</div>

				<form onsubmit={handleSubmit} class="space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="title" class="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Title *</label>
							<input
								type="text"
								id="title"
								bind:value={state.formData.title}
								class="w-full px-3 py-2 rounded-md border border-[var(--color-gray-light)] shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
								required
							/>
						</div>

						<div>
							<label for="type" class="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Type *</label>
							<select
								id="type"
								bind:value={state.formData.type}
								class="w-full px-3 py-2 rounded-md border border-[var(--color-gray-light)] shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
								required
							>
								<option value="">Select type</option>
								<option value="Warehouse">Warehouse</option>
								<option value="Manufacturing">Manufacturing</option>
								<option value="Industrial Land">Industrial Land</option>
								<option value="Commercial">Commercial</option>
							</select>
						</div>

						<div>
							<label for="location" class="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Location *</label>
							<input
								type="text"
								id="location"
								bind:value={state.formData.location}
								class="w-full px-3 py-2 rounded-md border border-[var(--color-gray-light)] shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
								required
							/>
						</div>

						<div>
							<label for="price" class="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Price</label>
							<input
								type="text"
								id="price"
								bind:value={state.formData.price}
								class="w-full px-3 py-2 rounded-md border border-[var(--color-gray-light)] shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
							/>
						</div>

						<div>
							<label for="area" class="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Area</label>
							<input
								type="text"
								id="area"
								bind:value={state.formData.area}
								class="w-full px-3 py-2 rounded-md border border-[var(--color-gray-light)] shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
							/>
						</div>

						<div class="flex items-center h-full pt-6 gap-4">
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={state.formData.featured}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-[var(--color-gray-light)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
								<span class="ms-3 text-sm font-medium text-[var(--color-text-dark)]">Featured Property</span>
							</label>

							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={state.formData.isActive}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-[var(--color-gray-light)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
								<span class="ms-3 text-sm font-medium text-[var(--color-text-dark)]">Active</span>
							</label>
						</div>
					</div>

					<div>
						<label for="description" class="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Description</label>
						<textarea
							id="description"
							bind:value={state.formData.description}
							rows="4"
							class="w-full px-3 py-2 rounded-md border border-[var(--color-gray-light)] shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
						></textarea>
					</div>

					<div>
						<label class="block text-sm font-medium text-[var(--color-text-dark)] mb-2">Images</label>
						<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-min">
							{#each state.imagePreviews as preview, index}
								<div class="relative group aspect-square">
									<img
										src={preview}
										alt="Property preview"
										class="w-full h-full object-cover rounded-lg"
									/>
									<button
										type="button"
										onclick={() => removeImage(index)}
										class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<TrashIcon class="w-4 h-4" />
									</button>
								</div>
							{/each}
							<label class="relative cursor-pointer aspect-square flex items-center justify-center border-2 border-dashed border-[var(--color-gray-light)] rounded-lg hover:border-[var(--color-primary)] transition-colors">
								<input
									type="file"
									accept="image/*"
									multiple
									onchange={handleImageChange}
									class="hidden"
								/>
								<div class="text-center">
									<ImageIcon class="w-8 h-8 mx-auto text-[var(--color-gray-medium)]" />
									<span class="mt-2 block text-sm text-[var(--color-gray-medium)]">Add Images</span>
								</div>
							</label>
						</div>
					</div>

					{#if state.error}
						<div class="text-red-500 text-sm">{state.error}</div>
					{/if}

					<div class="flex justify-end gap-3 pt-4 sticky bottom-0 bg-[var(--color-card-bg)] z-10 py-4">
						<button
							type="button"
							onclick={onClose}
							class="px-4 py-2 text-[var(--color-text-dark)] hover:bg-gray-100 rounded-md transition-colors text-sm font-medium"
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-light)] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={loading || state.uploading}
						>
							{loading || state.uploading ? 'Saving...' : 'Save Property'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
