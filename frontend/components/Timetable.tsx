import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import DaySelector from "./DaySelector";
import LectureCard from "./LectureCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TIMETABLE } from "../placeholder/timetable";
interface Props {
  style: object;
}

export default function Timetable() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <LectureCard />
          <LectureCard />
          <LectureCard />
          <LectureCard />
          <LectureCard />
          <LectureCard />
        </ScrollView>
        <DaySelector />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
  },
});
