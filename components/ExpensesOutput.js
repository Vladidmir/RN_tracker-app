import { View, Text, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../constants/styles";

const ExpensesOutput = ({ expenses, periodName, fallbackText }) => {
  let content = <Text style={s.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={s.rootContainer}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {content}
    </View>
  );
};
const { primary700 } = GlobalStyles.colors;

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: primary700,
  },
  infoText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    margin: 32,
  },
});
export default ExpensesOutput;
