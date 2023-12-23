#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import * as gitBranch from 'git-branch'
import { BackendStack } from '../lib/backend-stack'
import { CDKContext } from '../cdk.context'

const app = new cdk.App()

// AWS_BRANCH is an Amplify Hosting envVar that is automatically set in that context
const currentBranch = process.env.AWS_BRANCH || gitBranch.sync()
const globals = app.node.tryGetContext('globals') || {}
const branchConfig = app.node.tryGetContext(currentBranch)
if (!branchConfig) {
	throw new Error(`No configuration found for branch: ${currentBranch}`)
}

// Combine the globals and branch-specific configuration
const context: CDKContext & cdk.StackProps = {
	branch: currentBranch,
	...globals,
	...branchConfig,
}

const appName = `${context.appName}-${context.stage}`
const stackName = `${appName}-Stack`

new BackendStack(
	app,
	stackName,
	{
		stackName,
		env: context.env,
	},
	context
)
