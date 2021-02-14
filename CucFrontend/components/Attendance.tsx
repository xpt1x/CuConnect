import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import AttendanceCard from "./AttendanceCard";

const Header = (props: any) => (
  <View {...props}>
    <Text>JavaScript</Text>
    <Text>By Wikipedia</Text>
  </View>
);
export default function Attendance() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
      </ScrollView>
    </View>
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
