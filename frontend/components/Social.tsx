import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import SocialCard from "./SocialCard";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import AppLoading from "expo-app-loading";

export default function Social() {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <SafeAreaView>
        <Appbar.Header style={styles.header}>
          <Appbar.Content titleStyle={styles.appbar} title={" Social "} />
        </Appbar.Header>
        <ScrollView style={styles.container}>
          <SocialCard />
          <SocialCard />
          <SocialCard />
          <SocialCard />
        </ScrollView>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 80,
  },
  appbar: {
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
    fontSize: 25,
  },
  header: {
    backgroundColor: "#000",
  },
});
