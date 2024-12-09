import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { axiosInstances } from "../../instances/axiosInstances";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axiosInstances.get(
    "users"
  );
  return data;
});

export const fetchUserPosts = createAsyncThunk(
  "users/fetchUserPosts",
  async (userId) => {
    const { data } = await axiosInstances.get(
      `users/${userId}/posts`
    );
    return data;
  }
);

export const fetchUserTodos = createAsyncThunk(
  "users/fetchUserTodos",
  async (userId) => {
    const { data } = await axiosInstances.get(
      `users/${userId}/todos`
    );
    return data;
  }
);

export const addTodo = createAsyncThunk(
  "users/addTodo",
  async ({ userId, title, completed }) => {
    const { data } = await axiosInstances.post(
      `users/${userId}/todos`,
      {
        title,
        completed,
      }
    );
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null,
    posts: [],
    todos: [],
    todoResponse: null,
    loading: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setTodoResponse: (state) => {
      state.todoResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });

    builder.addCase(fetchUserTodos.fulfilled, (state, action) => {
      state.todos = action.payload.sort((a, b) => b.id - a.id); // Ordenar por ID de mayor a menor
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todoResponse = action.payload;
    });
  },
});

export const { setSelectedUser, setTodoResponse } = userSlice.actions;

export default userSlice.reducer;
