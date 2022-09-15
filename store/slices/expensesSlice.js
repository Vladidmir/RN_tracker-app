import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://rn-tracker-app-4d718-default-rtdb.firebaseio.com";

import axios from "axios";

const initialState = {
  expenses: [],
  status: "loading",
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const { data } = await axios.get(`${BASE_URL}/expenses.json`);

    const expenses = [];

    for (const kye in data) {
      const expenseObj = {
        id: kye,
        amount: data[kye].amount,
        date: new Date(data[kye].date),
        description: data[kye].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpenses",
  async (id) => {
    await axios.delete(`${BASE_URL}/expenses/${id}.json`);
    return id;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpenses",
  async (exopenseData) => {
    const { data } = await axios.post(
      `${BASE_URL}/expenses.json`,
      exopenseData
    );
    const id = await data.name;
    const newItem = { ...exopenseData, id };
    return await newItem;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (params) => {
    const { id, data } = params;
    await axios.put(`${BASE_URL}/expenses/${id}.json`, data);
    return { id, data };
  }
);

const orderSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.status = "success";
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.expenses = [];
        state.status = "error";
      })
      //delete
      .addCase(deleteExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (item) => item.id !== action.payload
        );
        state.status = "success";
      })
      .addCase(deleteExpense.rejected, (state) => {
        state.status = "error";
      })
      //add
      .addCase(addExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        state.status = "success";
      })
      .addCase(addExpense.rejected, (state) => {
        state.status = "error";
      })
      //update
      .addCase(updateExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const updatableExpenseIndex = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        const updatableExpense = state.expenses[updatableExpenseIndex];
        const updatedItem = { ...updatableExpense, ...action.payload.data };

        state.expenses[updatableExpenseIndex] = updatedItem;
        state.status = "success";
      })
      .addCase(updateExpense.rejected, (state) => {
        state.status = "error";
      });
  },
});

const { actions, reducer } = orderSlice;

export default reducer;
