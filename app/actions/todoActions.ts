'use server'

import {
	createTodo,
	deleteTodo,
	updateTodo,
} from '@/_backend/lib/api/codegen/mutations'
import { cookieBasedClient } from '@/utils/amplifyServerUtils'
import { redirect } from 'next/navigation'

export async function CreateTodoAction(formdata: FormData) {
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

	redirect('/todos')
}

export async function UpdateTodoAction(formdata: FormData) {
	const id = formdata.get('id') as string
	const title = formdata.get('title') as string
	const description = formdata.get('description') as string
	const isCompleted = formdata.get('isCompleted') as string

	console.log('the formData', formdata)
	const newTodo = await cookieBasedClient.graphql({
		query: updateTodo,
		variables: {
			input: {
				id,
				title,
				description,
				isCompleted: Boolean(isCompleted),
			},
		},
	})
	console.log('the new updated todo', newTodo)
	redirect('/todos')
}

export async function DeleteTodoAction(formdata: FormData) {
	const id = formdata.get('id') as string

	const deletedTodo = await cookieBasedClient.graphql({
		query: deleteTodo,
		variables: {
			id,
		},
	})

	console.log('the deleted todo', deletedTodo)
	redirect('/todos')
}
