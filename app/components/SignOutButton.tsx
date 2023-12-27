'use client'

import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SignOutButtonProps = {
	hasUser: boolean
}
export const SignOutButton = ({ hasUser }: SignOutButtonProps) => {
	const [loggedInStatus, setLoggedInStatus] = useState(hasUser)
	const router = useRouter()
	return (
		loggedInStatus && (
			<button
				onClick={() => {
					signOut()
						.then(() => setLoggedInStatus(false))
						.then(() => router.push('/'))
				}}
			>
				Sign Out
			</button>
		)
	)
}
