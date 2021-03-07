import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";
import Api from "../ApiLayer/Api";
import { PromiseInterface } from "../ApiLayer/request";
import { Subject } from "../types/Subject";

interface Props {
  navigation?: NavigationStackProp;
}

export default function Attendance({ navigation }: Props) {
  const [attendance, setAttendance] = useState<
    undefined | ReadonlyArray<Subject>
  >(undefined);
  React.useEffect(() => {
    async function makeRequest() {
      const res: PromiseInterface = await Api.post("/attendance", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: "18bcs6543",
          password: "Astar@4",
        }),
      });
      if (res.ok) {
        setAttendance(res.data);
      } else {
        console.log(res.sysError);
      }
    }
    makeRequest();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {attendance ? (
          attendance.map((subject: Subject, idx: number) => (
            <AttendanceCard
              attendance={subject}
              key={idx}
              navigation={navigation}
            />
          ))
        ) : (
          <ProgressBar indeterminate={true} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
  },
});
