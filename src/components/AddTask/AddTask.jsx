import React, { useContext } from 'react';

import UseInput from '../../customeHooks/UseInput';

import { TaskContext } from '../../TaskContext/TaskContext';


// this component is used to add the task to the exisiting list by passing the title and userId which help to add task to specific user
const AddTask = () => {

	const context = useContext(TaskContext)
	const { state: { user: { userId } }, dispatch } = context;
	const [val, bindData, reset] = UseInput();

	const addtask = () => {
		dispatch({ type: 'ADD_TASK', payload: { userId, title: val } });
		reset();
	}
	return (
		<div className="add-task-container">
			<label>Add Task:</label>
			<input type='text'
				value={val}
				{...bindData}
			/>
			<button
				className="confirm-button"
				onClick={addtask}
			>Click to add task</button>
		</div>
	)
};

export default AddTask;
