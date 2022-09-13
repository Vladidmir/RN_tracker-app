import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const LoadingOverlay = () => {
  return (
    <View style={s.rootContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const { primary700 } = GlobalStyles.colors;
const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary700,
    padding: 24,
  },
});

export default LoadingOverlay;
