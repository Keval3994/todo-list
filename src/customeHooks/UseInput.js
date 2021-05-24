import { useState } from 'react';


// this is the custome hook for handling the input change evenet and resetting the event etc.

// created as hook so we can used at multiple places
//in this small project i have used this at two places for adding task and editing task

const UseInupt = (initialValue = '') => {
	const [value, setValue] = useState(initialValue);

	const reset = () => {
		setValue(initialValue);
	}
	const data = {
		value,
		onChange: (e) => {
			setValue(e.target.value)
		}
	}
	return [value, data, reset];
}

export default UseInupt;