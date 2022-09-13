import { Pressable, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";
import { getFormattedDate } from "../utils/date";

const ExpenseItem = ({ id, description, amount, date }) => {
  const { navigate } = useNavigation();
  const expensePressHandle = () => {
    navigate("ManageExpense", {
      expenseId: id,
    });
  };
  return (
    <Pressable
      onPress={expensePressHandle}
      style={({ pressed }) => pressed && s.pressed}
    >
      <View style={s.rootContainer}>
        <View>
          <View>
            <Text style={[s.textBase, s.description]}>{description}</Text>
          </View>
          <Text style={s.textBase}>{getFormattedDate(date)}</Text>
        </View>

        <View style={s.amountContainer}>
          <Text style={s.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const { primary500, gray500, primary50 } = GlobalStyles.colors;

const s = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 8,
    color: primary500,
    borderRadius: 6,
    shadowColor: gray500,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  textBase: {
    color: primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ExpenseItem;
