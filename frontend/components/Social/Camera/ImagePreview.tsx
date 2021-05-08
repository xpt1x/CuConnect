import React from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

export default function ImagePreview({ uri, setUri }: any) {
  const [caption, setCaption] = React.useState("");
  function closeAction() {
    setUri(undefined);
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
          style={{ width: "100%", zIndex: 20 }}
          value={caption}
          multiline={true}
          onChangeText={(caption) => setCaption(caption)}
        />
        <IconButton
          icon={"send"}
          size={32}
          onPress={closeAction}
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
});
