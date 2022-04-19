import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchUsers } from './features/users/usersSlice';
import { AddUser, EditUser, UserList } from './pages';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<div className='container mx-auto px-2 max-w-5xl pt-10 md:pt-32'>
			<h1 className='text-center font-bold text-2xl text-gray-700'>
				Users App with redux toollkit
			</h1>
			<Routes>
				<Route path='/' element={<UserList />} />
				<Route path='/add-user' element={<AddUser />} />
				<Route path='/edit-user/:id' element={<EditUser />} />
			</Routes>
		</div>
	);
};

export default App;
