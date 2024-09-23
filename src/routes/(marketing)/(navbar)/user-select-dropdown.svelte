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

	function handleSelectUser(userId) {
		const user = users.find((u) => u.id === userId)
		document.cookie = `selectedTestUserId=${user.id}; path=/;`
		$selectedTestUser = user
		invalidateAll()
	}

	function getCookie(name) {
		const value = `; ${document.cookie}`
		const parts = value.split(`; ${name}=`)
		if (parts.length === 2) return parts.pop().split(';').shift()
	}

	const users = [
		{
			id: '07f3ffa3-27c4-472e-9542-3f35e4d973e8',
			name: 'Paula Abdul',
			role: 'teacher',
			is_admin: false
		},
		{
			id: '125b78a7-f403-4687-8347-12c8b33ec7b7',
			name: 'Charlie Brown',
			role: 'teacher',
			is_admin: false
		},
		{
			id: '4e98330a-816f-4830-8942-971269c260b3',
			name: 'George Washington',
			role: 'student',
			is_admin: false
		},
		{
			id: '5f25690b-2d69-4338-8200-275207323a0e',
			name: 'Michael Scott',
			role: 'student',
			is_admin: false
		},
		{
			id: '628e52b0-16d3-4212-a533-8bffa8dae8fd',
			name: 'Kevin Hart',
			role: 'student',
			is_admin: false
		},
		{
			id: '69969d23-ec93-4a1e-9ce4-451199059496',
			name: 'Quentin Tarantino',
			role: 'student',
			is_admin: false
		},
		{
			id: '7a04b55f-e71e-47c5-8090-166e01e1c33f',
			name: 'Steve Jobs',
			role: 'student',
			is_admin: false
		},
		{
			id: '9cacd107-4e11-445e-9ca2-a697233a344d',
			name: 'Bob Smith',
			role: 'student',
			is_admin: false
		},
		{
			id: 'a56e808c-46e6-4bce-8f90-9308e3769a27',
			name: 'Jessica Jones',
			role: 'student',
			is_admin: false
		},
		{
			id: 'c36fce61-59b5-435f-8fc8-cac63301b956',
			name: 'Nina Simone',
			role: 'student',
			is_admin: false
		},
		{
			id: 'c649059b-ffd9-4ffb-a89f-dd56aa0470f7',
			name: 'Ian Malcolm',
			role: 'student',
			is_admin: false
		},
		{
			id: 'd0d66f81-aae3-4675-a607-405c7821aeb9',
			name: 'Alice Johnson',
			role: 'student',
			is_admin: false
		},
		{
			id: 'e40a76a1-5f30-4a80-99b8-811f6001e117',
			name: 'Tina Fey',
			role: 'teacher',
			is_admin: false
		},
		{
			id: 'e72f3cfb-5e4e-4da0-b15d-06eb96d62ae7',
			name: 'Hannah Montana',
			role: 'student',
			is_admin: false
		},
		{
			id: 'edfbf9a8-4cde-4634-8707-96b830973d66',
			name: 'Lara Croft',
			role: 'student',
			is_admin: false
		},
		{
			id: 'f7cba53f-fc0a-4229-a65b-d97a2a89c31e',
			name: 'Oscar Wilde',
			role: 'student',
			is_admin: false
		}
	]

	let { session } = $page.data
	;({ session } = $page.data)

	onMount(() => {
		const selectedTestUserId = getCookie('selectedTestUserId')
		if (selectedTestUserId) {
			$selectedTestUser = users.find((u) => u.id === selectedTestUserId)
		}
	})
</script>

{#if session}
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
	<span>empty</span>
{/if}
