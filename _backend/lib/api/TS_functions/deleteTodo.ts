import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { DeleteTodoMutationVariables } from '../codegen/API'

export function request(ctx: Context<DeleteTodoMutationVariables>) {
	// delete a todo by its id if it's the owner
	const { username } = ctx.identity as AppSyncIdentityCognito
	return ddb.remove({
		key: { id: ctx.args.id },
		condition: { owner: { eq: username } },
	})
}

export function response(ctx: Context) {
	return ctx.result
}
