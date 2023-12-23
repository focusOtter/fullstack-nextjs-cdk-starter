import cdkoutput from './_backend/output.json'

const output = cdkoutput['fullstack-nextjs-cdk-starter-dev-Stack']

export const awsconfig = {
	Auth: {
		Cognito: {
			userPoolId: process.env.userPoolId || output.UserPoolId,
			userPoolClientId: process.env.userPoolClientId || output.UserPoolClientId,
			identityPoolId: process.env.identityPoolId || output.IdentityPoolId,
		},
	},
	API: {
		GraphQL: {
			endpoint: process.env.apiUrl || output.GraphQLAPIURL,
			region: process.env.region || output.Region,
		},
	},
}
