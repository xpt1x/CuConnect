import React from "react";
import { StyleSheet } from "react-native";
import {
  BottomNavigation,Text
} from "react-native-paper";
import { SCREENS as screens } from "../constants/Screens";
import Attendance from "../components/Attendance";
import Timetable from "../components/Timetable";


const MusicRoute = () => <Attendance/>;

const AlbumsRoute = () => <Timetable/>;

const RecentsRoute = () => <Text>Recents</Text>;

export default function BottomNav({ navigation }: any){
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'queue-music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}