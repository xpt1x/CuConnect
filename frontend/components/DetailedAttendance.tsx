import React from "react";
import {
  ProgressBar,
  Colors,
  Surface,
  DataTable,
  Headline,
} from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

let infoRow = () => {
  return (
    <DataTable.Row>
      <DataTable.Cell>Frozen yogurt</DataTable.Cell>
      <DataTable.Cell numeric>159 / 200</DataTable.Cell>
    </DataTable.Row>
  );
};

export default function DetailedAttendance() {
  return (
    <>
      <ProgressBar progress={0.8} color={Colors.green500} />

      <ScrollView style={styles.container}>
        <Headline>90%</Headline>

        {/* <ProgressCircle
          style={{ height: 100 }}
          progress={0.7}
          progressColor={Colors.purple400}
        /> */}
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
  percentCircle: {
    // alignSelf: "center",
    padding: "7%",
    // marginVertical: "15%",
    color: "white",
    marginHorizontal: "5%",
    fontSize: 50,
  },
});
