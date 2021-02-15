import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = (props: any) => (
  <View {...props}>
    <Text>JavaScript</Text>
    <Text>By Wikipedia</Text>
  </View>
);
export default function Attendance() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
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
