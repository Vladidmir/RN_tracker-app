import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

import { fetchExpenses } from "../store/slices/expensesSlice";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const dispatch = useDispatch();
  const { expenses, status } = useSelector((state) => state.expensesReducer);

  React.useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DayesAgo = getDateMinusDays(today, 7);
    return expense.date > date7DayesAgo && expense.date <= today;
  });

  if (status === "loading") {
    return <LoadingOverlay />;
  }

  if (status === "error") {
    return <ErrorOverlay />;
  }

  return (
    <ExpensesOutput
      periodName="Last 7 Dayes"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
