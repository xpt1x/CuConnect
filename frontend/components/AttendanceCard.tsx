import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  ProgressBar,
  Colors,
  Text,
  Surface,
} from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Subject } from "../types/Subject";

interface Props {
  attendance: Subject;
  navigation?: NavigationStackProp;
}
export default function AttendanceCard({ attendance, navigation }: Props) {
  const cardPress = (headerName: string) => {
    navigation.push("Detailed Attendance", {
      subject: headerName,
    });
  };

  function setColor(percentage: number) {
    if (percentage >= 90) return Colors.green500;
    if (percentage >= 75) return Colors.lightGreen600;
    else return Colors.red500;
  }
  return (
    <Card style={styles.card} onPress={() => cardPress(attendance.Title)}>
      <Card.Title
        title={attendance.Title}
        subtitle={`[${attendance.Code}]`}
        titleNumberOfLines={2}
      />
      <Card.Content>
        <Text>Atended : {attendance.Total_Attd}</Text>
        <Text>Delivered : {attendance.Total_Delv}</Text>
        <AnimatedCircularProgress
          style={styles.cardPercent}
          size={60}
          width={3}
          fill={attendance.Total_Perc}
          tintColor={setColor(attendance.Total_Perc)}
          backgroundColor="#3d5875"
        >
          {() => (
            <Text>
              {attendance.Total_Delv == 0 ? "N/A" : attendance.Total_Perc}%
            </Text>
          )}
        </AnimatedCircularProgress>
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
    marginTop: "-18%",
    paddingBottom: "2%",
    // marginRight: "1%",
    // marginBottom: 1,
    // fontWeight: "bold",
  },
});
