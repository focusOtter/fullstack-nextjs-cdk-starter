'use client'

import { config } from '@/awsconfig'
import { Amplify } from 'aws-amplify'

Amplify.configure(config, { ssr: true })

export default function ConfigureAmplifyClientSide() {
	return null
}
