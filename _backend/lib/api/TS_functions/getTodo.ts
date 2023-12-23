import { Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { GetTodoQueryVariables } from '../codegen/API'

export function request(ctx: Context<GetTodoQueryVariables>) {
	// get a todo by its id if it's the owner
	ddb.get({ key: { id: ctx.args.id } })
}

export function response(ctx: Context) {
	return ctx.result
}
