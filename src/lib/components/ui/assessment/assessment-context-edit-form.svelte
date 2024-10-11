<script>
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { cn, clickOutside } from '$lib/utils.js'
	let className = undefined
	export { className as class }

	export let teachingGroup
	export let assessmentContext
	export let doneFunction

	let form
	let success = false
	let error = null

	let localAssessmentContext = {}

	function initializeLocals() {
		if (assessmentContext) {
			localAssessmentContext = Object.assign({}, assessmentContext, {
				teachingGroup: { id: teachingGroup.id },
			})
		} else {
			localAssessmentContext = {
				title: null,
				description: null,
				teachingGroup,
			}
		}
	}

	function handleSave(event) {
		setTimeout(() => {
			doneFunction()
		}, 800)
	}

	onMount(() => {
		initializeLocals()
		page.subscribe($page => {
			if ($page.form) {
				success = $page.form.success
				error = $page.form.error
			}
		})
	})
</script>

{#if success}
	<p>Operation successful!</p>
{/if}

{#if error}
	<p>Error: {error}</p>
{/if}

<div
	class={cn('h-full bg-white p-4', className)}
	{...$$restProps}
	use:clickOutside
	on:click_outside={doneFunction}
>
	<form
		method="POST"
		action="?/{localAssessmentContext.id ? 'update' : 'create'}AssessmentContext"
		bind:this={form}
		use:enhance
	>
		<input type="hidden" name="assessmentContext" value={JSON.stringify(localAssessmentContext)} />
		<h2 class="mb-2 text-xl font-bold">
			{localAssessmentContext.id ? 'Redigerer' : 'Ny'} vurderingssituasjon i {teachingGroup.displayName}
		</h2>

		<div class="mb-4">
			<label for="content" class="text-l mb-2 block font-bold">Tittel</label>
			<input
				type="text"
				class="w-full rounded border border-gray-300 p-2"
				placeholder="Tittle"
				bind:value={localAssessmentContext.title}
			/>
		</div>

		<div class="mb-4">
			<label for="content" class="text-l mb-2 block font-bold">Beskrivelse</label>
			<textarea
				class="w-full rounded border border-gray-300 p-2"
				rows="3"
				placeholder="Kort beskrivelse av vurderingssituasjonen"
				bind:value={localAssessmentContext.description}
			></textarea>
		</div>

		<button
			type="submit"
			class="rounded bg-green-300 px-4 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
			on:click={handleSave}
		>
			Lagre
		</button>
		<button
			type="cancel"
			on:click={doneFunction}
			class="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-600 hover:text-white"
		>
			Avbryt
		</button>
	</form>
</div>
