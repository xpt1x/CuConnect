import React, { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import DaySelector from "./DaySelector";
import LectureCard from "./LectureCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TIMETABLE } from "../placeholder/timetable";
import { observer } from "mobx-react-lite";
import { TimeTableStoreContext } from "../mobx/contexts";

const DayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Timetable = observer(() => {
  const TimeTableStore = useContext(TimeTableStoreContext);

  const TT =
    TIMETABLE[DayMap[TimeTableStore.currentDay]] !== undefined
      ? TIMETABLE[DayMap[TimeTableStore.currentDay]]
      : { "#": "#" };
  const keys = Object.keys(TT).sort();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          {keys.map((lectureTime, idx, arr) => {
            return (
              <LectureCard
                key={idx}
                lecture={TT[lectureTime]}
                time={lectureTime.toString()}
                holiday={arr[0] === "#"}
              />
            );
          })}
        </ScrollView>
        <DaySelector />
      </View>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default Timetable;
