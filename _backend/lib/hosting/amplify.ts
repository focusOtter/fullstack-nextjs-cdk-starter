import { Duration, SecretValue } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as amplify from '@aws-cdk/aws-amplify-alpha'
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild'
import {
	Effect,
	PolicyDocument,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam'

type AmplifyHostingProps = {
	appName: string
	account: string
	branch: string
	ghOwner: string
	repo: string
	ghTokenName: string
	environmentVariables?: { [key: string]: string }
}

export function createAmplifyHosting(
	scope: Construct,
	props: AmplifyHostingProps
) {
	const amplifyDeployCDKRole = new Role(
		scope,
		`${props.appName}-allow-amplify-deploy-cdk-role`,
		{
			assumedBy: new ServicePrincipal('amplify.amazonaws.com'),
			description: `Role assumed by Amplify Hosting for deploying aws cdk`,
			roleName: `${props.appName}-amplify-deploy-from-cdk`,
			maxSessionDuration: Duration.hours(1),
			inlinePolicies: {
				CdkDeploymentPolicy: new PolicyDocument({
					assignSids: true,
					statements: [
						new PolicyStatement({
							effect: Effect.ALLOW,
							actions: ['sts:AssumeRole'],
							resources: [`arn:aws:iam::${props.account}:role/cdk-*`],
						}),
						new PolicyStatement({
							effect: Effect.ALLOW,
							actions: ['appsync:GetIntrospectionSchema'],
							resources: [`*`],
						}),
					],
				}),
			},
		}
	)

	const amplifyApp = new amplify.App(scope, `${props.appName}-hosting`, {
		appName: `${props.appName}`,
		role: amplifyDeployCDKRole,
		sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
			owner: props.ghOwner,
			repository: props.repo,
			oauthToken: SecretValue.secretsManager(props.ghTokenName),
		}),
		platform: amplify.Platform.WEB_COMPUTE,
		autoBranchDeletion: true,
		environmentVariables: {
			_CUSTOM_IMAGE: 'amplify:al2023', // Amplify build image to support NextJS 14
			...props.environmentVariables,
		},
		buildSpec: BuildSpec.fromObjectToYaml({
			version: 1,
			frontend: {
				phases: {
					preBuild: {
						commands: [
							'cd _backend', //the buildspec file gets ran from the root of our project
							'npm ci', //install the cdk deps
							'npm run codegen', //see package.json
							'npm run build:resolvers', //see package.json
							'npx aws-cdk deploy --require-approval never --outputs-file ../output.json', // deploy cdk (see package.json)
							'cd ..', // go back to the root of the project
							'npm ci', // install the frontend deps,
						],
					},
					build: {
						commands: ['npm run build'],
					},
				},
				artifacts: {
					baseDirectory: '.next',
					files: ['**/*'],
				},
				cache: {
					paths: ['node_modules/**/*'],
				},
			},
		}),
	})

	amplifyApp.addBranch(props.branch, {
		stage: props.branch === 'main' ? 'PRODUCTION' : 'DEVELOPMENT',
		branchName: props.branch,
	})

	return amplifyApp
}
