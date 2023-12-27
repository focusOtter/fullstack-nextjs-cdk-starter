import { getTodo } from '@/_backend/lib/api/codegen/queries'
import { DeleteTodoAction, UpdateTodoAction } from '@/app/actions/todoActions'
import { cookieBasedClient } from '@/utils/amplifyServerUtils'
import { redirect } from 'next/navigation'

type EditTodoPageProps = {
	searchParams: {
		id?: string
	}
}
async function EditTodoPage({ searchParams }: EditTodoPageProps) {
	if (searchParams.id) {
		try {
			const todoRes = await cookieBasedClient.graphql({
				query: getTodo,
				variables: { id: searchParams.id },
			})
			console.log(todoRes)
			const todo = todoRes.data.getTodo
			return (
				<div className="flex flex-col justify-center items-center">
					<h1>Edit Your Todo</h1>
					<form action={DeleteTodoAction}>
						<input type="hidden" name={'id'} value={todo.id} />
						<button type="submit" className="btn btn-error">
							Delete Todo
						</button>
					</form>

					<form action={UpdateTodoAction} className="flex flex-col gap-2">
						<input type="hidden" name="id" value={todo.id} />
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Title</span>
							</div>
							<input
								defaultValue={todo.title}
								name="title"
								type="text"
								placeholder="My favorite todo"
								className="input input-bordered w-full max-w-xs"
							/>
						</label>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Description</span>
							</div>
							<input
								name="description"
								defaultValue={todo.description}
								type="text"
								placeholder="An amazing description"
								className="input input-bordered w-full max-w-xs"
							/>
						</label>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Is this completed?</span>
							</div>
							<select
								defaultValue={todo.isCompleted.toString()}
								name="isCompleted"
								className="select w-full max-w-xs"
							>
								<option value="true">True</option>
								<option value="false">False</option>
							</select>
						</label>
						<button className="btn btn-primary w-full max-w-xs" type="submit">
							Submit
						</button>
					</form>
				</div>
			)
		} catch (e) {
			console.log(e)
			redirect('/todos/new')
		}
	} else redirect('/todos/new')
}

export default EditTodoPage
