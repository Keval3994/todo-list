import React, { useContext, useState } from 'react'
import { TaskContext } from '../../TaskContext/TaskContext';
import UseInput from '../../customeHooks/UseInput';

// this component is used to reder task and interact with store by makin it as complete
// updating the text of the title and also allows to delete the particular task


const Task = ({ title, id, body, status }) => {
	const context = useContext(TaskContext);
	const { dispatch } = context;

	const [isEditing, setisEditing] = useState(false);

	const [val, bindData, reset] = UseInput(title);

	const changeTitle = (e) => {
		setisEditing(true);
	}

	const updateTask = () => {
		dispatch({type: 'UPDATE_TASK', payload: { id, title: val}})
		setisEditing(false);
	}
	return (
		<div className='task-container'>
			<div className='task'>
				<input
					type="checkbox"
					onClick={(i) => dispatch({ type: 'SET_COMPLETED', payload: { id } })}
					defaultChecked={status}
				></input>

				{!isEditing ? <h5 className="task-header"
					onClick={changeTitle}>
					{title}
				</h5> : <><input type='text' value={val} {...bindData}/> <button onClick={updateTask}>Update</button></>}
				<button
					onClick={() => dispatch({ type: 'DELETE_TASK', payload: { id } })}
					className="delete-button"
					disabled={status}
				>Delete</button>
			</div>
			<div>
				<p className='content'>
					{body}
				</p>
			</div>
		</div>
	)
}

export default React.memo(Task);