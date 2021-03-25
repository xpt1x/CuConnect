import React from "react";
import {
  ProgressBar,
  Colors,
  Surface,
  DataTable,
  Chip,
  Text,
} from "react-native-paper";
import { StyleSheet, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Calendar from "./Calendar";
import { Subject } from "../types/Subject";

interface RouteParam {
  subject: Subject;
}

let infoRow = () => {
  return (
    <DataTable.Row>
      <DataTable.Cell>Required To Hit 75%</DataTable.Cell>
      <DataTable.Cell numeric>6</DataTable.Cell>
    </DataTable.Row>
  );
};

export default function DetailedAttendance({ route }: any) {
  const { subject }: RouteParam = route.params;
  return (
    <>
      <ProgressBar
        progress={subject.Total_Perc / 100}
        color={Colors.green500}
      />
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <Chip textStyle={styles.chipText} style={styles.chip}>
            {`${subject.Total_Attd}/${subject.Total_Delv}`}
          </Chip>
          <AnimatedCircularProgress
            style={styles.cardPercent}
            size={110}
            width={9}
            fill={subject.Total_Perc}
            tintColor={Colors.greenA700}
            backgroundColor="#3d5875"
          >
            {() => (
              <Text style={styles.percentText}>{`${subject.Total_Perc}%`}</Text>
            )}
          </AnimatedCircularProgress>
          <Calendar />
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
    backgroundColor: "#000",
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
