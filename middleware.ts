import { fetchAuthSession } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils'

export async function middleware(request: NextRequest) {
	const response = NextResponse.next()

	const authenticated = await runWithAmplifyServerContext({
		nextServerContext: { request, response },
		operation: async (contextSpec) => {
			try {
				const session = await fetchAuthSession(contextSpec)
				return session.tokens !== undefined
			} catch (error) {
				console.log('user not authenticated')
				return false
			}
		},
	})

	if (authenticated) {
		return response
	}

	return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/todos',
	],
}
