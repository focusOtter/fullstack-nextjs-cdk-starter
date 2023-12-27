import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ListTodosQueryVariables, PaginatedTodos } from '../codegen/API'

// list only your todos
export function request(ctx: Context<ListTodosQueryVariables>) {
	const { username } = ctx.identity as AppSyncIdentityCognito
	return ddb.query({
		query: { __typename: { eq: 'Todo' }, owner: { eq: username } },
		index: 'todosByOwner',
		limit: ctx.args.limit,
		nextToken: ctx.args.nextToken,
	})
}

export function response(ctx: Context) {
	const { items: todos = [], nextToken } = ctx.result
	return { todos, nextToken } as PaginatedTodos
}
