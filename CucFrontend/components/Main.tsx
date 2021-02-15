import React from "react";
import Nav from "./Nav";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants/Screens";

const Stack = createStackNavigator();
export default function main() {
  const screens = [...SCREENS, { name: "Nav", component: Nav }];
  return (
    <Stack.Navigator initialRouteName="Nav" headerMode="none">
      {screens.map((screen, idx) => (
        <Stack.Screen {...screen} key={idx} />
      ))}
    </Stack.Navigator>
  );
}
