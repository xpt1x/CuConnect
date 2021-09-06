import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Caption,
  Colors,
  Divider,
  Headline,
  IconButton,
  Subheading,
} from "react-native-paper";

interface Props {
  message: string;
  captionPrimary?: string;
  captionSecondary?: string;
}

export default function ErrorScreen({
  message,
  captionPrimary,
  captionSecondary,
}: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <IconButton icon="close-network" color={Colors.red400} size={70} />
      <Subheading>{message}</Subheading>
      <Caption>{captionPrimary || "Visit UIMS to resolve the problem"}</Caption>
      <Divider />
      <Caption>{captionSecondary || "Pull down to refresh"}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
