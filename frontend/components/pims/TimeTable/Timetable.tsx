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

const DayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
interface WorkingDay {
  [key: string]: Lecture | null;
}

export const Timetable = observer(() => {
  const TimeTableStore = useContext(TimeTableStoreContext);
  const [timetableKeys, setTimetableKeys] = React.useState<
    ReadonlyArray<string> | undefined
  >(undefined);

  const [timetable, setTimetable] = React.useState<WorkingDay>();
  const [error, setError] = React.useState<Error | null>(null);
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
    const response = await getTimetable().catch((error) => {
      console.log(error);
      return { message: error };
    });
    setRefreshing(false);
    if ("message" in response) {
      const error = response as Error;
      console.log(`Error from Timetable Component: ${JSON.stringify(error)}`);
      if (!mountedRef.current) return;
      setError(error);
    } else {
      if (!mountedRef.current) return;

      TimeTableStore.setTimetable(response);
      try {
        await AsyncStorage.setItem("timetable", JSON.stringify(response));
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

  React.useEffect(() => {
    if (TimeTableStore.timetable) {
      const TT =
        TimeTableStore.timetable[DayMap[TimeTableStore.currentDay]] !==
        undefined
          ? TimeTableStore.timetable[DayMap[TimeTableStore.currentDay]]
          : { null: null };
      const keys = Object.keys(TT).sort();
      setTimetableKeys(keys);
      setTimetable(TT);
    } else {
      setTimetable(undefined);
    }
  }, [TimeTableStore.timetable, TimeTableStore.currentDay]);

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
          {timetableKeys && timetable ? (
            timetableKeys.map((lectureTime, idx, arr) => {
              return (
                <LectureCard
                  key={idx}
                  lecture={timetable[lectureTime]}
                  time={lectureTime.toString()}
                  holiday={arr[0] === null}
                />
              );
            })
          ) : error ? (
            <ErrorScreen message={error.message} />
          ) : (
            <Loader caption={"Fetching your timetable"} />
          )}
        </ScrollView>
        {timetable ? <DaySelector /> : null}
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
