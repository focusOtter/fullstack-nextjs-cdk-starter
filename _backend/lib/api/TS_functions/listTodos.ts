import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ListTodosQueryVariables } from '../codegen/API'

// list only your todos
export function request(ctx: Context<ListTodosQueryVariables>) {
	const { sub } = ctx.identity as AppSyncIdentityCognito
	return ddb.query({
		query: { __typename: { eq: 'Todo' }, owner: { eq: sub } },
		index: 'todosByOwner',
		limit: ctx.args.limit,
		nextToken: ctx.args.nextToken,
	})
}

export function response(ctx: Context) {
	const { items: posts = [], nextToken } = ctx.result
	return { posts, nextToken }
}
