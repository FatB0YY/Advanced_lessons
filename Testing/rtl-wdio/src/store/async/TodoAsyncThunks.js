import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeTodo } from "../reducers/todoReducer";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("#");

      if (!response.ok) {
        throw new Error("Cant fetch");
      }

      const testData = thunkAPI.getState();

      const data = await response.json();
      return { data, testData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`#/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Cant delete");
      }

      thunkAPI.dispatch(removeTodo({ id }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
