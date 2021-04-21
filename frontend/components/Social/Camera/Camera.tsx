import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";

export default function SocialCamera() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = React.useState<Camera | null>(null);
  let takePicture = async () => {
    const img = await camera?.takePictureAsync({ exif: true });
    console.log(img);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio="16:9"
        ref={(ref) => {
          setCamera(ref);
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
        <Button onPress={takePicture}>Click</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  camera: { height: "85%", width: "100%" },
  buttonContainer: { flex: 1 },
  button: { width: 30, height: 30, color: "white" },
  text: {},
});
