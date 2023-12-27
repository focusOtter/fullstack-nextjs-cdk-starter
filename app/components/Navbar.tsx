import { cookies } from 'next/headers'
import { getCurrentUser } from '@aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils'
import { SignOutButton } from './SignOutButton'
import Link from 'next/link'

// This page always dynamically renders per request
export const dynamic = 'force-dynamic'
async function Navbar() {
	let hasUser = false
	try {
		await runWithAmplifyServerContext({
			nextServerContext: { cookies },
			operation: (contextSpec) => getCurrentUser(contextSpec),
		})
		hasUser = true
	} catch (error) {
		console.log(error)
		hasUser = false
	}

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link href="/" className="btn btn-ghost text-xl">
					Focus Otter
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link href="/todos">My Todos</Link>
					</li>
					<li>
						<SignOutButton hasUser={hasUser} />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
