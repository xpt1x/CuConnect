//No longer in use
//Staged for deletion
//Bottom Nav now in Navigators
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomNavigation,
  Text,
  ProgressBar,
  Colors,
} from "react-native-paper";
import { SCREENS as screens } from "../constants/Screens";
import Social from "../components/Social/SocialFeed/Social";
import Attendance from "./pims/Attendance/Attendance";
import Timetable from "./pims/TimeTable/Timetable";
import Marks from "../components/pims/MarksView/Marks";

const SocialRoute = () => <Social />;
const AttendanceRoute = () => <Attendance />;
const TimetableRoute = () => <Timetable />;
const MarksRoute = () => <Marks />;

export default function BottomNav({ navigation }: any) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "attendance", title: "Attendance", icon: "account-group" },
    { key: "timetable", title: "Timetable", icon: "calendar" },
    {
      key: "marks",
      title: "Marks",
      icon: "table",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    attendance: AttendanceRoute,
    timetable: TimetableRoute,
    marks: MarksRoute,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.barStyle}
        shifting={true}
      />
      <ProgressBar indeterminate color={Colors.blue400} />
    </>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "#000000",
    borderTopColor: "#232323",
    borderTopWidth: 0,
  },
});
