import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Colors, IconButton, Text } from "react-native-paper";

import ImagePreview from "./ImagePreview";

const PostSelector = ({
  type,
  flashMode,
  setCamera,
  pickImage,
  takePicture,
  setType,
  flashIcon,
  setflashIcon,
  setFlashMode,
  cameraLoading,
}: any): React.ReactElement => {
  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon={flashIcon}
        color={Colors.grey100}
        size={30}
        style={styles.flashCameraButton}
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
      />
      <Camera
        style={styles.camera}
        flashMode={flashMode}
        type={type}
        ratio="16:9"
        ref={(ref) => {
          setCamera(ref);
        }}
      />

      <View style={styles.buttonContainer}>
        <IconButton
          icon="image-plus"
          color={Colors.grey200}
          size={30}
          onPress={pickImage}
        />
        {cameraLoading ? (
          <ActivityIndicator size={50} />
        ) : (
          <IconButton
            icon="circle"
            color={Colors.grey200}
            size={55}
            style={styles.captureButton}
            onPress={takePicture}
          />
        )}
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

export default function SocialCamera(): React.ReactElement {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasLibraryPermission, setHasLibraryPermission] = useState<
    boolean | null
  >(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [flashIcon, setflashIcon] = useState("flash-outline");
  const [image, setImage] = useState<string | undefined>(undefined);

  const [camera, setCamera] = React.useState<Camera | null>(null);
  const [cameraLoading, setCameraLoading] = React.useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasLibraryPermission(status === "granted");
      }
    })();
  }, []);

  const takePicture = async (): Promise<void> => {
    setCameraLoading(true);
    const img = await camera?.takePictureAsync();
    setImage(img?.uri);
    setCameraLoading(false);
  };

  const pickImage = async () : Promise<void>=> {
    if (hasLibraryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <View>
      <Text>No access to camera</Text>
    </View>;
  }
  const postSelectorProps = {
    type,
    flashMode,
    setCamera,
    pickImage,
    takePicture,
    setType,
    flashIcon,
    setflashIcon,
    setFlashMode,
    cameraLoading,
  };

  if (image) {
    return <ImagePreview uri={image} setUri={setImage} />;
  } else {
    return <PostSelector {...postSelectorProps} />;
  }
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
  flashCameraButton: {
    width: 60,
    height: 60,
    position: "absolute",
    marginTop: 20,
    zIndex: 100,
    right: 0,
  },
  rotateCameraButton: {
    width: 60,
    height: 60,
  },
  imagePreviewContainer: {
    flex: 1,
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  imagePreviewBack: {
    position: "absolute",
    left: 10,
    top: 30,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  imagePreviewSend: {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 10,
    transform: [{ rotateZ: "-30deg" }],
  },
});
