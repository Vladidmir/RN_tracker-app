import React from "react";
import { StyleSheet, View } from "react-native";

import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";
import LoadingOverlay from "../components/LoadingOverlay";

import { ExpensesContext } from "../store/context/expensesContext.js";
import {
  storeExpenseDB,
  deleteExpenseDB,
  updateExpenseDB,
} from "../utils/http.js";

import { GlobalStyles } from "../constants/styles";
const { error500, primary800, primary200 } = GlobalStyles.colors;

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const { deleteExpense, addExpense, updateExpence, expenses } =
    React.useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId, isEditing]);

  const deleteExpenseHandler = async () => {
    setSubmitting(true);
    deleteExpense(expenseId); //local
    await deleteExpenseDB(expenseId);
    // navigation.goBack();
  };
  const cencelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setSubmitting(true);
    if (isEditing) {
      updateExpence(expenseId, expenseData); //local
      await updateExpenseDB(expenseId, expenseData); //db
      setSubmitting(false);
    } else {
      const id = await storeExpenseDB(expenseData);
      addExpense({ ...expenseData, id });
      setSubmitting(false);
    }
    // navigation.goBack();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={s.rootContainer}>
      <ExpenseForm
        onCancel={cencelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        isEditing={isEditing}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={s.deleteContainer}>
          <IconButton
            icon="trash"
            color={error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: primary800,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {
    minWidth: 120,
  },

  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: primary200,
  },
});

export default ManageExpense;
