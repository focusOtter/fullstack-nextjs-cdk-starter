'use client'

import { useRouter } from 'next/navigation'

type TodoListProps = {
	index: number
	id: string
	title: string
	description: string
	createdAt: string
	isCompleted: string
}
export const TodoList = (props: TodoListProps) => {
	const router = useRouter()
	return (
		<tr
			className="hover cursor-pointer"
			onClick={() => {
				router.push(`/todos/edit?id=${props.id}`)
			}}
		>
			<th>{props.index}</th>
			<td>{props.title}</td>
			<td>{props.description}</td>
			<td>{props.isCompleted}</td>
			<td>{props.createdAt}</td>
		</tr>
	)
}
