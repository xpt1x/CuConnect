import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  configureFonts,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Main from "./components/Main";

import "react-native-gesture-handler";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { fontConfig } from "./constants/Fonts";

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
  fonts: configureFonts(fontConfig),
};
function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Main />
    </View>
  );
}

export default () => (
  <SafeAreaProvider>
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <App />
      </NavigationContainer>
    </PaperProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
});
