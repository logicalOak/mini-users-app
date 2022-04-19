import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:5000';

const initialState = {
	items: [],
	isLoading: false,
	isError: null,
};

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (payload, thunkAPI) => {
		try {
			const { data } = await axios.get(`${URL}/users`);
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);

export const addUsers = createAsyncThunk(
	'users/addUsers',
	async (payload, thunkAPI) => {
		try {
			const { data } = await axios.post(`${URL}/users`, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);
export const deleteUsers = createAsyncThunk(
	'users/deleteUsers',
	async (id, thunkAPI) => {
		try {
			await axios.delete(`${URL}/users/${id}`);
			return id;
		} catch (error) {
			console.error(error);
		}
	}
);
export const editUsers = createAsyncThunk(
	'users/editUsers',
	async ({ id, name, email }, thunkAPI) => {
		try {
			const { data } = await axios.put(
				`${URL}/users/${id}`,
				{ name, email },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		// fetchUsers
		[fetchUsers.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchUsers.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = payload;
		},
		[fetchUsers.rejected]: (state) => {
			state.isError = true;
			state.isLoading = false;
		},

		// addUsers
		[addUsers.pending]: (state) => {
			state.isLoading = true;
		},
		[addUsers.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items.push(payload);
		},
		[addUsers.rejected]: (state) => {
			state.isError = true;
			state.isLoading = false;
		},

		// deleteUsers
		[deleteUsers.pending]: (state) => {
			state.isLoading = true;
		},
		[deleteUsers.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = state.items.filter((item) => item.id !== payload);
		},
		[deleteUsers.rejected]: (state) => {
			state.isError = true;
			state.isLoading = false;
		},

		// editUsers
		[editUsers.pending]: (state) => {
			state.isLoading = true;
		},
		[editUsers.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = state.items.map((item) =>
				item.id === payload.id ? payload : item
			);
		},
		[editUsers.rejected]: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
	},
});

export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
