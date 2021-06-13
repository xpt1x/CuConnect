import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import { SCREENS as screens } from "../../constants/Screens";

const styles = StyleSheet.create({
  tabStyle: {
    height: 55,
    backgroundColor: "#000000",
  },
});
const BottomNav = createMaterialTopTabNavigator();
export function SwipeableBottomNav(): React.ReactElement {
  return (
    <BottomNav.Navigator
      initialRouteName="Attendance"
      backBehavior="initialRoute"
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        tabStyle: styles.tabStyle,
      }}
    >
      {screens.map((screen, idx) => (
        <BottomNav.Screen {...screen} key={idx} />
      ))}
    </BottomNav.Navigator>
  );
}
