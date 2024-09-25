<script>
	import { cn } from '$lib/utils.js'
	let className = undefined
	export { className as class }
	export let assessment
	export let assessmentContext
	export let student
	export let saveFunction
	export let cancelFunction

	assessment = assessment || {}
</script>

<div class={cn('h-full bg-white p-4 shadow-lg', className)} {...$$restProps}>
	<form>
		<h2 class="mb-4 text-xl font-bold">Edit assessment</h2>
		<p>
			Fields we need to set here: <code>
				teacher_id, student_id, content, is_self_assessment, assessment_context
			</code>
		</p>
		<div class="mb-4">
			<label class="block text-gray-700">Title</label>
			<input type="text" class="w-full rounded border border-gray-300 p-2" />
		</div>
		<div class="mb-4">
			<label class="block text-gray-700">Content</label>
			<textarea class="w-full rounded border border-gray-300 p-2"></textarea>
		</div>
		<button type="submit" on:click={saveFunction} class="rounded bg-blue-500 px-4 py-2 text-white">
			Lagre
		</button>
		<button
			type="cancel"
			on:click={cancelFunction}
			class="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-300 hover:text-gray-700"
		>
			Avbryt
		</button>
	</form>
</div>
