import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button, Colors, Snackbar, TextInput } from "react-native-paper";

import { registerUser } from "../../ApiLayer/Api";

interface SignUpProps {
  route: RouteProp<
    {
      params: {
        fullName: string;
      };
    },
    "params"
  >;
}

export default function SignUp({ route }: SignUpProps): React.ReactElement {
  const { fullName }: any = route.params;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState(fullName);
  const [validating, setValidating] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>();

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const checkName = async (): Promise<void> => {
    if (
      userName
        .toLowerCase()
        .split(" ")
        .filter((ele: string) => {
          if (fullName.toLowerCase().split(" ").indexOf(ele) == -1) return ele;
        }).length == 0
    ) {
      setValidating(true);
      const { error, success } = await registerUser(userName);
      setValidating(false);
      if (error) {
        setVisible(true);
        setMessage(error);
      } else if (success) {
        navigation.replace("Home");
      }
    } else {
      setMessage(
        "UserName you entered doesn't contain combination of your full name"
      );
      setVisible(true);
    }
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
        textAlign
        style={{ marginVertical: 6 }}
        label="Select from these words."
        disabled={true}
        value={fullName}
      />
      <TextInput
        textAlign
        style={{ marginVertical: 6 }}
        selectionColor={Colors.green200}
        mode={"outlined"}
        label="User Name"
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
      />
      <Button
        style={{ marginVertical: 12 }}
        icon={"account-check"}
        loading={validating ? true : false}
        mode="contained"
        disabled={userName.length < 1}
        onPress={validating ? undefined : checkName}
      >
        Sign Up
      </Button>
      <View style={{ width: "100%" }}>
        <Text style={{ color: Colors.grey500, textAlign: "center" }}>
          Please Create a User Name using the combination of words provided
          above.
        </Text>
      </View>
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
