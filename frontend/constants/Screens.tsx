import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import Attendance from "../components/pims/Attendance/Attendance";
import Marks from "../components/pims/MarksView/Marks";
import Timetable from "../components/pims/TimeTable/Timetable";
import Social from "../components/Social/SocialFeed/Social";

interface TabBarIconProps {
  color: string;
  focused: boolean;
}
const iconSize = 30;
const styles = StyleSheet.create({
  icons: {
    alignSelf: "center",
    // bottom: "50%",
    transform: [{ translateY: -(iconSize / 2) }],
  },
});

const socialTBI = ({ color, focused }: TabBarIconProps): React.ReactElement => {
  return (
    <IconButton
      icon={focused ? "compass" : "compass-outline"}
      color={color}
      size={iconSize}
      style={styles.icons}
    />
  );
};

const attendanceTBI = ({
  color,
  focused,
}: TabBarIconProps): React.ReactElement => {
  return (
    <IconButton
      icon={focused ? "account-group" : "account-group-outline"}
      color={color}
      size={iconSize}
      style={styles.icons}
    />
  );
};

const timetableTBI = ({
  color,
  focused,
}: TabBarIconProps): React.ReactElement => {
  return (
    <IconButton
      icon="timetable"
      color={color}
      size={iconSize}
      style={styles.icons}
    />
  );
};

const marksTBI = ({ color, focused }: TabBarIconProps): React.ReactElement => {
  return (
    <IconButton
      icon={focused ? "ballot" : "ballot-outline"}
      color={color}
      size={iconSize}
      style={styles.icons}
    />
  );
};

export const SCREENS = [
  {
    component: Social,
    name: "Social",
    options: {
      tabBarIcon: socialTBI,
      size: iconSize,
    },
  },
  {
    component: Attendance,
    name: "Attendance",
    options: {
      tabBarIcon: attendanceTBI,
      size: iconSize,
    },
  },
  {
    component: Timetable,
    name: "Timetable",
    options: {
      tabBarIcon: timetableTBI,
    },
    size: iconSize,
  },
  {
    component: Marks,
    name: "Marks",
    options: {
      tabBarIcon: marksTBI,
    },

    size: iconSize,
  },
];
