import React from 'react'
import { cookies } from 'next/headers'
import { getCurrentUser } from '@aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils'
import { SignOutButton } from './SignOutButton'

// This page always dynamically renders per request
export const dynamic = 'force-dynamic'

async function Navbar() {
	let hasUser
	try {
		const currentUser = await runWithAmplifyServerContext({
			nextServerContext: { cookies },
			operation: (contextSpec) => getCurrentUser(contextSpec),
		})
		hasUser = true
	} catch (error) {
		console.error(error)
		hasUser = false
	}

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl">Focus Otter</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a href="/todos">My Todos</a>
					</li>
					<li>
						<SignOutButton />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
