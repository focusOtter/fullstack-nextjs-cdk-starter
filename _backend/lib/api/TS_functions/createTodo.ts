import {
	AppSyncIdentityCognito,
	Context,
	Identity,
	util,
} from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx: Context) {
	const id = util.autoId()
	const owner = (ctx.identity as AppSyncIdentityCognito).username
	const now = util.time.nowISO8601()

	const item = {
		id,
		owner,
		createdAt: now,
		updatedAt: now,
		...ctx.args,
	}

	//  create a new todo. If already exists, updates it.
	ddb.put({ key: { id }, item })
}

export function response(ctx: Context) {
	return ctx.result
}
