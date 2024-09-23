<script>
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { invalidate } from '$app/navigation'
	import { Toaster } from 'svelte-sonner'
	import { MetaTags } from 'svelte-meta-tags'
	import { ModeWatcher } from 'mode-watcher'
	import '../app.pcss'

	export let data
	let { supabase, session } = data

	$: {
		;({ supabase, session } = data)
	}

	$: metaTags = Object.assign({}, data.baseMetaTags, $page.data.pageMetaTags)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => data.subscription.unsubscribe()
	})
</script>

<Toaster position="top-center" />
<MetaTags {...metaTags} />
<ModeWatcher defaultMode="system" />

<div class="min-h-dvh w-full bg-background text-foreground">
	<slot />
</div>
