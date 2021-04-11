import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Colors, Button, TextInput } from "react-native-paper";
import { SessionStoreContext } from "../../mobx/contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPims({ navigation }: any) {
  const [uid, setUid] = React.useState("");
  const [password, setPassword] = React.useState("");

  const recordCreds = async () => {
    try {
      await AsyncStorage.setItem("uid", uid);
      await AsyncStorage.setItem("password", password);
    } catch (e) {
      console.log("Creds saving error");
    }
    console.log(`Creds stored! Uid:${uid} Password:${password}`);
    navigation.push("Nav");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <TextInput
        style={{ marginVertical: 6 }}
        selectionColor={Colors.green200}
        mode={"outlined"}
        label="UID"
        value={uid}
        onChangeText={(uid) => setUid(uid)}
      />
      <TextInput
        style={{ marginVertical: 6 }}
        selectionColor={Colors.green200}
        mode={"outlined"}
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        // secureTextEntry={true}
      />
      <Button
        style={{ marginVertical: 12 }}
        icon="key"
        mode="contained"
        onPress={recordCreds}
      >
        Login
      </Button>
    </SafeAreaView>
  );
}
