import { useNavigation } from "@react-navigation/core";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { IconButton } from "react-native-paper";
import { Text } from "react-native-paper";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

import LoginPims from "../Authentication/LoginPims";
import SignUp from "../Authentication/SignUp";
import DetailedAttendance from "../pims/Attendance/DetailedAttendance/DetailedAttendance";
import DetailedMarks from "../pims/MarksView/DetailedMarks";
import Camera from "../Social/Camera/Camera";
import SettingsMenu from "../Social/Profile/SettingsMenu";
import UserProfile from "../Social/Profile/UserProfile";
import CommentList from "../Social/SocialFeed/CommentList";
import { SwipeableBottomNav } from "./SwipeableBottomNav";

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
    headerBackImage: function hbi () {return (<IconButton icon="chevron-left" size={30} />)},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    gestureResponseDistance: {
      horizontal: 120,
    },
  },
};

function DetailedMarksRightAccessory(code: string, props : any) : React.ReactElement {
  return <Text style={{ padding: 24 }} {...props}>{code}</Text>;
}

function UserProfileRightAccessory(): React.ReactElement {
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

export default function StackNav() : React.ReactElement {
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
          headerRight: (props) =>
            DetailedMarksRightAccessory(
              route.params ? route.params.subjectCode : route.name, props
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
      <Stack.Screen
        name="Comments"
        component={CommentList}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
        }}
      />
    </Stack.Navigator>
  );
}
