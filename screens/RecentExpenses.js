import React from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import LoadingOverlay from "../components/LoadingOverlay";

import { ExpensesContext } from "../store/context/expensesContext";
import { getDateMinusDays } from "../utils/date";
import { fetchExpensesDB } from "../utils/http";

const RecentExpenses = () => {
  const [isLoading, setLoading] = React.useState(true);
  const { setExpenses, expenses } = React.useContext(ExpensesContext);

  React.useEffect(() => {
    fetchExpensesDB().then((items) => {
      setExpenses(items);
      setLoading(false);
    });
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DayesAgo = getDateMinusDays(today, 7);
    return expense.date > date7DayesAgo && expense.date <= today;
  });

  if (isLoading) {
    return <LoadingOverlay />;
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
