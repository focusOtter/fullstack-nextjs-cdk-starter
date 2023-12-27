import { RemovalPolicy } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

type todoTableProps = {
	appName: string
}
export const createTodoTable = (scope: Construct, props: todoTableProps) => {
	const tableName = `${props.appName}TodoTable`
	const table = new Table(scope, tableName, {
		partitionKey: { name: 'id', type: AttributeType.STRING },
		tableName,
		removalPolicy: RemovalPolicy.DESTROY,
		billingMode: BillingMode.PAY_PER_REQUEST,
	})

	table.addGlobalSecondaryIndex({
		indexName: 'todosByOwner',
		partitionKey: { name: '__typename', type: AttributeType.STRING },
		sortKey: { name: 'owner', type: AttributeType.STRING },
	})

	return table
}
