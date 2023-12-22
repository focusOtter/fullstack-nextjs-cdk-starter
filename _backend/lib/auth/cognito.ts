import { Construct } from 'constructs'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import {
	IdentityPool,
	UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha'

type CreateAuthProps = {
	appName: string
}

export function createAuth(scope: Construct, props: CreateAuthProps) {
	const userPool = new awsCognito.UserPool(scope, `${props.appName}-userpool`, {
		userPoolName: `${props.appName}-userpool`,
		selfSignUpEnabled: true,
		accountRecovery: awsCognito.AccountRecovery.PHONE_AND_EMAIL,
		userVerification: {
			emailStyle: awsCognito.VerificationEmailStyle.CODE,
		},
		autoVerify: {
			email: true,
		},
		standardAttributes: {
			email: {
				required: true,
				mutable: true,
			},
		},
	})

	const userPoolClient = new awsCognito.UserPoolClient(
		scope,
		`${props.appName}-userpoolClient`,
		{ userPool }
	)

	const identityPool = new IdentityPool(
		scope,
		`${props.appName}-identityPool`,
		{
			identityPoolName: `${props.appName}-identityPool`,
			allowUnauthenticatedIdentities: true,
			authenticationProviders: {
				userPools: [
					new UserPoolAuthenticationProvider({
						userPool: userPool,
						userPoolClient: userPoolClient,
					}),
				],
			},
		}
	)

	return { userPool, userPoolClient, identityPool }
}
