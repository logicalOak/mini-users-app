import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../components/index';
import { deleteUsers } from '../features/users/usersSlice';
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/all';

const UserList = () => {
	const dispatch = useDispatch();
	const { items: users } = useSelector(({ users }) => users);

	const renderCard = () =>
		users.map((user) => (
			<div
				key={user.id}
				className='bg-gray-300 p-5 flex items-center justify-between rounded-md'
			>
				<div>
					<h3 className='font-bold text-lg text-gray-700'>
						{user.name}
					</h3>
					<span className='font-normal text-gray-600'>
						{user.email}
					</span>
				</div>
				<div className='flex gap-4'>
					<Link to={`/edit-user/${user.id}`}>
						<button className='flex items-center justify-center'>
							<RiPencilLine />
						</button>
					</Link>
					<button
						className='flex items-center justify-center'
						onClick={() => dispatch(deleteUsers(user.id))}
					>
						<RiDeleteBinLine />
					</button>
				</div>
			</div>
		));

	return (
		<div>
			<Link to='/add-user'>
				<Button>Add User</Button>
			</Link>
			<div className='grid gap-5 md:grid-cols-2'>
				{users.length ? (
					renderCard()
				) : (
					<p className='text-center col-span-2 text-gray-700 font-semibold'>
						No Users
					</p>
				)}
			</div>
		</div>
	);
};

export default UserList;
