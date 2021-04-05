import React from "react";
import { Surface, DataTable } from "react-native-paper";
import { Text, StyleSheet, ScrollView } from "react-native";

let infoRow = () => {
  return (
    <DataTable.Row>
      <DataTable.Cell>Mid-Semester Test-1</DataTable.Cell>
      <DataTable.Cell numeric>30/40</DataTable.Cell>
    </DataTable.Row>
  );
};

export default function DetailedMarks() {
  return (
    <>
      <Text style={styles.title}>DESIGN AND ANALYSIS OF ALGORITHMS</Text>
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <DataTable>
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
          </DataTable>
        </Surface>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  surface: {
    padding: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    marginHorizontal: "auto",
  },
  title: {
    padding: 24,
    color: "white",
    alignSelf: "center",
    fontSize: 24,
    marginBottom: 12,
  },
});
