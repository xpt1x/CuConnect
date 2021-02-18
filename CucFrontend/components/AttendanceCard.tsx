import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, ProgressBar, Colors, Text } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

interface Subject {
  UId: string;
  Code: string;
  Title: string;
  DutyLeave: number;
  DutyLeave_N_P: number;
  DutyLeave_Others: number;
  MedicalLeave: number;
  EncryptCode: string;
  Lec_Attd: number;
  Lec_Delv: number;
  Lec_Perc: number;
  name: string;
  Prac_Attd: number;
  Prac_Delv: number;
  Prac_Perc: number;
  Trl_Attd: number;
  Trl_Delv: number;
  Trl_Perc: number;
  Semester: number;
  StudentId: number;
  Total_Attd: string;
  Total_Delv: number;
  Total_Perc: number;
  colorcode: string;
  TotalPercentage: string;
  EligibilityDelivered: string;
  EligibilityPercentage: string;
  EligibilityAttended: string;
}

interface Props {
  attendance: Subject;
  navigation?: NavigationStackProp;
}
export default function AttendanceCard({ attendance, navigation }: Props) {
  const cardPress = () => {
    navigation.navigate("DetailedAttendance");
  }; // Show detailed attendance here

  function setColor(percentage: number) {
    if (percentage >= 90) return Colors.green500;
    if (percentage >= 75) return Colors.lightGreen600;
    else return Colors.red500;
  }
  return (
    // <Card
    //   header={Header}
    //   style={styles.card}
    //   status="success"
    //   appearance="filled"
    // >
    //   <Text category="s1">Total Attended: 2</Text>
    //   <Text category="s1">Total Delivered: 2</Text>
    // </Card>
    <Card style={styles.card} onPress={cardPress}>
      <Card.Title title={attendance.Title} subtitle={`[${attendance.Code}]`} />
      <Card.Content>
        <Text>Atended : {attendance.Total_Attd}</Text>
        <Text>Delivered : {attendance.Total_Delv}</Text>
      </Card.Content>
      <Card.Content>
        <Text style={styles.cardPercent}>
          {attendance.Total_Delv == 0 ? "N/A" : attendance.Total_Perc}%
        </Text>
      </Card.Content>
      <ProgressBar
        style={styles.progressBar}
        progress={attendance.Total_Perc / 100}
        color={setColor(attendance.Total_Perc)}
        indeterminate={false}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    overflow: "hidden",
  },
  progressBar: {
    marginTop: 15,
  },
  // cardPercent: {
  //   marginLeft: "auto",
  //   color: "#77E666",
  //   marginVertical: -38,
  //   marginRight: -18,
  //   fontWeight: "bold",
  //   fontSize: 62,
  // },
  cardPercent: {
    marginLeft: "auto",
    // color: "#77E666",
    marginTop: "-11%",
    // marginRight: "1%",
    // marginBottom: 1,
    // fontWeight: "bold",
    fontSize: 25,
  },
});
