import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { IconButton, Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const PostSelector = ({
  type,
  flashMode,
  setCamera,
  pickImage,
  takePicture,
  setType,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        flashMode={flashMode}
        type={type}
        ratio="16:9"
        ref={(ref) => {
          setCamera(ref);
        }}
      />
      {/* <IconButton
      icon={flashIcon}
      color={Colors.grey100}
      size={30}
      style={styles.rotateCameraButton}
      onPress={() => {
        setFlashMode(
          flashMode === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        );
        setflashIcon(
          flashIcon === "flash-outline" ? "flash" : "flash-outline"
        );
      }}
    /> */}
      <View style={styles.buttonContainer}>
        <IconButton
          icon="image-plus"
          color={Colors.grey200}
          size={30}
          onPress={pickImage}
        />
        <IconButton
          icon="circle"
          color={Colors.grey200}
          size={55}
          style={styles.captureButton}
          onPress={takePicture}
        />
        <IconButton
          icon="cached"
          color={Colors.grey100}
          size={30}
          style={styles.rotateCameraButton}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default function SocialCamera() {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasLibraryPermission, setHasLibraryPermission] = useState<
    boolean | null
  >(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [flashIcon, setflashIcon] = useState("flash-outline");
  const [images, setImage] = useState<string>();

  const [camera, setCamera] = React.useState<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasLibraryPermission(status === "granted");
      }
    })();
  }, []);

  const takePicture = async () => {
    const img = await camera?.takePictureAsync({ exif: true });
    console.log(img);
  };

  const pickImage = async () => {
    if (hasLibraryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const postSelectorProps = {
    type,
    flashMode,
    setCamera,
    pickImage,
    takePicture,
    setType,
  };

  return <PostSelector {...postSelectorProps} />;
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  camera: { height: "85%", width: "100%" },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: { width: 30, height: 30, color: "white" },
  text: {},
  captureButton: {
    borderColor: "grey",
    borderRadius: 34,
    borderWidth: 2,
    width: 69,
    height: 69,
  },
  rotateCameraButton: {
    width: 60,
    height: 60,
  },
});
