<script>
	import { selectedTestUser } from '$lib/stores/userStore.js'
	import { formatRelative } from 'date-fns'
	import { nb as nbLocale } from 'date-fns/locale'
	import EyeOpenIcon from 'lucide-svelte/icons/eye'
	import EyeClosedIcon from 'lucide-svelte/icons/eye-off'

	export let data
	let teacher = $selectedTestUser
	let { assessments } = data
	let assessmentContext

	$: {
		;({ assessments } = data)
		teacher = $selectedTestUser
		assessmentContext = assessments[0].assessmentContext
	}
</script>

<div class="container relative my-10 max-w-[1024px] space-y-10">
	<h2 class="font-bold sm:text-2xl md:text-3xl">
		{assessments[0].student.name} | {assessmentContext.title}
	</h2>

	{#each assessments as assessment}
		<div
			class="mb-2"
			title={formatRelative(assessment.createdAt, new Date(), { locale: nbLocale })}
		>
			<label
				for="content"
				class="text-l mb-0 flex items-center border-b-0 bg-slate-100 p-2 font-bold"
			>
				<span class="mr-3">
					{assessment.assessmentFormat.title}
				</span>
				<span>
					{#if assessment.isVisibleToStudent}
						<EyeOpenIcon class="h-4 w-4" />
					{:else}
						<EyeClosedIcon class="h-4 w-4" />
					{/if}
				</span>
			</label>
			<!-- Text -->
			{#if assessment?.assessmentFormat?.variant === 'text'}
				<p class="w-full border p-2">{assessment.content.text}</p>

				<!-- Video -->
			{:else if assessment?.assessmentFormat?.variant === 'video'}
				<div><a href={assessment.content.video}>Link til videoen</a></div>

				<!-- Audio -->
			{:else if assessment?.assessmentFormat?.variant === 'audio'}
				<div><a href={assessment.content.audio}>Link til lydfila</a></div>

				<!-- Single tag -->
			{:else if assessment?.assessmentFormat?.variant === 'single_tag'}
				<p class="w-full border p-2">{assessment.content.tag}</p>

				<!-- Multiple tags -->
			{:else if assessment?.assessmentFormat?.variant === 'multiple_tags'}
				<p class="w-full border p-2">
					{assessment.content.tags.join(', ')}
				</p>
			{/if}
		</div>
	{/each}
</div>
