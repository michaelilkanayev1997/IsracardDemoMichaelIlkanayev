import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20 },
});

export default HomeScreen;
