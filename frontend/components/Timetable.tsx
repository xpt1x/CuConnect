import React, { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import DaySelector from "./DaySelector";
import LectureCard from "./LectureCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TIMETABLE } from "../placeholder/timetable";
import { observer } from "mobx-react-lite";
import { TimeTableStoreContext } from "../mobx/contexts";

interface Props {
  style: object;
}

const DayMap = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
};

export const Timetable = observer(() => {
  const TimeTableStore = useContext(TimeTableStoreContext);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          {Object.keys(TIMETABLE[DayMap[TimeTableStore.currentDay]]).map(
            (lecture) => (
              <LectureCard
                lecture={TIMETABLE[DayMap[TimeTableStore.currentDay]][lecture]}
              />
            )
          )}
        </ScrollView>
        <DaySelector />
      </View>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
  },
});

export default Timetable;
