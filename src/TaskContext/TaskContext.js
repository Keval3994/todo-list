import React, { useReducer } from 'react'

const initialState = {
	user: {
		userId: 1,
		userName: 'Keval'
	},
	tasks: [{
		"userId": 1,
		"id": 1,
		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		"status": false,
		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	},
	{
		"userId": 1,
		"id": 2,
		"title": "qui est esse",
		"status": false,
		"body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
	},
	{
		"userId": 1,
		"id": 3,
		"status": false,
		"title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
		"body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
	},
	{
		"userId": 1,
		"id": 4,
		"title": "eum et est occaecati",
		"status": true,
		"body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
	}]
}

export const TaskContext = React.createContext({});

const TaskReducer = (state, { type, payload = {} }) => {
	switch (type) {
		case 'SET_COMPLETED':
			{
				const newState = {
					...state
				};
				const { id } = payload;
				const selectedItem = newState.tasks.find(i => i.id === id) || {}
				selectedItem.status = !selectedItem.status;

				const { tasks } = newState;
				const newTasks = tasks.filter(i => i.id !== id);
				newTasks.push(selectedItem);

				return { ...newState, tasks: newTasks };
			}
		case 'DELETE_TASK':
			{
				const newState = {
					...state
				};
				const { id } = payload;
				const newTasks = newState.tasks.filter(i => i.id !== id);

				return {
					...newState, tasks: newTasks
				}
			}
		case 'ADD_TASK': {
			const newState = {
				...state
			};
			const { tasks } = newState;
			const { userId, title, body = '' } = payload;
			const task = {
				userId,
				title,
				body,
				status: false,
				id: tasks.length + 1
			};
			tasks.unshift(task);
			return {
				...newState
			}
		}
		case 'REARRANGE_TASKS': {
			return { ...state, tasks: payload};
		}

		case 'UPDATE_TASK': {
			const newState = {
				...state
			}
			const { tasks } = newState;
			const { id, title } = payload;
			const newTasks = tasks.map((i) => {
				if(i.id === id) {
					i.title = title;
				}
				return i;
			})
			return {
				...newState,
				tasks: newTasks
			}

		}
		default:
			return state
	}
}


// this is component is created using the useReducer and useContext to give fill of redux store
// data can be accessible to all other components without passing the props
const TaskContextProvide = ({
	children
}) => {
	const [state, dispatch] = useReducer(TaskReducer, initialState);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	)
}

export default TaskContextProvide;

