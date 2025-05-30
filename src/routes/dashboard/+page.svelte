<script lang="ts">
import { goto } from '$app/navigation'
import { pb } from '$lib/pocketbase'
import LogOutIcon from 'lucide-svelte/icons/log-out'
import MenuIcon from 'lucide-svelte/icons/menu'
import PlusIcon from 'lucide-svelte/icons/plus'
import XIcon from 'lucide-svelte/icons/x'
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
	isAuthenticated: false,
	isMobileMenuOpen: false
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

const handleAddProperty = () => {
	state.activeTab = 'properties'
	state.showAddModal = true
}
</script>

{#if state.isAuthenticated}
	<header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
		<nav class="container mx-auto px-4">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center">
					<span class="text-2xl font-bold text-[var(--color-primary)]">Dashboard</span>
				</div>

				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button
						onclick={() => state.isMobileMenuOpen = !state.isMobileMenuOpen}
						class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-100"
					>
						{#if state.isMobileMenuOpen}
							<XIcon class="h-6 w-6" />
						{:else}
							<MenuIcon class="h-6 w-6" />
						{/if}
					</button>
				</div>

				<!-- Desktop navigation -->
				<div class="hidden md:flex items-center space-x-6">
					<a
						href="https://umami.comparevpn.net/share/7fiHldSDJdN0Azo3/sandeshprakash.com"
						target="_blank"
						rel="noopener noreferrer" 
						class="relative px-4 py-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium group cursor-pointer"
					>
						Analytics
					</a>
					<button
						class="relative px-4 py-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium group cursor-pointer"
						onclick={() => state.activeTab = 'properties'}
					>
						<span class="relative z-10">Properties</span>
						{#if state.activeTab === 'properties'}
							<div class="absolute inset-0 bg-[var(--color-primary)]/10 rounded-lg transform scale-105"></div>
						{/if}
					</button>
					<button
						class="relative px-4 py-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors font-medium group cursor-pointer"
						onclick={() => state.activeTab = 'leads'}
					>
						<span class="relative z-10">Leads</span>
						{#if state.activeTab === 'leads'}
							<div class="absolute inset-0 bg-[var(--color-primary)]/10 rounded-lg transform scale-105"></div>
						{/if}
					</button>
					<button
						onclick={handleAddProperty}
						class="inline-flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-light)] transition-colors duration-200 shadow-sm hover:shadow cursor-pointer"
					>
						<PlusIcon class="w-4 h-4 mr-2" />
						Add Property
					</button>
					<button
						onclick={handleLogout}
						class="px-4 py-2 bg-[var(--color-gray-medium)] text-white rounded-md transition-colors hover:bg-[var(--color-gray-dark)] flex items-center shadow-sm hover:shadow cursor-pointer"
					>
						<LogOutIcon class="w-5 h-5 mr-2" />
						Logout
					</button>
				</div>
			</div>

			<!-- Mobile menu -->
			{#if state.isMobileMenuOpen}
				<div class="md:hidden" transition:fade>
					<div class="px-2 pt-2 pb-3 space-y-1">
						<a
							href="https://umami.comparevpn.net/share/7fiHldSDJdN0Azo3/sandeshprakash.com"
							target="_blank"
							rel="noopener noreferrer"
							class="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-dark)] hover:text-[var(--color-primary)] hover:bg-gray-100"
						>
							Analytics
						</a>
						<button
							class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-dark)] hover:text-[var(--color-primary)] hover:bg-gray-100"
							onclick={() => {
								state.activeTab = 'properties'
								state.isMobileMenuOpen = false
							}}
						>
							Properties
							{#if state.activeTab === 'properties'}
								<div class="absolute right-0 inset-y-0 w-1 bg-[var(--color-primary)]"></div>
							{/if}
						</button>
						<button
							class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-dark)] hover:text-[var(--color-primary)] hover:bg-gray-100"
							onclick={() => {
								state.activeTab = 'leads'
								state.isMobileMenuOpen = false
							}}
						>
							Leads
							{#if state.activeTab === 'leads'}
								<div class="absolute right-0 inset-y-0 w-1 bg-[var(--color-primary)]"></div>
							{/if}
						</button>
						<button
							onclick={() => {
								handleAddProperty()
								state.isMobileMenuOpen = false
							}}
							class="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
						>
							<div class="flex items-center">
								<PlusIcon class="w-4 h-4 mr-2" />
								Add Property
							</div>
						</button>
						<button
							onclick={handleLogout}
							class="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[var(--color-gray-medium)] text-white hover:bg-[var(--color-gray-dark)]"
						>
							<div class="flex items-center">
								<LogOutIcon class="w-5 h-5 mr-2" />
								Logout
							</div>
						</button>
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<div class="container mx-auto px-4 py-8 max-w-7xl mt-16">
		{#if state.error}
			<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" transition:fade>
				{state.error}
			</div>
		{/if}

		{#if state.activeTab === 'properties'}
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