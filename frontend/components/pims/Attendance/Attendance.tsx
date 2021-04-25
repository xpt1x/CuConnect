import React from "react";
import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationStackProp } from "react-navigation-stack";
import { getAttendance, getFullAttendance } from "../../../ApiLayer/Api";
import { Subject } from "../../../types/Subject";
import { Error } from "../../../types/Error";
import Loader from "../Utils/Loader";
import ErrorScreen from "../Utils/ErrorScreen";
import { AttendanceStoreContext } from "../../../mobx/contexts";
import { observer } from "mobx-react-lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";

interface Props {
  navigation?: NavigationStackProp;
}
const Attendance = observer(({ navigation }: Props) => {
  const attendanceStore = React.useContext(AttendanceStoreContext);
  const [error, setError] = React.useState<Error | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const mountedRef = React.useRef(true);

  const checkLocalAttendance = async () => {
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
        if (!mountedRef.current) return;
        attendanceStore.setAttendance(JSON.parse(attendance));
        attendanceStore.setFullAttendance(JSON.parse(fullAttendance));
        console.log("Attendance,full set from AsyncStorage");
      } else {
        makeRequest();
        makeFullAttendanceRequest();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const makeRequest = async () => {
    const response = await getAttendance().catch((error) => {
      return { message: error };
    });
    setRefreshing(false);
    if ("message" in response) {
      const error = response as Error;
      if (!mountedRef.current) return;
      setError(error);
    } else {
      // set attendance in store, storage
      if (!mountedRef.current) return;
      attendanceStore.setAttendance(response);
      try {
        await AsyncStorage.setItem("attendance", JSON.stringify(response));
        await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const makeFullAttendanceRequest = async () => {
    const response = await getFullAttendance().catch((error) => {
      return { message: error };
    });
    if ("message" in response) {
      const error = response as Error;
      console.log(
        `Error from Full Attendance Component: ${JSON.stringify(error)}`
      );
      if (!mountedRef.current) return;
      setError(error);
    } else {
      if (!mountedRef.current) return;
      attendanceStore.setFullAttendance(response);
      try {
        await AsyncStorage.setItem("fullattendance", JSON.stringify(response));
        await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
      } catch (e) {
        console.log(e);
      }
    }
  };

  React.useEffect(() => {
    checkLocalAttendance();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    // user wants to make a new network request
    makeRequest();
    makeFullAttendanceRequest();
  }, [update]);

  const onRefreshFn = () => {
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
          attendanceStore.attendance.map((subject: Subject, idx: number) => (
            <AttendanceCard
              subjectAttendance={subject}
              key={idx}
              navigation={navigation}
            />
          ))
        ) : error ? (
          <ErrorScreen message={error.message} />
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
  },
  scrollContainer: {
    width: "100%",
  },
});

export default Attendance;
