import { AppSyncIdentityCognito, Context, util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { Todo, UpdateTodoMutationVariables } from '../codegen/API'

export function request(ctx: Context<UpdateTodoMutationVariables>) {
	const id = ctx.args.input.id
	const owner = (ctx.identity as AppSyncIdentityCognito).username
	const now = util.time.nowISO8601()

	// update it if owner.
	const updateObj: ddb.DynamoDBUpdateObject<Todo> = {
		title: ddb.operations.replace(ctx.args.input.title),
		description: ddb.operations.replace(ctx.args.input.description),
		isCompleted: ddb.operations.replace(ctx.args.input.isCompleted),
		updatedAt: ddb.operations.replace(now),
	}

	return ddb.update({
		key: { id },
		update: updateObj,
		condition: { owner: { eq: owner } },
	})
}

export function response(ctx: Context) {
	return ctx.result as Todo
}
