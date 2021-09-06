import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationStackProp } from "react-navigation-stack";

import { getAttendance, getFullAttendance } from "../../../ApiLayer/Api";
import config from "../../../config";
import { AttendanceStoreContext } from "../../../mobx/contexts";
import { Subject } from "../../../types/Subject";
import ErrorScreen from "../Utils/ErrorScreen";
import Loader from "../Utils/Loader";
import AttendanceCard from "./AttendanceCard";

interface Props {
  navigation?: NavigationStackProp;
}
const Attendance = observer(({ navigation }: Props) => {
  const attendanceStore = React.useContext(AttendanceStoreContext);
  const [error, setError] = React.useState<string>("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const checkLocalAttendance = async (): Promise<void> => {
    try {
      const attendance = await AsyncStorage.getItem("attendance");
      const fullAttendance = await AsyncStorage.getItem("fullattendance");

      const timestamp = await AsyncStorage.getItem("timestamp");
      if (
        attendance &&
        fullAttendance &&
        timestamp &&
        Date.now() - parseInt(timestamp) <= config.cacheMinute * 1000 * 60
      ) {
        // set attendance from storage
        setRefreshing(false);
        attendanceStore.setAttendance(JSON.parse(attendance));
        attendanceStore.setFullAttendance(JSON.parse(fullAttendance));
      } else {
        makeRequest();
        makeFullAttendanceRequest();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const makeRequest = async (): Promise<void> => {
    const { attendance, error } = await getAttendance();
    setRefreshing(false);
    if (error) {
      setError(error);
    } else if (attendance) {
      // set attendance in store, storage
      attendanceStore.setAttendance(attendance);
      try {
        await AsyncStorage.setItem("attendance", JSON.stringify(attendance));
        await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const makeFullAttendanceRequest = async (): Promise<void> => {
    const { fullattendance, error } = await getFullAttendance();
    if (error) {
      setError(error);
    } else if (fullattendance) {
      attendanceStore.setFullAttendance(fullattendance);
      try {
        await AsyncStorage.setItem(
          "fullattendance",
          JSON.stringify(fullattendance)
        );
        await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  React.useEffect(() => {
    checkLocalAttendance();
  }, [update]);

  const onRefreshFn = (): void => {
    attendanceStore.setAttendance(null);
    attendanceStore.setFullAttendance(null);
    setRefreshing(true);
    forceUpdate(!update);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshFn} />
        }
      >
        {attendanceStore.attendance ? (
          attendanceStore.attendance.length > 0 ? (
            attendanceStore.attendance.map((subject: Subject, idx: number) => (
              <AttendanceCard
                subjectAttendance={subject}
                key={idx}
                navigation={navigation}
              />
            ))
          ) : (
            <ErrorScreen message={"No attendance marked for this session"} />
          )
        ) : error ? (
          <ErrorScreen message={error} />
        ) : (
          <Loader caption={"Fetching your attendance"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    width: "100%",
  },
});

export default Attendance;
