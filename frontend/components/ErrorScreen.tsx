import {
  IconButton,
  Colors,
  Caption,
  Headline,
  Subheading,
  Button,
  Divider,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import React from "react";

interface Props {
  message: string;
}

export default function ErrorScreen({ message }: Props) {
  return (
    <View style={styles.container}>
      <IconButton icon="close-network" color={Colors.red400} size={70} />
      <Subheading>{message}</Subheading>
      {message !== "Waiting...." ? (
        <>
          <Caption>Visit UIMS to resolve the problem</Caption>
          <Divider />
          <Caption>Pull down to refresh</Caption>
        </>
      ) : null}
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
