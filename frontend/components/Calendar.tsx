import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Calendar() {
  return <Text style={styles.calendarAccordionItem}>Days</Text>;
}

const styles = StyleSheet.create({
  calendarAccordionItem: {
    backgroundColor: "grey",
    // change background color
    height: 50,
  },
});
