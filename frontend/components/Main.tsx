import React from "react";
import DetailedAttendance from "./DetailedAttendance";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import { SCREENS as screens } from "../constants/Screens";
import { IconButton } from "react-native-paper";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs/lib/typescript/src/types";

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
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    gestureResponseDistance: {
      horizontal: 100,
    },
  },
};

const BottomNav = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  tabStyle: {
    height: 55,
    backgroundColor: "#000000",
  },
});

const TabProps = {
  initialRouteName: "Attendance",
  backBehavior: "initialRoute",
  tabBarPosition: "bottom",
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    tabStyle: styles.tabStyle,
  },
};
const BottomNavComponent = () => (
  <BottomNav.Navigator {...TabProps}>
    {screens.map((screen, idx) => (
      <BottomNav.Screen {...screen} key={idx} />
    ))}
  </BottomNav.Navigator>
);

export default function Main() {
  return (
    <>
      <Stack.Navigator {...navigatorProps}>
        <Stack.Screen
          name="Detailed Attendance"
          component={DetailedAttendance}
          options={({ route }) => ({
            title: route.params ? route.params.subject : route.name,
          })}
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
