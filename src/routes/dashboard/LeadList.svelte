<script lang="ts">
import { pb } from '$lib/pocketbase'
import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
import ChevronUpIcon from 'lucide-svelte/icons/chevron-up'
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

const state = $state({
	expandedLeadId: null as string | null,
	selectedStatus: 'new' as 'new' | 'contacted' | 'closed'
})

const filteredLeads = $derived(
	leads.filter((lead) => lead.status === state.selectedStatus)
)

const deleteLead = async (id: string) => {
	if (!confirm('Are you sure you want to delete this lead?')) return

	try {
		await pb.collection('contact_submissions').delete(id)
		await onRefresh()
	} catch (err) {
		console.error('Failed to delete lead:', err)
	}
}

const updateLeadStatus = async (
	id: string,
	status: 'new' | 'contacted' | 'closed'
) => {
	try {
		await pb.collection('contact_submissions').update(id, { status })
		await onRefresh()
	} catch (err) {
		console.error('Failed to update lead status:', err)
	}
}

const toggleExpand = (id: string) => {
	state.expandedLeadId = state.expandedLeadId === id ? null : id
}
</script>

<div class="mb-6 flex justify-between items-center">
	<h2 class="text-xl font-semibold text-gray-900">Leads</h2>
	<div class="flex gap-2">
		<button
			class={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${state.selectedStatus === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
			onclick={() => state.selectedStatus = 'new'}
		>
			New Leads
		</button>
		<button
			class={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${state.selectedStatus === 'contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
			onclick={() => state.selectedStatus = 'contacted'}
		>
			Contacted
		</button>
		<button
			class={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${state.selectedStatus === 'closed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
			onclick={() => state.selectedStatus = 'closed'}
		>
			Closed
		</button>
	</div>
</div>

<!-- Mobile View -->
<div class="block sm:hidden">
	{#each filteredLeads as lead}
		<div class="border-b border-gray-300 last:border-b-0">
			<div class="p-4 flex items-start justify-between cursor-pointer" onclick={() => toggleExpand(lead.id)}>
				<div class="flex-1 min-w-0">
					<h3 class="text-base font-medium text-gray-900 truncate">{lead.name}</h3>
					<p class="text-xs text-gray-600 mt-2">
						{new Date(lead.created).toLocaleDateString()}
					</p>
				</div>
				<div class="ml-4">
					{#if state.expandedLeadId === lead.id}
						<ChevronUpIcon class="h-5 w-5 text-gray-600" />
					{:else}
						<ChevronDownIcon class="h-5 w-5 text-gray-600" />
					{/if}
				</div>
			</div>
			
			{#if state.expandedLeadId === lead.id}
				<div class="px-4 pb-4 space-y-4">
					<div>
						<label class="text-sm font-medium text-gray-800">Email</label>
						<p class="mt-1 text-sm text-gray-700">{lead.email}</p>
					</div>
					<div>
						<label class="text-sm font-medium text-gray-800">Phone</label>
						<p class="mt-1 text-sm text-gray-700">{lead.phone}</p>
					</div>
					<div>
						<label class="text-sm font-medium text-gray-800">Message</label>
						<p class="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p>
					</div>
					<div class="flex items-center justify-between pt-2">
						<select 
							class="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-700 bg-white"
							value={lead.status}
							onchange={(e) => updateLeadStatus(lead.id, e.currentTarget.value as any)}
						>
							<option value="new">New</option>
							<option value="contacted">Contacted</option>
							<option value="closed">Closed</option>
						</select>
						<button
							onclick={() => deleteLead(lead.id)}
							class="text-red-600 hover:text-red-900 p-1"
							title="Delete lead"
						>
							<TrashIcon class="h-5 w-5" />
						</button>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<!-- Desktop View -->
<div class="hidden sm:block overflow-x-auto">
	<table class="min-w-full divide-y divide-gray-300">
		<thead class="bg-gray-100">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Subject</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"></th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-300">
			{#each filteredLeads as lead}
				<tr class="group cursor-pointer hover:bg-gray-50" onclick={() => toggleExpand(lead.id)}>
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
						{new Date(lead.created).toLocaleDateString()}
					</td>
					<td class="px-6 py-4">
						<div class="text-sm font-medium text-gray-900">{lead.name}</div>
					</td>
					<td class="px-6 py-4">
						<div class="text-sm text-gray-700 max-w-xs truncate">{lead.message}</div>
					</td>
					<td class="px-6 py-4">
						<select 
							class="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-700 bg-white"
							value={lead.status}
							onchange={(e) => updateLeadStatus(lead.id, e.currentTarget.value as any)}
						>
							<option value="new">New</option>
							<option value="contacted">Contacted</option>
							<option value="closed">Closed</option>
						</select>
					</td>
					<td class="px-6 py-4">
						<button
							class="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-900"
							onclick={() => deleteLead(lead.id)}
							title="Delete lead"
						>
							<TrashIcon class="h-5 w-5" />
						</button>
					</td>
				</tr>
				{#if state.expandedLeadId === lead.id}
					<tr class="bg-gray-50">
						<td colspan="5" class="px-6 py-4">
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="text-sm font-medium text-gray-800">Email</label>
									<p class="mt-1 text-sm text-gray-700">{lead.email}</p>
								</div>
								<div>
									<label class="text-sm font-medium text-gray-800">Phone</label>
									<p class="mt-1 text-sm text-gray-700">{lead.phone}</p>
								</div>
								<div class="col-span-2">
									<label class="text-sm font-medium text-gray-800">Message</label>
									<p class="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p>
								</div>
							</div>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
