import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createAuth } from './auth/cognito'
import { createAppSyncAPI } from './api/appsync'
import { createTodoTable } from './tables/dynamodb'
import { CDKContext } from '../cdk.context'
import { createAmplifyHosting } from './hosting/amplify'

export class BackendStack extends cdk.Stack {
	constructor(
		scope: Construct,
		id: string,
		props: cdk.StackProps,
		context: CDKContext
	) {
		super(scope, id, props)

		const appNameWithStage = `${context.appName}-${context.stage}`

		const auth = createAuth(this, { appName: appNameWithStage })

		const todoTable = createTodoTable(this, { appName: appNameWithStage })

		const api = createAppSyncAPI(this, {
			appName: appNameWithStage,
			userPool: auth.userPool,
			authRole: auth.identityPool.authenticatedRole,
			unauthRole: auth.identityPool.unauthenticatedRole,
			identityPoolId: auth.identityPool.identityPoolId,
			todoTable,
		})

		console.log(JSON.stringify(context, null, 2))
		const amplifyHosting = createAmplifyHosting(this, {
			appName: appNameWithStage,
			account: context.env.account,
			branch: context.branch,
			ghOwner: context.hosting.ghOwner,
			ghTokenName: context.hosting.ghTokenName,
			repo: context.hosting.repo,
			environmentVariables: {
				userPoolId: auth.userPool.userPoolId,
				userPoolClientId: auth.userPoolClient.userPoolClientId,
				identityPoolId: auth.identityPool.identityPoolId,
				region: this.region,
				apiUrl: api.graphqlUrl,
			},
		})

		new cdk.CfnOutput(this, 'GraphQLAPIURL', {
			value: api.graphqlUrl,
		})
		new cdk.CfnOutput(this, 'GraphQLAPIID', {
			value: api.apiId,
		})
		new cdk.CfnOutput(this, 'UserPoolId', {
			value: auth.userPool.userPoolId,
		})
		new cdk.CfnOutput(this, 'UserPoolClientId', {
			value: auth.userPoolClient.userPoolClientId,
		})
		new cdk.CfnOutput(this, 'IdentityPoolId', {
			value: auth.identityPool.identityPoolId,
		})

		new cdk.CfnOutput(this, 'Region', {
			value: this.region,
		})

		new cdk.CfnOutput(this, 'AmplifyAppId', {
			value: amplifyHosting.appId,
		})
	}
}
