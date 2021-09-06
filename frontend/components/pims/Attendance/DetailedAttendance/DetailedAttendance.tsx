import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Text } from "react-native-paper";
import {
  Chip,
  Colors,
  DataTable,
  ProgressBar,
  Surface,
} from "react-native-paper";

import { AttendanceStoreContext } from "../../../../mobx/contexts";
import { Subject } from "../../../../types/Subject";
import Calendar from "./Calendar";

interface RouteParam {
  subject: Subject;
  index: number;
}

const infoRow = (text: string, value: string | number): React.ReactElement => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{text.toUpperCase()}</DataTable.Cell>
      <DataTable.Cell numeric>{value}</DataTable.Cell>
    </DataTable.Row>
  );
};

function calculateLectures(subject: Subject, req: number): string {
  const att = parseInt(subject.EligibilityAttended);
  const del = parseInt(subject.EligibilityDelivered);
  if (del === 0 || att / del >= req / 100) return "NA";
  else {
    const lecs = (req * del - 100 * att) / (100 - req);
    return `${Math.ceil(lecs)} lecture(s) more`;
  }
}

const DetailedAttendance = observer(({ route }: any) => {
  const { subject }: RouteParam = route.params;
  const attendanceStore = React.useContext(AttendanceStoreContext);

  return (
    <>
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <Chip textStyle={styles.chipText} style={styles.chip}>
            {`${subject.EligibilityAttended}/${subject.EligibilityDelivered}`}
          </Chip>
          <AnimatedCircularProgress
            style={styles.cardPercent}
            size={110}
            width={9}
            fill={parseFloat(subject.EligibilityPercentage)}
            tintColor={Colors.greenA700}
            backgroundColor="#3d5875"
          >
            {() => (
              <Text style={styles.percentText}>{`${parseFloat(
                subject.EligibilityPercentage
              )}%`}</Text>
            )}
          </AnimatedCircularProgress>
          {attendanceStore.fullAttendance ? (
            <Calendar subject={attendanceStore.fullAttendance[subject.Title]} />
          ) : (
            <View style={styles.calendarLoader}>
              <ProgressBar
                indeterminate={true}
                color={Colors.blue400}
                style={styles.linearLoader}
              />
            </View>
          )}
          <DataTable>
            {infoRow("Required to hit 75%", calculateLectures(subject, 75))}
            {infoRow("Required to hit 80%", calculateLectures(subject, 80))}
            {infoRow("Required to hit 85%", calculateLectures(subject, 85))}
            {infoRow("Required to hit 90%", calculateLectures(subject, 90))}
            {infoRow(
              "Total Attendance",
              `${subject.Total_Attd} / ${subject.Total_Delv}`
            )}
            {infoRow(
              "Eligible Attendance",
              `${subject.EligibilityAttended} / ${subject.EligibilityDelivered}`
            )}
            {infoRow("Duty Leave N P", subject.DutyLeave_N_P)}
            {infoRow("Duty Leave Others", subject.DutyLeave_Others)}
            {infoRow("Total Percentage", subject.Total_Perc)}
          </DataTable>
        </Surface>
      </ScrollView>
    </>
  );
});

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
    marginBottom: "14%",
    marginTop: "2%",
  },
  percentText: {
    fontSize: 18,
  },
  calendarLoader: {
    height: 86,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  linearLoader: {
    width: "40%",
    alignSelf: "center",
  },
});
export default DetailedAttendance;
