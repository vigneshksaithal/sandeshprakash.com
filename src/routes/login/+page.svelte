<script lang="ts">
import { goto } from '$app/navigation'
import { pb } from '$lib/pocketbase'
import { onMount } from 'svelte'

// biome-ignore lint/style/useConst: <explanation>
let email = $state('')
// biome-ignore lint/style/useConst: <explanation>
let password = $state('')
let error = $state('')
let isLoading = $state(false)

onMount(() => {
	if (pb.authStore.isValid) {
		goto('/dashboard')
	}
})

async function handleLogin() {
	try {
		isLoading = true
		error = ''
		await pb.collection('users').authWithPassword(email, password)
		goto('/dashboard')
	} catch (err) {
		if (err instanceof Error) {
			error = err.message
		} else {
			error = 'Invalid email or password'
		}
		console.error('Login error:', err)
	} finally {
		isLoading = false
	}
}
</script>

<div class="min-h-screen flex items-center justify-center bg-[var(--color-gray-light)] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-[var(--color-card-bg)] p-8 rounded-2xl shadow-[var(--shadow-md)]">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-[var(--color-text-dark)]">
                Sign in to your account
            </h2>
        </div>
        <form class="mt-8 space-y-6" onsubmit={handleLogin}>
            <div class="rounded-md shadow-[var(--shadow-sm)] -space-y-px">
                <div>
                    <label for="email" class="sr-only">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={isLoading}
                        bind:value={email}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--color-gray-medium)] placeholder-[var(--color-gray-medium)] text-[var(--color-text-dark)] rounded-t-md focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:z-10 sm:text-sm disabled:bg-[var(--color-gray-light)] disabled:cursor-not-allowed"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        disabled={isLoading}
                        bind:value={password}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--color-gray-medium)] placeholder-[var(--color-gray-medium)] text-[var(--color-text-dark)] rounded-b-md focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:z-10 sm:text-sm disabled:bg-[var(--color-gray-light)] disabled:cursor-not-allowed"
                        placeholder="Password"
                    />
                </div>
            </div>

            {#if error}
                <div class="text-red-500 text-sm text-center">{error}</div>
            {/if}

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[var(--color-text)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] disabled:bg-[var(--color-primary-light)] disabled:cursor-not-allowed transition-colors duration-[var(--transition-normal)]"
                >
                    {#if isLoading}
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--color-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                    {:else}
                        Sign in
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>
