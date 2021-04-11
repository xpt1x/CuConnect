import React from "react";
import DetailedAttendance from "../pims/Attendance/DetailedAttendance/DetailedAttendance";
import DetailedMarks from "../pims/MarksView/DetailedMarks";
import { IconButton } from "react-native-paper";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Text } from "react-native-paper";
import { SwipeableBottomNav } from "./SwipeableBottomNav";
import UserProfile from "../Social/Profile/UserProfile";
import LoginPims from "../Authentication/LoginPims";
import SettingsMenu from "../Social/Profile/SettingsMenu";

const Stack = createStackNavigator();
const navigatorProps: StackNavigationProp = {
  initialRouteName: "Sign In",
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
      horizontal: 120,
    },
  },
};

function DetailedMarksRightAccessory(code: string) {
  return <Text style={{ padding: 24 }}>{code}</Text>;
}

function UserProfileRightAccessory() {
  return <IconButton icon="cog" style={{ marginRight: 25 }} />;
}

export default function StackNav() {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen
        name="Detailed Attendance"
        component={DetailedAttendance}
        options={({ route }: any) => ({
          title: route.params ? route.params.subject.Title : route.name,
        })}
      />
      <Stack.Screen
        name="Detailed Marks"
        component={DetailedMarks}
        options={({ route }: any) => ({
          title: "",
          headerRight: () =>
            DetailedMarksRightAccessory(
              route.params ? route.params.subjectCode : route.name
            ),
        })}
      />
      <Stack.Screen
        name="Nav"
        component={SwipeableBottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={({ route }: any) => ({
          title: "",
          headerRight: () => UserProfileRightAccessory(),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign In"
        component={LoginPims}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
