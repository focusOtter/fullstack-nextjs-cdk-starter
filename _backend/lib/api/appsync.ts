import { Construct } from 'constructs'
import * as path from 'path'
import {
	AuthorizationType,
	Definition,
	GraphqlApi,
	FieldLogLevel,
	FunctionRuntime,
	Code,
} from 'aws-cdk-lib/aws-appsync'
import { IRole } from 'aws-cdk-lib/aws-iam'
import { UserPool } from 'aws-cdk-lib/aws-cognito'
import { Table } from 'aws-cdk-lib/aws-dynamodb'

type AppSyncAPIProps = {
	appName: string
	userPool: UserPool
	authRole: IRole
	unauthRole: IRole
	identityPoolId: string
	todoTable: Table
}

export const createAppSyncAPI = (scope: Construct, props: AppSyncAPIProps) => {
	const api = new GraphqlApi(scope, `${props.appName}`, {
		name: props.appName,
		definition: Definition.fromFile(path.join(__dirname, 'schema.graphql')),
		authorizationConfig: {
			defaultAuthorization: {
				authorizationType: AuthorizationType.USER_POOL,
				userPoolConfig: {
					userPool: props.userPool,
				},
			},
			additionalAuthorizationModes: [
				{
					authorizationType: AuthorizationType.IAM,
				},
			],
		},
		logConfig: {
			fieldLogLevel: FieldLogLevel.ALL,
		},
	})

	// Add the Datasource that my resolvers will make use of
	const todosDS = api.addDynamoDbDataSource('TodoDS', props.todoTable)

	// Add the resolvers that will make use of the datasource
	api.createResolver('getTodoResolver', {
		typeName: 'Query',
		fieldName: 'getTodo',
		dataSource: todosDS,
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_functions/getTodo.js')),
	})

	api.createResolver('listTodosResolver', {
		typeName: 'Query',
		fieldName: 'listTodos',
		dataSource: todosDS,
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_functions/listTodos.js')),
	})

	api.createResolver('createTodoResolver', {
		typeName: 'Mutation',
		fieldName: 'createTodo',
		dataSource: todosDS,
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_functions/createTodo.js')),
	})

	api.createResolver('updateTodoResolver', {
		typeName: 'Mutation',
		fieldName: 'updateTodo',
		dataSource: todosDS,
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_functions/updateTodo.js')),
	})

	api.createResolver('deleteTodoResolver', {
		typeName: 'Mutation',
		fieldName: 'deleteTodo',
		dataSource: todosDS,
		runtime: FunctionRuntime.JS_1_0_0,
		code: Code.fromAsset(path.join(__dirname, 'JS_functions/deleteTodo.js')),
	})

	return api
}
