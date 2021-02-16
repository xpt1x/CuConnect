import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ATTENDANCE } from "../placeholder/attendance";

export default function Attendance() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {ATTENDANCE.map((subject) => (
          <AttendanceCard attendance={subject} />
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
