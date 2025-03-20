<script lang="ts">
import { goto } from '$app/navigation'
import { pb } from '$lib/pocketbase'
import LogOutIcon from 'lucide-svelte/icons/log-out'
import PlusIcon from 'lucide-svelte/icons/plus'
import { onMount } from 'svelte'
import { fade } from 'svelte/transition'
import LeadList from './LeadList.svelte'
import PropertyList from './PropertyList.svelte'
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

const state = $state({
	properties: [] as Property[],
	leads: [] as Lead[],
	loading: false,
	error: '',
	showAddModal: false,
	activeTab: 'properties',
	isAuthenticated: false
})

$effect(() => {
	state.isAuthenticated = pb.authStore.isValid
})

// Check authentication on mount
onMount(async () => {
	if (!pb.authStore.isValid) {
		goto('/login?redirect=/dashboard')
		return
	}
	state.isAuthenticated = true
	await Promise.all([loadProperties(), loadLeads()])
})

const loadProperties = async () => {
	try {
		state.loading = true
		const records = await pb.collection('properties').getList<Property>(1, 50, {
			sort: '-created'
		})
		state.properties = records.items.map((item) => ({
			...item,
			images: item.images.map((img) => pb.files.getUrl(item, img))
		}))
	} catch (err) {
		state.error = 'Failed to load properties'
		console.error(err)
	} finally {
		state.loading = false
	}
}

const loadLeads = async () => {
	try {
		const records = await pb
			.collection('contact_submissions')
			.getList<Lead>(1, 50, {
				sort: '-created',
				expand: 'property'
			})
		state.leads = records.items
	} catch (err) {
		state.error = 'Failed to load leads'
		console.error(err)
	}
}

const handleLogout = () => {
	pb.authStore.clear()
	goto('/login')
}
</script>

{#if state.isAuthenticated}
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-2xl sm:text-3xl font-bold">Property Dashboard</h1>
			<button
				onclick={handleLogout}
				class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
			>
				<LogOutIcon class="w-5 h-5 mr-2" />
				Logout
			</button>
		</div>

		{#if state.error}
			<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" transition:fade>
				{state.error}
			</div>
		{/if}

		<!-- Tab Navigation -->
		<div class="flex space-x-4 mb-8">
			<button
				class="px-6 py-2 rounded-lg font-medium transition-colors duration-200 {state.activeTab === 'properties' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-gray-light)] text-[var(--color-gray-dark)] hover:bg-[var(--color-gray-medium)]'}"
				onclick={() => state.activeTab = 'properties'}
			>
				Properties
			</button>
			<button
				class="px-6 py-2 rounded-lg font-medium transition-colors duration-200 {state.activeTab === 'leads' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-gray-light)] text-[var(--color-gray-dark)] hover:bg-[var(--color-gray-medium)]'}"
				onclick={() => state.activeTab = 'leads'}
			>
				Leads
			</button>
		</div>

		{#if state.activeTab === 'properties'}
			<!-- Add Property Button -->
			<div class="mb-8">
				<button
					onclick={() => state.showAddModal = true}
					class="inline-flex items-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-light)] transition-colors duration-200"
				>
					<PlusIcon class="w-5 h-5 mr-2" />
					Add Property
				</button>
			</div>

			<PropertyList
				properties={state.properties}
				loading={state.loading}
				onRefresh={loadProperties}
			/>

			<PropertyModal
				showModal={state.showAddModal}
				editingProperty={null}
				loading={state.loading}
				onClose={() => state.showAddModal = false}
				onSuccess={loadProperties}
			/>
		{:else}
			<LeadList
				leads={state.leads}
				loading={state.loading}
				onRefresh={loadLeads}
			/>
		{/if}
	</div>
{/if} 