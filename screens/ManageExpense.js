import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import ExpenseForm from "../components/ExpenseForm";
import IconButton from "../components/IconButton";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

//redux
import {
  deleteExpense,
  addExpense,
  updateExpense,
} from "../store/slices/expensesSlice";

import { GlobalStyles } from "../constants/styles";
const { error500, primary800, primary200 } = GlobalStyles.colors;

const ManageExpense = ({ route, navigation }) => {
  const { expenses, status } = useSelector((state) => state.expensesReducer);
  const dispatch = useDispatch();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId, isEditing]);

  const deleteExpenseHandler = async () => {
    dispatch(deleteExpense(expenseId));
    navigation.goBack();
  };
  const cencelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      dispatch(updateExpense({ id: expenseId, data: expenseData }));
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  };

  const spinner = status === "loading" && <LoadingOverlay />;
  const errorMessage = status === "error" && <ErrorOverlay />;

  return (
    <>
      {errorMessage}
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

            {spinner}
          </View>
        )}
      </View>
    </>
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
