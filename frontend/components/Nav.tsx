// No longer in use
// Staged for deletion
// Bottom Nav now in Navigators
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Colors } from "react-native-paper";

import { SCREENS as screens } from "../constants/Screens";

export default function Nav(): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const pressHandler = (screen: string): void => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {screens.map((screen) => (
        <Button
          key={screen.name}
          onPress={() => pressHandler(screen.name)}
          style={styles.button}
          color={Colors.blue500}
        >
          {screen.name}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "60%",
    alignSelf: "center",
    marginTop: 20,
  },
});
