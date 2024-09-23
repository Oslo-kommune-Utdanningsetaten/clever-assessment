import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export const load = async (event) => {
	const { fetch, data, depends, url } = event

	depends('supabase:auth')

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session)
				}

				const cookie = parse(document.cookie)
				return cookie[key]
			}
		}
	})

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession()

	const baseMetaTags = Object.freeze({
		title: 'VV2',
		titleTemplate: '',
		description: 'Vurderinger trenger ikke å være vonde greier',
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'no_NB',
			title: 'VV2',
			description: 'Vurderinger trenger ikke å være vonde greier',
			siteName: 'VV2',
			// images: [
			// 	{
			// 		url: 'image-url',
			// 		alt: 'VV2',
			// 		width: 1200,
			// 		height: 630,
			// 		type: 'image/png'
			// 	}
			// ]
		}
	})

	return { supabase, session, baseMetaTags }
}
