import React, { useContext } from 'react';
import { TaskContext } from '../../TaskContext/TaskContext';

const DISPLAY_NAME = 'header-container';

// this is used to display the title and name of the user who has logged in 
const Header = ({ title }) => {

	const context = useContext(TaskContext)
	const { state: { user: { userName } } } = context;
	return (
		<div className={`${DISPLAY_NAME}`}>
			<h1> {title} </h1>
			<h5>{userName}</h5>
		</div>
	)
}

export default Header;
