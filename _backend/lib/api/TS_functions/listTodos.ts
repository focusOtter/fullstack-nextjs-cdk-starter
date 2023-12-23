import { Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ListTodosQueryVariables } from '../codegen/API'

export function request(ctx: Context<ListTodosQueryVariables>) {
	const { limit = 20, nextToken } = ctx.arguments

	return ddb.scan({ limit, nextToken })
}

export function response(ctx: Context) {
	const { items: posts = [], nextToken } = ctx.result
	return { posts, nextToken }
}
