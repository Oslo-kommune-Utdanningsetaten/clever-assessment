<script>
	import { enhance } from '$app/forms'
	import { cn } from '$lib/utils.js'
	import { onMount } from 'svelte'
	import Toggle from 'svelte-toggle'
	let className = undefined
	export { className as class }

	export let assessment
	export let assessmentContext
	export let teacher
	export let student
	export let doneFunction

	let localAssessment = {}
	let localTextContent

	function initializeLocals() {
		if (assessment) {
			localAssessment = Object.assign({}, incomingAssessment)
		} else {
			localAssessment = {
				teacherId: teacher.id,
				studentId: student.id,
				assessmentFormat: 'text',
				assessmentContext,
				title: 'Default title',
				content: { text: 'Default content' },
				isVisibleToStudent: true,
			}
		}
		localTextContent = localAssessment.content.text
	}

	function handleContentInput() {
		localAssessment.content.text = localTextContent
		localAssessment = Object.assign({}, localAssessment)
		console.log('handleContentInput localAssessment updated', localAssessment)
	}

	function handleToggleStudentVisibility() {
		localAssessment.isVisibleToStudent = !localAssessment.isVisibleToStudent
		localAssessment = Object.assign({}, localAssessment)
		console.log('handleToggleStudentVisibility localAssessment updated', localAssessment)
	}

	function handleSave(event) {
		event.preventDefault()
		console.log('handleSave', localAssessment)
		doneFunction()

		//     if (e.useDefault != true){
		//     alert("we're preventing");
		//     e.preventDefault();
		//     alert(e.screenX);
		//     //Firing the regular action
		//     var evt = document.createEvent("HTMLEvents");
		//     evt.initEvent(e.type,e.bubbles,e.cancelable);
		//     evt["useDefault"] = true;
		//     //Add other "e" attributes like screenX, pageX, etc...
		//     this.dispatchEvent(evt);
		// }
		// else{
		//     alert("we're not preventing");
		// }
	}

	onMount(() => {
		initializeLocals()
	})
</script>

<div class={cn('h-full bg-white p-4 shadow-lg', className)} {...$$restProps}>
	<form method="POST" use:enhance>
		<input type="hidden" name="redirectUrl" value="boomchakka" />
		<input type="hidden" name="assessment" value={JSON.stringify(localAssessment)} />
		<h2 class="mb-4 text-xl font-bold">Edit assessment</h2>
		<pre>{JSON.stringify(localAssessment, null, 2)}</pre>
		<div class="mb-4">
			<label class="block text-gray-700">Title</label>
			<input
				type="text"
				class="w-full rounded border border-gray-300 p-2"
				bind:value={localAssessment.title}
			/>
		</div>

		<div class="mb-4">
			<label class="block text-gray-700">Content</label>
			<textarea
				class="w-full rounded border border-gray-300 p-2"
				bind:value={localTextContent}
				on:input={handleContentInput}
			></textarea>
		</div>
		<div class="mb-4">
			<Toggle
				on:toggle={handleToggleStudentVisibility}
				label="Synlig for eleven"
				switchColor="#eee"
				toggledColor="#24a148"
				untoggledColor="#fa4d56"
				on="Ja"
				off="Nei"
			/>
		</div>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white" on:click={handleSave}>
			Lagre
		</button>
		<button
			type="cancel"
			on:click={doneFunction}
			class="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-300 hover:text-gray-700"
		>
			Avbryt
		</button>
	</form>
</div>
