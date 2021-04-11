import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { List } from "react-native-paper";
export default function SettingsMenu() {
  return (
    <ScrollView>
      <List.Item
        title="First Item"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="settings" />}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="settings" />}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="settings" />}
      />
    </ScrollView>
  );
}
