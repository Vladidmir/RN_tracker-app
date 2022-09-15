import React from "react";
import { useSelector } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput";

const ALlExpenses = () => {
  const { expenses } = useSelector((state) => state.expensesReducer);

  return (
    <ExpensesOutput
      expenses={expenses}
      fallbackText="No registered expenses found!"
      periodName="Total"
    />
  );
};

export default ALlExpenses;
