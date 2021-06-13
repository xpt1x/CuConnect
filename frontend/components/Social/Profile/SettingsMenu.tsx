import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import {
  AttendanceStoreContext,
  MarksStoreContext,
  TimeTableStoreContext,
} from "../../../mobx/contexts";
import { signOut } from "../../Authentication/utils";

export default function SettingsMenu(): React.ReactElement {
  const attendanceStore = React.useContext(AttendanceStoreContext);
  const timetableStore = React.useContext(TimeTableStoreContext);
  const marksStore = React.useContext(MarksStoreContext);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

  const clearData = async (): Promise<void> => {
    try {
      signOut(attendanceStore, timetableStore, marksStore);
      navigation.popToTop();
      navigation.replace("Sign In");
    } catch (e) {
      console.warn(e);
      // remove error
    }
  };
  return (
    <ScrollView>
      <List.Item title="Edit Profile" disabled={true} onPress={() => {}} />
      <List.Item title="About" disabled={true} onPress={() => {}} />
      <List.Item title="Contribute" disabled={true} onPress={() => {}} />
      <List.Item title="Sign Out" onPress={clearData} />
    </ScrollView>
  );
}
