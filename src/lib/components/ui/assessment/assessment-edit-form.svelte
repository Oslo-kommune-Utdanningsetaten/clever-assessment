<script>
	import { onMount } from 'svelte'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { cn, clickOutside } from '$lib/utils.js'
	import { Button } from '$ui/button'
	import * as Dropdown from '$ui/dropdown-menu'
	import Toggle from 'svelte-toggle'
	import TeacherIcon from 'lucide-svelte/icons/graduation-cap'
	import ChevronDownIcon from 'lucide-svelte/icons/chevron-down'
	let className = undefined
	export { className as class }

	export let assessment
	export let assessmentContext
	export let teacher
	export let student
	export let doneFunction
	export let assessmentFormats

	let form
	let success = false
	let error = null

	let localAssessment = {}
	let localTextContent

	// assessmentFormat variants:
	// text, video, audio, single_tag, multiple_tags

	function initializeLocals() {
		if (assessment) {
			localAssessment = Object.assign({}, assessment, {
				assessmentContext: { id: assessmentContext.id },
			})
		} else {
			localAssessment = {
				teacher,
				student,
				assessmentFormat: Object.assign({}, assessmentFormats[4]), // default to text
				assessmentContext,
				title: null,
				content: { text: null, video: null, audio: null, tag: null, tags: [] },
				isVisibleToStudent: true,
				isSelfAssessment: false,
			}
		}
		localTextContent = localAssessment.content.text
	}

	function handleContentInput() {
		localAssessment.content.text = localTextContent
		localAssessment = Object.assign({}, localAssessment)
	}

	function handleToggleStudentVisibility() {
		localAssessment.isVisibleToStudent = !localAssessment.isVisibleToStudent
		localAssessment = Object.assign({}, localAssessment)
	}

	function handleSelectAssessmentFormat(assessmentFormatId) {
		localAssessment.assessmentFormat = assessmentFormats.find(af => af.id === assessmentFormatId)
		localAssessment = Object.assign({}, localAssessment)
	}

	function handleToggleTag(event) {
		const tag = event.target.value
		if (localAssessment.assessmentFormat.variant === 'single_tag') {
			if (localAssessment.content.tag === tag) {
				// unset tag
				localAssessment.content.tag = null
			} else {
				// set tag
				localAssessment.content.tag = tag
			}
		} else if (localAssessment.assessmentFormat.variant === 'multiple_tags') {
			if (localAssessment.content.tags.includes(tag)) {
				// remove tag
				localAssessment.content.tags = localAssessment.content.tags.filter(t => t !== tag)
			} else {
				// add tag
				localAssessment.content.tags.push(tag)
			}
		}
		localAssessment = Object.assign({}, localAssessment)
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
		action="?/{localAssessment.id ? 'update' : 'create'}Assessment"
		bind:this={form}
		use:enhance
	>
		<input type="hidden" name="assessment" value={JSON.stringify(localAssessment)} />
		<h2 class="mb-2 text-xl font-bold">
			{student.name} | {assessmentContext.title}
		</h2>
		<p class="mb-4 italic">{assessmentContext.description || ''}</p>

		<div class="mb-4">
			<label for="assessmentFormat" class="text-l mb-2 block font-bold">Format</label>

			<Dropdown.Root>
				<Dropdown.Trigger let:builder asChild>
					<Button
						builders={[builder]}
						variant="ghost"
						class="space-x-1 rounded border border-gray-300 p-2"
					>
						<TeacherIcon class="h-[1.2rem] w-[1.2rem]" />
						<span>{localAssessment.assessmentFormat?.title}</span>
						<ChevronDownIcon class="h-4" />
					</Button>
				</Dropdown.Trigger>

				<Dropdown.Content class="min-w-48">
					<Dropdown.RadioGroup onValueChange={handleSelectAssessmentFormat}>
						{#each assessmentFormats as assessmentFormat}
							<Dropdown.RadioItem class="flex cursor-pointer space-x-2" value={assessmentFormat.id}>
								<span>{assessmentFormat.title}</span>
							</Dropdown.RadioItem>
						{/each}
					</Dropdown.RadioGroup>
				</Dropdown.Content>
			</Dropdown.Root>
		</div>

		<div class="mb-4">
			<!-- Text -->
			{#if localAssessment?.assessmentFormat?.variant === 'text'}
				<label for="content" class="text-l mb-2 block font-bold">Tekst</label>
				<textarea
					class="w-full rounded border border-gray-300 p-2"
					rows="8"
					placeholder="Her skriver du selve vurderingen"
					bind:value={localTextContent}
					on:input={handleContentInput}
				></textarea>

				<!-- Video -->
			{:else if localAssessment?.assessmentFormat?.variant === 'video'}
				<label for="content" class="text-l mb-2 block font-bold">Video</label>
				<input
					type="text"
					class="w-full rounded border border-gray-300 p-2"
					placeholder="Link til video"
				/>

				<!-- Audio -->
			{:else if localAssessment?.assessmentFormat?.variant === 'audio'}
				<label for="content" class="text-l mb-2 block font-bold">Audio</label>
				<input
					type="text"
					class="w-full rounded border border-gray-300 p-2"
					placeholder="Link til lydfil"
				/>

				<!-- Single tag -->
			{:else if localAssessment?.assessmentFormat?.variant === 'single_tag'}
				<label for="content" class="text-l mb-2 block font-bold">
					Velg {localAssessment.assessmentFormat.title.toLowerCase()}
				</label>
				{#each localAssessment.assessmentFormat.tags as tag, index}
					<div class="mb-2 flex items-center">
						<input
							type="radio"
							id={tag}
							name={`tag_${index}`}
							value={tag}
							checked={localAssessment.content.tag === tag}
							on:click={handleToggleTag}
							class="mr-2 h-6 w-6 appearance-none rounded border-2 border-gray-300 checked:border-green-500 checked:bg-green-500"
						/>
						<label for="tag" class="">{tag}</label>
					</div>
				{/each}

				<!-- Multiple tags -->
			{:else if localAssessment?.assessmentFormat?.variant === 'multiple_tags'}
				<label for="content" class="text-l mb-2 block font-bold">
					Velg {localAssessment.assessmentFormat.title.toLowerCase()}
				</label>
				{#each localAssessment.assessmentFormat.tags as tag, index}
					<div class="mb-2 flex items-center">
						<input
							type="checkbox"
							id={tag}
							name={`tag_${index}`}
							value={tag}
							checked={localAssessment.content.tags.includes(tag)}
							on:click={handleToggleTag}
							class="mr-2 h-6 w-6 appearance-none rounded border-2 border-gray-300 checked:border-green-600 checked:bg-green-600"
						/>
						<label for="tag" class="">{tag}</label>
					</div>
				{/each}
			{:else}
				<p class="text-red-500">Ukjent formatvariant</p>
			{/if}
		</div>
		<div class="mb-4">
			<label for="studentVisibility" class="text-l mb-2 block font-bold">Synlig for eleven</label>
			<Toggle
				on:toggle={handleToggleStudentVisibility}
				label=""
				switchColor="#eee"
				toggledColor="#24a148"
				untoggledColor="#fa4d56"
				on="Ja"
				off="Nei"
			/>
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
