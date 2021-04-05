import React from "react";
import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationStackProp } from "react-navigation-stack";
import { getAttendance } from "../ApiLayer/Api";
import { Subject } from "../types/Subject";
import { Error } from "../types/Error";
import Loader from "./Loader";
import ErrorScreen from "./ErrorScreen";

interface Props {
  navigation?: NavigationStackProp;
}

export default function Attendance({ navigation }: Props) {
  const [error, setError] = React.useState<Error | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);
  const [attendance, setAttendance] = React.useState<
    ReadonlyArray<Subject> | undefined
  >(undefined);

  React.useEffect(() => {
    async function makeRequest() {
      const response = await getAttendance().catch((error) => {
        return { message: error };
      });
      setRefreshing(false);
      if ("message" in response) {
        const error = response as Error;
        console.log(`Error from Attendance Component: ${error.message}`);
        setError(error);
      } else setAttendance(response);
    }
    makeRequest();
    return () => setError({ message: "Waiting...." });
  }, [update]);

  const onRefreshFn = () => {
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
        {attendance ? (
          attendance.map((subject: Subject, idx: number) => (
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
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
  },
});
