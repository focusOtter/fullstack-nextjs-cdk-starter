import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createAuth } from './auth/cognito'
import { createAmplifyGraphQLAPI } from './api/appsync'

export interface BackendStackProps extends cdk.StackProps {
	appName: string
}
export class BackendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: BackendStackProps) {
		super(scope, id, props)

		const auth = createAuth(this, { appName: props.appName })
		const api = createAmplifyGraphQLAPI(this, {
			appName: props.appName,
			userPool: auth.userPool,
			authRole: auth.identityPool.authenticatedRole,
			unauthRole: auth.identityPool.unauthenticatedRole,
			identityPoolId: auth.identityPool.identityPoolId,
		})
	}
}
