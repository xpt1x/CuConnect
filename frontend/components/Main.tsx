import React from "react";
import DetailedAttendance from "./DetailedAttendance";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SCREENS as screens } from "../constants/Screens";
import { IconButton } from "react-native-paper";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { Animated } from "react-native";
import {
  createStackNavigator,
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

// const horizontalAnimation = ({
//   current,
//   layouts,
//   inverted,
// }: StackCardInterpolationProps): StackCardInterpolatedStyle => {
//   const translateFocused = Animated.multiply(
//     current.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [layouts.screen.width, 0],
//       extrapolate: "clamp",
//     }),
//     inverted
//   );

//   const overlayOpacity = current.progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 0.07],
//     extrapolate: "clamp",
//   });

//   const shadowOpacity = current.progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 0.3],
//     extrapolate: "clamp",
//   });

//   return {
//     cardStyle: {
//       transform: [{ translateX: translateFocused }, { translateX: 0 }],
//     },
//     overlayStyle: { opacity: overlayOpacity },
//     shadowStyle: { shadowOpacity },
//   };
// };

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
      horizontal: 400,
    },
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
          options={({ route }) => ({
            title: route.params.headerName,
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
