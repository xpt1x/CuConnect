import React from "react";
import { SafeAreaView } from "react-native";
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
import { getFullName } from "../../ApiLayer/Api";
import { signOut } from "./utils";
import readCreds from "../../utils/readCreds";
export default function LoginPims({ navigation, route }: any) {
  const [uid, setUid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [validating, setValidating] = React.useState<boolean>(false);
  const [credsFound, setCredsFound] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>("");

  const showMessage = (message: string) => {
    setMessage(message);
    setVisible(true);
  };

  const recordCreds = async (uid: string, password: string) => {
    try {
      AsyncStorage.setItem("uid", uid);
      AsyncStorage.setItem("password", password);
    } catch (e) {
      console.log("Error setting creds RecordCreds(LoginPims)");
    }
  };

  const validate = async () => {
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
      console.log("Something went wrong in checkingUser (LoginPims)");
    }
  };

  const checkCredsInStorage = async () => {
    const {creds} = await readCreds();
    if (creds) {
      const { full_name, exists } = await getFullName(creds.uid, creds.password);
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
