import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AttendanceStoreContext,
  TimeTableStoreContext,
} from "../mobx/contexts";

const SignOut = observer(() => {
  const TimeTableStore = React.useContext(TimeTableStoreContext);
  const AttendanceStore = React.useContext(AttendanceStoreContext);

  const reset = () => {
    AttendanceStore.setAttendance(null);
    AttendanceStore.setFullAttendance(null);
    TimeTableStore.setTimetable(null);
    console.log("Cleared");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={reset}>Clear</Button>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignOut;
