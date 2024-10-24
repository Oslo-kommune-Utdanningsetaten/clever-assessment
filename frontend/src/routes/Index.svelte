<script lang="ts">
	function loginWithGoogle() {
		window.location.href = 'http://localhost:3000/auth/google'
	}

	import { onMount } from 'svelte'

	let user: any | null = null

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/auth/user', {
				credentials: 'include',
			})
			if (response.ok) {
				user = await response.json()
			} else {
				console.error('User not authenticated')
			}
		} catch (err) {
			console.error('Error fetching user data', err)
		}
	})
</script>

<h1>Velkommen til VV2</h1>
{#if user}
	<div>Welcome, {user.displayName}!</div>
{:else}
	<button type="button" class="btn btn-primary" on:click={loginWithGoogle}>
		Login with Google
	</button>
{/if}
