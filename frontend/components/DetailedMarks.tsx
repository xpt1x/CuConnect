import React from "react";
import { Surface, DataTable } from "react-native-paper";
import { Text, StyleSheet, ScrollView } from "react-native";

let infoRow = () => {
  return (
    <DataTable.Row>
      <DataTable.Cell>Required To Hit 75%</DataTable.Cell>
      <DataTable.Cell numeric>6</DataTable.Cell>
    </DataTable.Row>
  );
};

export default function DetailedMarks() {
  return (
    <>
      <Text style={{ color: "white", alignSelf: "center", fontSize: 24 }}>
        {" "}
        Subject ka naam
      </Text>
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
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },

  surface: {
    padding: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    marginHorizontal: "auto",
  },

  chip: {
    marginBottom: "4%",
    marginTop: "2%",
    marginRight: "5%",
    alignSelf: "flex-end",
  },
  chipText: {
    fontSize: 18,
  },
  cardPercent: {
    alignSelf: "center",
    marginBottom: "18%",
    marginTop: "2%",
  },
  percentText: {
    fontSize: 20,
  },
});
