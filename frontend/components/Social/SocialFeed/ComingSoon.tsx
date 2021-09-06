import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Caption,
  Colors,
  Dialog,
  Headline,
  Paragraph,
  Portal,
} from "react-native-paper";

import {
  AttendanceStoreContext,
  MarksStoreContext,
  TimeTableStoreContext,
} from "../../../mobx/contexts";
import { signOut } from "../../Authentication/utils";

export default function Social(): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const attendanceStore = React.useContext(AttendanceStoreContext);
  const timetableStore = React.useContext(TimeTableStoreContext);
  const marksStore = React.useContext(MarksStoreContext);

  const [visible, setVisible] = React.useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const clearData = async (): Promise<void> => {
    try {
      signOut(attendanceStore, timetableStore, marksStore);
      navigation.replace("Sign In");
    } catch (e) {
      console.warn(e);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <SafeAreaView>
        <View>
          <Appbar.Header style={styles.header}>
            <Appbar.Action
              icon="brightness-4"
              onPress={() => setVisible(true)}
            />
            <Appbar.Content titleStyle={styles.appbar} title={" Social "} />
            <Appbar.Action icon="exit-to-app" onPress={clearData} />
          </Appbar.Header>

          <View style={styles.container}>
            <View style={styles.noPostView}>
              <Avatar.Icon style={{marginBottom: 3}} size={28} icon={"code-tags"} />
              <Headline style={styles.coming}>Coming Soon</Headline>
              <Caption>Ruko zara, sabar karo!</Caption>
            </View>
          </View>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Content>
              <Image
                source={require("../../../assets/DarkThemeMeme.jpg")}
                style={{ width: "100%", height: 230 }}
              ></Image>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "11%",
    // height:"100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coming: {
    fontWeight: "bold",
    color: "rgb(10, 132, 255)",
    fontSize: 27,
  },
  appbar: {
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
    fontSize: 25,
  },
  header: {
    backgroundColor: "#000",
  },
  noPostView: {
    marginTop: "50%",
    alignItems: "center",
  },
});
