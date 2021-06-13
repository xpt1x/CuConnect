import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTimetable } from "../../../ApiLayer/Api";
import config from "../../../config";
import { TimeTableStoreContext } from "../../../mobx/contexts";
import Loader from "../Utils/Loader";
import ErrorScreen from "./../Utils/ErrorScreen";
import DaySelector from "./DaySelector";
import LectureCard from "./LectureCard";

export const Timetable = observer(() => {
  const TimeTableStore = useContext(TimeTableStoreContext);

  const [error, setError] = React.useState<string>("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const checkLocalTimetable = async (): Promise<void> => {
    try {
      const timetable = await AsyncStorage.getItem("timetable");
      const timestamp = await AsyncStorage.getItem("timestamp");

      if (
        timetable &&
        timestamp &&
        Date.now() - parseInt(timestamp) <= config.cacheMinute * 1000 * 60
      ) {
        // set attendance from storage
        setRefreshing(false);
        TimeTableStore.setTimetable(JSON.parse(timetable));
      } else {
        makeRequest();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  async function makeRequest(): Promise<void> {
    const { timetable, error } = await getTimetable();
    setRefreshing(false);
    if (error) {
      setError(error);
    } else if (timetable) {
      TimeTableStore.setTimetable(timetable);
      try {
        await AsyncStorage.setItem("timetable", JSON.stringify(timetable));
        await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
      } catch (e) {
        console.warn(e);
      }
    }
  }

  React.useEffect(() => {
    checkLocalTimetable();
  }, [update]);

  const onRefreshFn = (): void => {
    TimeTableStore.setTimetable(null);
    setRefreshing(true);
    forceUpdate(!update);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefreshFn} />
          }
        >
          {TimeTableStore.timetable ? (
            TimeTableStore.currentDayLectures ? (
              TimeTableStore.currentDayLectures.map((lectureTime, idx) => {
                return (
                  <LectureCard
                    key={idx}
                    lecture={
                      TimeTableStore.timetable
                        ? TimeTableStore.timetable[TimeTableStore.currentDay][
                            lectureTime
                          ]
                        : null
                    }
                    time={lectureTime.toString()}
                  />
                );
              })
            ) : (
              <LectureCard lecture={null} holiday={true} />
            )
          ) : error ? (
            <ErrorScreen message={error} />
          ) : (
            <Loader caption={"Fetching your timetable"} />
          )}
        </ScrollView>
        {TimeTableStore.timetable ? <DaySelector /> : null}
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
