import { createServerRunner } from '@aws-amplify/adapter-nextjs'
import { config } from '@/awsconfig'

export const { runWithAmplifyServerContext } = createServerRunner({
	config,
})
