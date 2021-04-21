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

interface Props {
  navigation?: NavigationStackProp;
}

const Attendance = observer(({ navigation }: Props) => {
  const attendanceStore = React.useContext(AttendanceStoreContext);
  const [error, setError] = React.useState<Error | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const makeRequest = async () => {
    const response = await getAttendance().catch((error) => {
      return { message: error };
    });
    setRefreshing(false);
    if ("message" in response) {
      const error = response as Error;
      console.log(`Error from Attendance Component: ${error.message}`);
      setError(error);
    } else attendanceStore.setAttendance(response);
  };

  const makeFullAttendanceRequest = async () => {
    const response = await getFullAttendance().catch((error) => {
      return { message: error };
    });
    if ("message" in response) {
      const error = response as Error;
      console.log(`Error from Full Attendance Component: ${error.message}`);
      setError(error);
    } else attendanceStore.setFullAttendance(response);
  };

  React.useEffect(() => {
    makeRequest();
    makeFullAttendanceRequest();
    return () => setError({ message: "Waiting...." });
  }, [update]);

  const onRefreshFn = () => {
    setRefreshing(true);
    forceUpdate(!update);
    attendanceStore.setFullAttendance(null);
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
          <Loader />
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
