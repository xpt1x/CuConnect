import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import React from "react";
import { Linking, View } from "react-native";
import {
  Avatar,
  Button,
  Caption,
  Headline,
  ProgressBar,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

import { getFullName } from "../../ApiLayer/Api";
import readCreds from "../../utils/readCreds";
import { signOut } from "./utils";

export default function LoginPims(): React.ReactElement {
  const [uid, setUid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [validating, setValidating] = React.useState<boolean>(false);
  const [credsFound, setCredsFound] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>("");

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const showMessage = (message: string): void => {
    setMessage(message);
    setVisible(true);
  };

  const recordCreds = async (uid: string, password: string): Promise<void> => {
    try {
      AsyncStorage.setItem("uid", uid);
      AsyncStorage.setItem("password", password);
    } catch (e) {
      console.warn("Error setting creds RecordCreds(LoginPims)");
    }
  };

  const validate = async (): Promise<void> => {
    setValidating(true);
    try {
      const { exists, full_name, error } = await getFullName(uid, password);
      setValidating(false);
      if (error) {
        showMessage(error);
      } else {
        if (full_name) await recordCreds(uid, password);
        return exists && full_name
          ? navigation.replace("Home")
          : navigation.replace("Sign Up", { fullName: full_name });
      }
    } catch (e) {
      console.warn("Something went wrong in checkingUser (LoginPims)");
    }
  };

  const checkCredsInStorage = async (): Promise<void> => {
    const { creds } = await readCreds();
    if (creds) {
      const { full_name, exists } = await getFullName(
        creds.uid,
        creds.password
      );
      if (full_name && exists) return navigation.replace("Home");
      else if (full_name && !exists) {
        // Send to new user flow
        return navigation.replace("Sign Up", { fullName: full_name });
      } else {
        // API return invalid, remove local creds, show sign in screen
        setCredsFound(false);
        await signOut();
        showMessage("Looks like your password is changed, please SignIn again");
      }
    } else {
      setCredsFound(false);
    }
  };

  const openLink = (): void => {
    Linking.openURL("https://github.com/Shreyans13/Xenial-Xerus");
  };

  React.useEffect(() => {
    checkCredsInStorage();
  }, []);

  return (
    <View
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
          <Avatar.Icon
            size={50}
            icon="shield-account"
            style={{ alignSelf: "center", marginBottom: 24, marginTop: "auto" }}
          />

          <TextInput
            style={{ marginVertical: 6 }}
            mode={"outlined"}
            label="UID"
            value={uid}
            onChangeText={(uid) => setUid(uid)}
          />
          <TextInput
            style={{ marginVertical: 6 }}
            mode={"outlined"}
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            returnKeyType={"done"}
          />
          <Button
            style={{ marginVertical: 12 }}
            icon={"key"}
            loading={validating ? true : false}
            mode="contained"
            disabled={uid.length < 1}
            onPress={validating ? undefined : validate}
          >
            Login
          </Button>
          <Button
            style={{ marginTop: "auto" }}
            icon={"github"}
            onPress={openLink}
          >
            Checkout CuConnect
          </Button>
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
    </View>
  );
}
