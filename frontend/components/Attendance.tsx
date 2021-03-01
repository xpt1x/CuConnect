import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import AttendanceCard from "./AttendanceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ATTENDANCE } from "../placeholder/attendance";
import { NavigationStackProp } from "react-navigation-stack";
import Api from "../ApiLayer/Api";
import { PromiseInterface } from "../ApiLayer/request";

interface Props {
  navigation?: NavigationStackProp;
}

export default function Attendance({ navigation }: Props) {
  React.useEffect(() => {
    // async function makeRequest() {
    //   const res = await fetch("http://127.0.0.1:8000/pims/attendance", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       uid: "18BCS2430",
    //       password: "Swarnim@2",
    //     }),
    //   });
    //   console.log(res);
    // }
    // makeRequest();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {ATTENDANCE.map((subject, idx) => (
          <AttendanceCard
            attendance={subject}
            key={idx}
            navigation={navigation}
          />
        ))}
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
