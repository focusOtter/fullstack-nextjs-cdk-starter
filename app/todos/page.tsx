import { listTodos } from '@/_backend/lib/api/codegen/queries'
import { cookieBasedClient } from '@/utils/amplifyServerUtils'
import { TodoList } from '../components/TodoList'
import Link from 'next/link'

// List all the todos for a user. Only authenticated users can view this page
async function fetchTodos() {
	const todos = await cookieBasedClient.graphql({
		query: listTodos,
	})

	return todos
}

async function TodosPage() {
	const fetchedTodos = await fetchTodos()

	const mySortedTodos = [...fetchedTodos.data.listTodos.todos].sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	)

	return (
		<main>
			<h1 className="text-2xl text-center">My Todos</h1>
			<div className="flex justify-end mr-6">
				<Link href="/todos/new" className="btn btn-secondary ">
					Add Todo
				</Link>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th>Title</th>
						<th>Description</th>
						<th>Completed</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{mySortedTodos.map((todo, index) => {
						const todoDate = new Date(todo.createdAt)
						const formattedDate = new Intl.DateTimeFormat('en-US').format(
							todoDate
						)

						return (
							<TodoList
								key={todo.id}
								id={todo.id}
								title={todo.title}
								description={todo.description}
								createdAt={formattedDate}
								isCompleted={String(todo.isCompleted)}
								index={index + 1}
							/>
						)
					})}
				</tbody>
			</table>
		</main>
	)
}

export default TodosPage
