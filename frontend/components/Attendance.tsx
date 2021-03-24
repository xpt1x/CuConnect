import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";
import {getAttendance} from "../ApiLayer/Api";
import { Subject } from "../types/Subject";
import { Error } from "../types/Error";

interface Props {
  navigation?: NavigationStackProp;
}

export default function Attendance({ navigation }: Props) {
  const [attendance, setAttendance] = useState<
    ReadonlyArray<Subject> | undefined
  >(undefined);
  React.useEffect(() => {
    async function makeRequest() {
      const response = await getAttendance();
      if("message" in response) { 
        throw new Error((response as Error).message);
      }
      else 
        setAttendance(response);
    }
    makeRequest();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {attendance ? (
          attendance.map((subject: Subject, idx: number) => (
            <AttendanceCard
              subjectAttendance={subject}
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
