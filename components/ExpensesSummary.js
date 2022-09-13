import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const ExpensesSummary = ({ periodName, expenses }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={s.rootContainer}>
      <Text style={s.period}>{periodName}</Text>
      <Text style={s.sum}>$ {expensesSum.toFixed(2)}</Text>
    </View>
  );
};

const { primary50, primary400, primary500 } = GlobalStyles.colors;

const s = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: primary50,
    borderRadius: 6,
  },
  period: { fontSize: 14, color: primary400 },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: primary500,
  },
});
export default ExpensesSummary;
