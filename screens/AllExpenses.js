import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";

import { ExpensesContext } from "../store/context/expensesContext";
const ALlExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      fallbackText="No registered expenses found!"
      periodName="Total"
    />
  );
};

export default ALlExpenses;
