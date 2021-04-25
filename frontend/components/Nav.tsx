//No longer in use
//Staged for deletion
//Bottom Nav now in Navigators
import React from "react";
import { Button, Colors } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import { SCREENS as screens } from "../constants/Screens";

export default function Nav({ navigation }: any) {
  const pressHandler = (screen: string) => {
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
