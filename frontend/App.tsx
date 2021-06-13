import "react-native-gesture-handler";

import {
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Main from "./components/Main";
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
function App():React.ReactElement {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Main />
    </View>
  );
}

export default function AppWrapper () : React.ReactElement { return(
  <SafeAreaProvider>
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <App />
      </NavigationContainer>
    </PaperProvider>
  </SafeAreaProvider>
);}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
});
