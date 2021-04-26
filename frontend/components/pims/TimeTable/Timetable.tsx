import React, { useContext } from "react";
import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import DaySelector from "./DaySelector";
import LectureCard from "./LectureCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { TimeTableStoreContext } from "../../../mobx/contexts";
import { getTimetable } from "../../../ApiLayer/Api";
import { Lecture } from "../../../types/TimetableTypes";
import { Error } from "../../../types/Error";
import ErrorScreen from "./../Utils/ErrorScreen";
import Loader from "../Utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";

export const Timetable = observer(() => {
  const TimeTableStore = useContext(TimeTableStoreContext);

  const [error, setError] = React.useState<string>("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const mountedRef = React.useRef(true);

  const checkLocalTimetable = async () => {
    try {
      const timetable = await AsyncStorage.getItem("timetable");
      const timestamp = await AsyncStorage.getItem("timestamp");

      if (
        timetable &&
        timestamp &&
        Date.now() - parseInt(timestamp) <= config.cacheMinute * 1000 * 60
      ) {
        // set attendance from storage
        if (!mountedRef.current) return;
        TimeTableStore.setTimetable(JSON.parse(timetable));
        console.log("TT set from AsyncStorage");
      } else {
        makeRequest();
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function makeRequest() {
    const { timetable, error } = await getTimetable();
    setRefreshing(false);
    if (error) {
      if (!mountedRef.current) return;
      setError(error);
    } else if (timetable) {
      if (!mountedRef.current) return;

      TimeTableStore.setTimetable(timetable);
      try {
        await AsyncStorage.setItem("timetable", JSON.stringify(timetable));
        await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
      } catch (e) {
        console.log(e);
      }
    }
  }

  React.useEffect(() => {
    checkLocalTimetable();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    makeRequest();
  }, [update]);

  const onRefreshFn = () => {
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
              TimeTableStore.currentDayLectures.map((lectureTime, idx, arr) => {
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
