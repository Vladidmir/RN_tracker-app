import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const ExpenseInput = ({ label, style, textInputConfig, invalid }) => {
  const inputStyles = [s.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(s.inputMultiline);
  }
  return (
    <View style={[s.rootContainer, style]}>
      <Text style={[s.lebel, invalid && s.invalidLabel]}>{label}</Text>
      <TextInput
        style={[inputStyles, invalid && s.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
};

export default ExpenseInput;

const { primary100, primary700, error500, error50 } = GlobalStyles.colors;

const s = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 4,
    marginVertical: 10,
  },
  lebel: {
    fontSize: 14,
    fontWeight: "bold",
    color: primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: primary100,
    color: primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: error500,
  },
  invalidInput: {
    backgroundColor: error50,
  },
});
