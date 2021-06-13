import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Card, Colors, ProgressBar, Text } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

import { Subject } from "../../../types/Subject";

interface Props {
  subjectAttendance: Subject;
  navigation?: NavigationStackProp;
}
export default function AttendanceCard({
  subjectAttendance,
  navigation,
}: Props): React.ReactElement {
  const cardPress = (subject: Subject): void => {
    if (subject.Total_Delv === 0) return;
    navigation.push("Detailed Attendance", {
      subject: subject,
    });
  };

  function setColor(percentage: number): string {
    if (percentage >= 90) return Colors.green500;
    if (percentage >= 75) return Colors.lightGreen600;
    else return Colors.red500;
  }
  return (
    <Card
      style={
        styles.card
        // borderColor: setColor(subjectAttendance.Total_Perc),
      }
      onPress={() => cardPress(subjectAttendance)}
    >
      <Card.Title
        title={subjectAttendance.Title}
        subtitle={`[${subjectAttendance.Code}]`}
        titleNumberOfLines={2}
      />
      <Card.Content>
        <Text >Atended : {subjectAttendance.Total_Attd}</Text>
        <Text>Delivered : {subjectAttendance.Total_Delv}</Text>
        <AnimatedCircularProgress
          style={styles.cardPercent}
          size={60}
          width={3}
          fill={subjectAttendance.Total_Perc}
          tintColor={setColor(subjectAttendance.Total_Perc)}
          backgroundColor="#3d5875"
        >
          {() => (
            <Text>
              {subjectAttendance.Total_Delv == 0
                ? "N/A"
                : `${subjectAttendance.Total_Perc}%`}
            </Text>
          )}
        </AnimatedCircularProgress>
      </Card.Content>
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
    backgroundColor: "#0d0d0d",
    borderWidth: 0.2,
    borderRadius: 7,
  },
  progressBar: {
    marginTop: 15,
  },

  cardPercent: {
    marginLeft: "auto",
    marginTop: "-18%",
    paddingBottom: "2%",
  },
});
