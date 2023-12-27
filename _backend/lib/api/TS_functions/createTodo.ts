import { AppSyncIdentityCognito, Context, util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { CreateTodoMutationVariables, Todo } from '../codegen/API'

export function request(ctx: Context<CreateTodoMutationVariables>) {
	const id = util.autoId()
	const identity = ctx.identity as AppSyncIdentityCognito
	const now = util.time.nowISO8601()

	const item = {
		__typename: 'Todo',
		id,
		owner: identity.username,
		createdAt: now,
		updatedAt: now,
		...ctx.args.input,
	}

	// only signed in users can use this route based on schema.
	// create a new todo.
	return ddb.put({
		key: { id },
		item,
	})
}

export function response(ctx: Context) {
	return ctx.result as Todo
}
