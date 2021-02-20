import React from "react";
import DetailedAttendance from "./DetailedAttendance";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SCREENS as screens } from "../constants/Screens";
import { IconButton } from "react-native-paper";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const navigatorProps: StackNavigationProp = {
  initialRouteName: "Nav",
  mode: "card",
  headerMode: "float",
  detachInactiveScreens: false,
  screenOptions: {
    headerTitleAlign: "center",
    headerStyle: {
      height: 80,
      backgroundColor: "#000000",
      borderBottomWidth: 0.3,
    },
    headerBackImage: () => <IconButton icon="chevron-left" size={30} />,
  },
};

const BottomNav = createMaterialBottomTabNavigator();
const BottomNavComponent = () => (
  <BottomNav.Navigator {...BottomNavProps}>
    {screens.map((screen, idx) => (
      <BottomNav.Screen {...screen} key={idx} />
    ))}
  </BottomNav.Navigator>
);

const BottomNavProps = {
  initialRouteName: "Attendance",
  shifting: true,
  labeled: false,
  barStyle: {
    backgroundColor: "#000000",
  },
};

export default function Main() {
  return (
    <>
      <Stack.Navigator {...navigatorProps}>
        <Stack.Screen
          name="Detailed Attendance"
          component={DetailedAttendance}
          options={({ route }) => ({ title: route.params.headerName })}
        />
        <Stack.Screen
          name="Nav"
          component={BottomNavComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
