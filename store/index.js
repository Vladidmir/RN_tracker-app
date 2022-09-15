import { configureStore } from "@reduxjs/toolkit";

import expensesReducer from "./slices/expensesSlice";

export const store = configureStore({
  reducer: { expensesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
