import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { GetTodoQuery, GetTodoQueryVariables, Todo } from '../codegen/API'

export function request(ctx: Context<GetTodoQueryVariables>) {
	// get a todo by its id if it's the owner
	return ddb.get({ key: { id: ctx.args.id } })
}

export function response(ctx: Context) {
	//if the owner field isn't the same as the identity, the throw
	const identity = ctx.identity as AppSyncIdentityCognito
	if (ctx.result.owner !== identity.username) {
		util.unauthorized()
	}

	return ctx.result as Todo
}
