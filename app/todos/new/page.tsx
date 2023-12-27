import { CreateTodoAction } from '@/app/actions/todoActions'
import React from 'react'

//Any signed in user can create a todo.
function NewTodoPage() {
	return (
		<div>
			<h1 className="text-2xl">New todo Page</h1>
			<form
				action={CreateTodoAction}
				className="flex flex-col gap-2 justify-center items-center"
			>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className="label-text">Title</span>
					</div>
					<input
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
						defaultValue={'false'}
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
}

export default NewTodoPage
