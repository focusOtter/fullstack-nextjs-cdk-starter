'use server'

import { createTodo } from '@/_backend/lib/api/codegen/mutations'
import { cookieBasedClient } from '@/utils/amplifyServerUtils'
import { redirect } from 'next/navigation'

export async function CreateTodoAction(formdata: FormData) {
	console.log('the form data', formdata)
	const title = formdata.get('title') as string
	const description = formdata.get('description') as string
	const isCompleted = formdata.get('isCompleted') as string

	const newTodo = await cookieBasedClient.graphql({
		query: createTodo,
		variables: {
			input: {
				title,
				description,
				isCompleted: Boolean(isCompleted),
			},
		},
	})

	console.log('the new todo i crated', newTodo)
	redirect('/todos')
}
