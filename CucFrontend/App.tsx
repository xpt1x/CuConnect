import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Layout,
  ApplicationProvider,
  Button,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>{counter}</Text>
      <Button
        onPress={() => {
          setCounter(counter + 1);
        }}
      >
        Press
      </Button>
    </Layout>
  );
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <App />
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    margin: 100,
    fontSize: 30,
    fontWeight: "600",
  },
});
