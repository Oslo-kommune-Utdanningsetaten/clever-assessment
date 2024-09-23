<script>
	import { cn } from '$lib/utils'
	import { ClipboardPen as Logo } from 'lucide-svelte'

	let className
	export { className as class }
</script>

<Logo class={cn('text-primary', className)} {...$$restProps} />
