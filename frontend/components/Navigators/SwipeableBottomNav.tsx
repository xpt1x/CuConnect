import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SCREENS as screens } from "../../constants/Screens";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabStyle: {
    height: 55,
    backgroundColor: "#000000",
  },
});
const BottomNav = createMaterialTopTabNavigator();
export function SwipeableBottomNav() {
  return (
    <BottomNav.Navigator
      initialRouteName="Social"
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
