import React from "react";
import { StyleSheet, View } from "react-native";
import * as theme from "./custom-theme.json";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Main from "./components/Main";
import Constants from "expo-constants";

function App() {
  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style="light" />
    </View>
  );
}

export default () => (
  <>
    <PaperProvider theme={DarkTheme}>
      <App />
    </PaperProvider>
  </>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
