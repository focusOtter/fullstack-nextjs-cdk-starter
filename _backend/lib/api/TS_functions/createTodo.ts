import {
	AppSyncIdentityCognito,
	Context,
	Identity,
	util,
} from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { CreateTodoInput } from '../codegen/API'

export function request(ctx: Context<CreateTodoInput>) {
	const id = util.autoId()
	const identity = ctx.identity as AppSyncIdentityCognito
	const now = util.time.nowISO8601()

	const item = {
		id,
		owner: identity.username,
		createdAt: now,
		updatedAt: now,
		...ctx.args,
	}

	// only signed in users can use this route based on schema.
	// create a new todo.
	return ddb.put({
		key: { id },
		item,
	})
}

export function response(ctx: Context) {
	return ctx.result
}
