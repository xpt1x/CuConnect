import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";

import { savePost } from "../../../ApiLayer/Api";
import readCreds from "../../../utils/readCreds";

interface ImagePreviewProps {
  uri: string;
  setUri: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function ImagePreview({
  uri,
  setUri,
}: ImagePreviewProps): React.ReactElement {
  const [caption, setCaption] = React.useState("");
  const [sendButtonDisabled, setSendButtonDisabled] =
    React.useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  function showAlert(): void {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to go back? All your changes will be lost",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Discard", onPress: () => setUri(undefined) },
      ]
    );
  }

  React.useEffect(() => {
    const backAction = (): boolean => {
      showAlert();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function closeAction(): void {
    showAlert();
  }

  async function sendAction(): Promise<void> {
    setSendButtonDisabled(true);
    const { creds } = await readCreds();
    if (creds) {
      const localUri = uri;
      const filename = localUri.split("/").pop();

      // Infer the type of the image
      if (filename) {
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const response = await savePost(
          creds.uid,
          { uri: localUri, type: type, name: filename },
          caption
        );
        if (response) {
          navigation.popToTop();
        } else {
          setSendButtonDisabled(false);
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon={"chevron-left"}
        size={27}
        onPress={closeAction}
        style={styles.back}
      />
      <Image
        source={{ uri: uri }}
        style={styles.imagePreview}
        resizeMode={"contain"}
      />
      <View style={styles.captionAndSend}>
        <TextInput
          style={styles.textInput}
          value={caption}
          multiline={true}
          onChangeText={(caption) => setCaption(caption)}
        />
        <IconButton
          disabled={sendButtonDisabled}
          icon={"send"}
          size={32}
          onPress={sendAction}
          style={styles.send}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    marginTop: "2%",
    width: "100%",
    height: "89%",
  },
  captionAndSend: {
    alignSelf: "center",
    paddingHorizontal: 18,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  back: {
    position: "absolute",
    left: 10,
    top: 30,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  send: {
    position: "absolute",
    right: 0,
    zIndex: 30,
    marginRight: 16,
    transform: [{ rotateZ: "-36deg" }],
  },
  textInput: { width: "100%", zIndex: 20 },
});
