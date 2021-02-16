import React from "react";
import { StyleSheet } from "react-native";
import {
  BottomNavigation,Text
} from "react-native-paper";
import { SCREENS as screens } from "../constants/Screens";
import Attendance from "../components/Attendance";
import Timetable from "../components/Timetable";


const AttendanceRoute = () => <Attendance/>;

const TimetableRoute = () => <Timetable/>;

const InfoRoute = () => <Text>Recents</Text>;

export default function BottomNav({ navigation }: any){
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'attendance', title: 'Attendance', icon: 'account-group' },
    { key: 'timetable', title: 'Timetable', icon: 'calendar' },
    { key: 'info', title: 'Info', icon: 'information' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    attendance: AttendanceRoute,
    timetable: TimetableRoute,
    info: InfoRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}