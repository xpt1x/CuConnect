import React from "react";
import { StyleSheet } from "react-native";
import * as theme from'./custom-theme.json';
import {
  Layout,
  ApplicationProvider,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

function App() {
  return (
    <Layout style={styles.container}>
      
    </Layout>
  );
}

export default () => (
  <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
    <App />
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
