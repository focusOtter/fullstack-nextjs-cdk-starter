import { Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { GetTodosQueryVariables } from '../codegen/API'

export function request(ctx: Context<GetTodosQueryVariables>) {
	// get a todo by its id if it's the owner
	ddb.get({ key: { id: ctx.args.id } })
}

export function response(ctx: Context) {
	return ctx.result
}
