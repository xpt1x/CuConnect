import React from "react";
import Nav from "./Nav";
import BottomNav from "./BottomNav";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants/Screens";

const Stack = createStackNavigator();
export default function main() {
  const screens = [...SCREENS, { name: "BottomNav", component: BottomNav }];
  return (
    <Stack.Navigator initialRouteName="BottomNav" headerMode="none">
      {screens.map((screen, idx) => (
        <Stack.Screen {...screen} key={idx} />
      ))}
    </Stack.Navigator>
  );
}
