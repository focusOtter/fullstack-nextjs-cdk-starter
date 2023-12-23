import { AppSyncIdentityCognito, Context, util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { UpdateTodoInput } from '../codegen/API'

export function request(ctx: Context<UpdateTodoInput>) {
	const id = ctx.args.id
	const owner = (ctx.identity as AppSyncIdentityCognito).username
	const now = util.time.nowISO8601()

	// update it if owner.
	return ddb.update({
		key: { id },
		update: { ...ctx.args, updatedAt: now },
		condition: { owner: { eq: owner } },
	})
}

export function response(ctx: Context) {
	return ctx.result
}
