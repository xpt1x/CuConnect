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
import Camera from "../Social/Camera/Camera";
import { useNavigation } from "@react-navigation/core";
import SignUp from "../Authentication/SignUp";

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
  const navigation = useNavigation();
  return (
    <IconButton
      icon="cog"
      onPress={() => {
        navigation.navigate("Settings");
      }}
      style={{ marginRight: 25 }}
    />
  );
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
        name="Home"
        component={SwipeableBottomNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="User Profile"
        component={UserProfile}
        options={() => ({
          title: "",
          headerRight: () => UserProfileRightAccessory(),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsMenu}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign In"
        component={LoginPims}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
        }}
      />
    </Stack.Navigator>
  );
}
