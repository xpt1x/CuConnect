import React, { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import DaySelector from "./DaySelector";
import LectureCard from "./LectureCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TIMETABLE } from "../placeholder/timetable";
import { observer } from "mobx-react-lite";
import { TimeTableStoreContext } from "../mobx/contexts";
import { getTimetable } from "../ApiLayer/Api";
import { TimetableTypes, Lecture } from "../types/TimetableTypes";

const DayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
interface WorkingDay {
  [key: string]: Lecture | null;
}
interface Holiday {
  "#": string;
}

export const Timetable = observer(() => {
  const TimeTableStore = useContext(TimeTableStoreContext);
  const [timetableKeys, setTimetableKeys] = React.useState<
    ReadonlyArray<string> | undefined
  >(undefined);
  const [timetable, setTimetable] = React.useState<WorkingDay | Holiday>();
  React.useEffect(() => {
    async function makeRequest() {
      const response = await getTimetable();
      if ("message" in response) {
        throw new Error((response as Error).message);
      } else {
        TimeTableStore.timetable = response;
        const TT =
          TimeTableStore.timetable[DayMap[TimeTableStore.currentDay]] !==
          undefined
            ? TimeTableStore.timetable[DayMap[TimeTableStore.currentDay]]
            : { "#": "#" };
        const keys = Object.keys(TT).sort();
        setTimetableKeys(keys);
        setTimetable(TT);
      }
    }
    makeRequest();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          {timetableKeys && timetable
            ? timetableKeys.map((lectureTime, idx, arr) => {
                return (
                  <LectureCard
                    key={idx}
                    lecture={timetable[lectureTime]}
                    time={lectureTime.toString()}
                    holiday={arr[0] === "#"}
                  />
                );
              })
            : null}
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
