import { listTodos } from '@/_backend/lib/api/codegen/queries'
import { cookieBasedClient } from '@/utils/amplifyServerUtils'

// List all the todos for a user. Only authenticated users can view this page
async function TodosPage() {
	const fetchedTodos = await cookieBasedClient.graphql({
		query: listTodos,
	})

	const mySortedTodos = fetchedTodos.data.listTodos.todos.toSorted(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	)

	console.log(fetchedTodos.data.listTodos.todos)
	console.log(mySortedTodos)

	return (
		<main>
			<h1 className="text-2xl">My Todos</h1>
			<a href="/todos/new" className="btn btn-secondary">
				Add Todo
			</a>
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
							<tr className="hover" key={todo?.id}>
								<th>{index + 1}</th>
								<td>{todo.title}</td>
								<td>{todo.description}</td>
								<td>{String(todo.isCompleted)}</td>
								<td>{formattedDate}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</main>
	)
}

export default TodosPage
