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

<div class="container relative my-10 max-w-[1024px]">
	<h2 class="mb-6 font-bold sm:text-2xl md:text-3xl">
		{assessments[0].student.name} | {assessmentContext.title}
	</h2>

	<div class="border">
		{#each assessments as assessment}
			<div class="border bg-slate-100 p-2">
				<div class="text-l flex items-center font-bold">
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
				</div>
				<div class="text-sm">
					<p class="italic">
						Opprettet {formatRelative(assessment.createdAt, new Date(), { locale: nbLocale })} av {assessment
							.teacher.name}
					</p>
				</div>
			</div>
			<!-- Text -->
			{#if assessment?.assessmentFormat?.variant === 'text'}
				<p class="m-0 w-full border p-2">{assessment.content.text}</p>

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
		{/each}
	</div>
</div>
