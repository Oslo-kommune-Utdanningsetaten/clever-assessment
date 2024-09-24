<script>
	import { Button } from '$ui/button'
	import * as Dropdown from '$ui/dropdown-menu'
	import { page } from '$app/stores'
	import { selectedTestUser } from '$lib/stores/userStore.js'
	import { invalidateAll } from '$app/navigation'
	import { onMount } from 'svelte'

	import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
	import UserIcon from 'lucide-svelte/icons/user'
	import AdminIcon from 'lucide-svelte/icons/shield'
	import TeacherIcon from 'lucide-svelte/icons/graduation-cap'
	import StudentIcon from 'lucide-svelte/icons/baby'

	export let users = []

	function handleSelectUser(userId) {
		const user = users.find((u) => u.id === userId)
		document.cookie = `selectedTestUserId=${user.id}; path=/;`
		$selectedTestUser = user
		console.log('selectedTestUser', $selectedTestUser)
		invalidateAll()
	}

	function getCookie(name) {
		const value = `; ${document.cookie}`
		const parts = value.split(`; ${name}=`)
		if (parts.length === 2) return parts.pop().split(';').shift()
	}

	let { session } = $page.data
	;({ session } = $page.data)

	$: {
		users = $page.data.users
	}

	onMount(() => {
		const selectedTestUserId = getCookie('selectedTestUserId')
		if (selectedTestUserId) {
			$selectedTestUser = users.find((u) => u.id === selectedTestUserId)
		}
	})
</script>

{#if users?.length > 0}
	<Dropdown.Root>
		<Dropdown.Trigger let:builder asChild>
			<Button builders={[builder]} variant="ghost" class="space-x-1">
				{#if $selectedTestUser.is_admin}
					<AdminIcon class="h-[1.2rem] w-[1.2rem]" />
				{:else if $selectedTestUser.role === 'teacher'}
					<TeacherIcon class="h-[1.2rem] w-[1.2rem]" />
				{:else}
					<StudentIcon class="h-[1.2rem] w-[1.2rem]" />
				{/if}
				<span> {$selectedTestUser.name}</span>
				<ChevronDownIcon class="h-4" />
			</Button>
		</Dropdown.Trigger>
		<Dropdown.Content class="min-w-48">
			<Dropdown.RadioGroup onValueChange={handleSelectUser}>
				{#each users as user}
					<Dropdown.RadioItem class="flex cursor-pointer space-x-2" value={user.id}>
						{#if user.is_admin}
							<AdminIcon class="h-[1.2rem] w-[1.2rem]" />
						{:else if user.role === 'teacher'}
							<TeacherIcon class="h-[1.2rem] w-[1.2rem]" />
						{:else}
							<StudentIcon class="h-[1.2rem] w-[1.2rem]" />
						{/if}
						<span> {user.name} </span>
					</Dropdown.RadioItem>
				{/each}
			</Dropdown.RadioGroup>
		</Dropdown.Content>
	</Dropdown.Root>
{:else}
	<span>No user available</span>
{/if}
