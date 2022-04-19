import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Button, TextField } from '../components';
import { editUsers } from '../features/users/usersSlice';

const EditUser = () => {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const { items } = useSelector(({ users }) => users);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setItem(items.filter((item) => String(item.id) === String(id))[0]);
	}, [id]);
	console.log(item);

	const handleAddUser = () => {
		if (item.name && item.email) {
			dispatch(editUsers({ ...item, id }));
			navigate('/');
		}
		setItem(null);
	};

	return (
		<>
			{item && item !== 0 && (
				<div className='mt-10 max-w-xl mx-auto'>
					<TextField
						value={item.name}
						label='Name'
						inputProps={{ type: 'text', placeholder: 'Add user' }}
						onChange={(e) =>
							setItem({ ...item, name: e.target.value })
						}
					/>
					<br />
					<TextField
						value={item.email}
						label='Email'
						inputProps={{
							type: 'email',
							placeholder: 'user@mail.com',
						}}
						onChange={(e) =>
							setItem({ ...item, email: e.target.value })
						}
					/>
					<Button onClick={handleAddUser}>Submit</Button>
				</div>
			)}
		</>
	);

	// return null;
};

export default EditUser;
