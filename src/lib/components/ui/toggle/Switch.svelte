<script>
	export let id = ''
	export let text = ''
	export let checked = false
	export let disabled = false
</script>

<label for={id}>
	<div class="switch">
		<input {id} name={id} type="checkbox" class="sr-only" {disabled} bind:checked />
		<div class="track"></div>
		<div class="thumb"></div>
	</div>
	<span class="ml-2 cursor-pointer">{text}</span>
</label>

<!-- Switch.svelte -->

<style>
	.switch {
		@apply relative inline-block cursor-pointer select-none bg-transparent align-middle;
	}

	.track {
		@apply h-6 w-12 rounded-full bg-gray-600 shadow-inner;
	}

	.thumb {
		@apply absolute left-0 top-0 h-6 w-6 rounded-full border-2 border-gray-600 bg-white transition-all duration-300 ease-in-out;
	}

	input[type='checkbox']:checked ~ .thumb {
		@apply translate-x-full transform border-green-500;
	}

	input[type='checkbox']:checked ~ .track {
		@apply transform bg-green-500 transition-colors;
	}

	input[type='checkbox']:disabled ~ .track {
		@apply bg-gray-500;
	}

	input[type='checkbox']:disabled ~ .thumb {
		@apply border-gray-500 bg-gray-100;
	}

	input[type='checkbox']:focus + .track,
	input[type='checkbox']:active + .track {
		@apply shadow-lg;
	}
</style>
