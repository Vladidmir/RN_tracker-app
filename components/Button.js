import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const { primary500, primary200, primary100 } = GlobalStyles.colors;
const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && s.pressed}
      >
        <View style={[s.button, mode === "flat" && s.flat]}>
          <Text style={[s.buttonText, mode === "flat" && s.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
export default Button;

const s = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: primary100,
    borderRadius: 4,
  },
});
