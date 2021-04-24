import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Appbar, Button } from "react-native-paper";
import SocialCard from "./SocialCard";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import AppLoading from "expo-app-loading";
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp;
}

export default function Social({ navigation }: Props) {
  const refRBSheet = React.useRef<RBSheet>() as React.MutableRefObject<RBSheet>;
  const tripleDotAction = () => {
    if (refRBSheet && refRBSheet.current) return refRBSheet.current.open();
  };
  function openCamera() {
    navigation.navigate("Camera");
  }
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const goToProfile = () => {
    navigation.push("User Profile");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <SafeAreaView>
        <View>
          <Appbar.Header style={styles.header}>
            <Appbar.Action icon="plus-circle-outline" onPress={openCamera} />
            <Appbar.Content titleStyle={styles.appbar} title={" Social "} />
            <Appbar.Action
              icon="account-circle-outline"
              onPress={goToProfile}
            />
          </Appbar.Header>
          <ScrollView style={styles.container}>
            <RBSheet
              height={140}
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              closeOnPressBack={true}
              customStyles={{
                wrapper: {
                  backgroundColor: "transparent",
                },
                container: {
                  backgroundColor: "#1c1c1c",
                },
                draggableIcon: {
                  backgroundColor: "#757676",
                },
              }}
            >
              <Button mode="text" onPress={() => console.log("Pressed")}>
                View Profile
              </Button>
              <Button
                color="#fa1e0e"
                mode="text"
                onPress={() => console.log("Pressed")}
                icon="flag"
              >
                Report User
              </Button>
            </RBSheet>

            <SocialCard tripleDotAction={tripleDotAction} />
            <SocialCard tripleDotAction={tripleDotAction} />
            <SocialCard tripleDotAction={tripleDotAction} />
            <SocialCard tripleDotAction={tripleDotAction} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 80,
  },
  appbar: {
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
    fontSize: 25,
  },
  header: {
    backgroundColor: "#000",
  },
});
