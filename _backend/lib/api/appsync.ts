import { Construct } from 'constructs'
import {
	AmplifyGraphqlApi,
	AmplifyGraphqlDefinition,
} from '@aws-amplify/graphql-api-construct'
import * as path from 'path'
import {
	AuthorizationType,
	Code,
	FunctionRuntime,
} from 'aws-cdk-lib/aws-appsync'
import { IRole, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { UserPool } from 'aws-cdk-lib/aws-cognito'

type AmplifyGraphQLAPIProps = {
	appName: string
	userPool: UserPool
	authRole: IRole
	unauthRole: IRole
	identityPoolId: string
}

export const createAmplifyGraphQLAPI = (
	scope: Construct,
	props: AmplifyGraphQLAPIProps
) => {
	const api = new AmplifyGraphqlApi(scope, `${props.appName}`, {
		definition: AmplifyGraphqlDefinition.fromFiles(
			path.join(__dirname, 'schema.graphql')
		),
		authorizationModes: {
			defaultAuthorizationMode: AuthorizationType.USER_POOL,
			userPoolConfig: {
				userPool: props.userPool,
			},
			iamConfig: {
				authenticatedUserRole: props.authRole,
				unauthenticatedUserRole: props.unauthRole,
				identityPoolId: props.identityPoolId,
			},
		},
	})

	// add bedrock as a datasource
	const bedrockDataSource = api.addHttpDataSource(
		'bedrockDS',
		'https://bedrock-runtime.us-east-1.amazonaws.com',
		{
			authorizationConfig: {
				signingRegion: 'us-east-1',
				signingServiceName: 'bedrock',
			},
		}
	)

	// Allow datasource to invoke claude
	bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
		new PolicyStatement({
			resources: [
				'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-v2',
			],
			actions: ['bedrock:InvokeModel'],
		})
	)

	// create a unit resolver that connects to bedrock and returns a string of words
	const generateWordSearchWordsResolver = api.addResolver(
		'generateWordSearchWordsResolver',
		{
			dataSource: bedrockDataSource,
			typeName: 'Mutation',
			fieldName: 'generateWordSearchWords',
			code: Code.fromAsset(
				path.join(__dirname, 'JS_functions/generateWordSearchWords.js')
			),
			runtime: FunctionRuntime.JS_1_0_0,
		}
	)

	return api
}
