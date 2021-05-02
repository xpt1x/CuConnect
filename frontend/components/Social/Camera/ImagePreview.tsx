import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

export default function ImagePreview({ uri, setUri }: any) {
  function closeAction() {
    setUri(undefined);
  }
  return (
    <View style={styles.container}>
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
      <View></View>
      <IconButton
        icon={"send"}
        size={40}
        onPress={closeAction}
        style={styles.send}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
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
    right: 10,
    bottom: 20,
    zIndex: 10,
    transform: [{ rotateZ: "-36deg" }],
  },
});
