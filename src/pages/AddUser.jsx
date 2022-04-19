import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '../components/index';
import { addUsers } from '../features/users/usersSlice';

const AddUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: '',
		email: '',
	});

	const handleAddUser = () => {
		if (values.name && values.email) {
			dispatch(addUsers(values));
			navigate('/');
		}
		setValues({ name: '', email: '' });
	};

	return (
		<div className='mt-10 max-w-xl mx-auto '>
			<TextField
				value={values.name}
				label='Name'
				inputProps={{ type: 'text', placeholder: 'Add user' }}
				onChange={(e) => setValues({ ...values, name: e.target.value })}
			/>
			<br />
			<TextField
				value={values.email}
				label='Email'
				inputProps={{ type: 'email', placeholder: 'user@mail.com' }}
				onChange={(e) =>
					setValues({ ...values, email: e.target.value })
				}
			/>
			<Button onClick={handleAddUser}>Submit</Button>
		</div>
	);
};

export default AddUser;
