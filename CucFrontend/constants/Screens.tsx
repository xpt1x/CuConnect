import React from "react";
import Attendance from "../components/Attendance";
import Timetable from "../components/Timetable";
import Marks from "../components/Marks";
import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";

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
