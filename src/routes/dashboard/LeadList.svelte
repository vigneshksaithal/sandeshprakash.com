<script lang="ts">
import { pb } from '$lib/pocketbase'
import TrashIcon from 'lucide-svelte/icons/trash'

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

const { leads, loading, onRefresh } = $props<{
	leads: Lead[]
	loading: boolean
	onRefresh: () => Promise<void>
}>()

const updateLeadStatus = async (id: string, status: Lead['status']) => {
	try {
		await pb.collection('contact_submissions').update(id, { status })
		await onRefresh()
	} catch (err) {
		console.error('Failed to update lead status:', err)
	}
}

const deleteLead = async (id: string) => {
	if (!confirm('Are you sure you want to delete this lead?')) return

	try {
		await pb.collection('leads').delete(id)
		await onRefresh()
	} catch (err) {
		console.error('Failed to delete lead:', err)
	}
}
</script>

<!-- Mobile View -->
<div class="block sm:hidden">
	{#each leads as lead}
		<div class="p-4 border-b border-gray-200 last:border-b-0">
			<div class="flex items-start justify-between">
				<div class="flex-1 min-w-0">
					<h3 class="text-base font-medium text-gray-900 truncate">{lead.name}</h3>
					<div class="mt-2 space-y-1">
						<p class="text-sm text-gray-500">{lead.email}</p>
						<p class="text-sm text-gray-500">{lead.phone}</p>
						<p class="text-sm text-gray-500 mt-2">{lead.message}</p>
					</div>
					<p class="text-xs text-gray-400 mt-2">
						{new Date(lead.created).toLocaleDateString()}
					</p>
				</div>
				<div class="ml-4">
					<button
						on:click={() => deleteLead(lead.id)}
						class="text-red-600 hover:text-red-900"
						title="Delete lead"
					>
						<TrashIcon class="h-6 w-6" />
					</button>
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
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			{#each leads as lead}
				<tr class="hover:bg-gray-50">
					<td class="px-6 py-4">
						<div class="text-sm font-medium text-gray-900">{lead.name}</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-900">{lead.email}</div>
						<div class="text-sm text-gray-500">{lead.phone}</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-500 max-w-xs truncate">{lead.message}</div>
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
			{/each}
		</tbody>
	</table>
</div>
