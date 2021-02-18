import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ATTENDANCE } from "../placeholder/attendance";
import { createStackNavigator } from "@react-navigation/stack";
import DetailedAttendance from "./DetailedAttendance";
import { NavigationStackProp } from "react-navigation-stack";

const Stack = createStackNavigator();

interface Props {
  navigation?: NavigationStackProp;
}

export default function Attendance({ navigation }: Props) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {ATTENDANCE.map((subject, idx) => (
          <AttendanceCard
            attendance={subject}
            key={idx}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
  },
});
