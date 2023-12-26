'use client'

import { signOut } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
	const router = useRouter()
	return (
		<button
			onClick={() => {
				signOut().then(() => router.push('/'))
			}}
		>
			Sign Out
		</button>
	)
}
