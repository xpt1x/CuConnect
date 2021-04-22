import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import {
  Colors,
  Button,
  TextInput,
  Snackbar,
  ProgressBar,
  Headline,
  Caption,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateUser } from "../../ApiLayer/Api";

enum Message {
  CANT_VALIDATE = "Can't validate, visit UIMS to resolve",
  PASSWORD_CHANGED = "Looks like your password is changed, please SignIn again",
}

export default function LoginPims({ navigation, route }: any) {
  const [uid, setUid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [validating, setValidating] = React.useState<boolean>(false);
  const [credsFound, setCredsFound] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<Message>(Message.CANT_VALIDATE);

  const showMessage = (message: Message) => {
    setMessage(message);
    setVisible(true);
  };

  const recordCreds = async () => {
    setValidating(true);
    try {
      const valid = await validateUser(uid, password);
      if (valid) {
        await AsyncStorage.setItem("uid", uid);
        await AsyncStorage.setItem("password", password);
        console.log(`Creds stored! Uid:${uid} Password:${password}`);

        navigation.replace("Nav");
      } else {
        showMessage(Message.CANT_VALIDATE);
      }
    } catch (e) {
      console.log("Something went wrong in recordCreds(LoginPims)");
    }
    setValidating(false);
  };

  const checkCredsInStorage = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const password = await AsyncStorage.getItem("password");
      if (uid !== null && password !== null) {
        const valid = await validateUser(uid, password);
        if (valid) return navigation.replace("Nav");
        else {
          // API return invalid, remove local creds, show sign in screen
          setCredsFound(false);
          await AsyncStorage.removeItem("uid");
          await AsyncStorage.removeItem("password");
          showMessage(Message.PASSWORD_CHANGED);
        }
      } else {
        setCredsFound(false);
      }
    } catch (e) {
      setCredsFound(false);
      console.log(e);
    }
  };

  React.useEffect(() => {
    checkCredsInStorage();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 12,
      }}
    >
      {credsFound ? (
        <>
          <Headline>Validating...</Headline>
          <Caption>Handshaking with CUIMS</Caption>
          <ProgressBar style={{ marginTop: 4 }} indeterminate={true} />
        </>
      ) : (
        <>
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
            secureTextEntry={true}
            returnKeyType={"done"}
          />
          {validating ? (
            <ProgressBar style={{ marginTop: 30 }} indeterminate={true} />
          ) : (
            <Button
              style={{ marginVertical: 12 }}
              icon={"key"}
              mode="contained"
              onPress={recordCreds}
            >
              Login
            </Button>
          )}
        </>
      )}

      <Snackbar
        visible={visible}
        style={{ width: "100%" }}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Ok",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        {message}
      </Snackbar>
    </SafeAreaView>
  );
}
