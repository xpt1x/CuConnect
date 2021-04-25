import React from "react";
import Social from "../components/Social/SocialFeed/Social";
import Attendance from "../components/pims/Attendance/Attendance";
import Timetable from "../components/pims/TimeTable/Timetable";
import Marks from "../components/pims/MarksView/Marks";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import SignOut from "../components/pims/Utils/SignOut";

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

export const SCREENS = [
  {
    component: Social,
    name: "Social",
    options: {
      tabBarIcon: ({ color, focused }: TabBarIconProps) => {
        return (
          <IconButton
            icon={focused ? "compass" : "compass-outline"}
            color={color}
            size={iconSize}
            style={styles.icons}
          />
        );
      },
      size: iconSize,
    },
  },
  {
    component: Attendance,
    name: "Attendance",
    options: {
      tabBarIcon: ({ color, focused }: TabBarIconProps) => {
        return (
          <IconButton
            icon={focused ? "account-group" : "account-group-outline"}
            color={color}
            size={iconSize}
            style={styles.icons}
          />
        );
      },
      size: iconSize,
    },
  },
  {
    component: Timetable,
    name: "Timetable",
    options: {
      tabBarIcon: ({ color, focused }: TabBarIconProps) => {
        return (
          <IconButton
            icon="timetable"
            color={color}
            size={iconSize}
            style={styles.icons}
          />
        );
      },
    },
    size: iconSize,
  },
  {
    component: Marks,
    name: "Marks",
    options: {
      tabBarIcon: ({ color, focused }: TabBarIconProps) => {
        return (
          <IconButton
            icon={focused ? "ballot" : "ballot-outline"}
            color={color}
            size={iconSize}
            style={styles.icons}
          />
        );
      },
    },

    size: iconSize,
  },
];
