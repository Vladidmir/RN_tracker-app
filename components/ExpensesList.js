import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
const ExpensesList = ({ expenses }) => {
  function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
};
export default ExpensesList;
