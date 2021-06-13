import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Caption, Headline, ProgressBar } from "react-native-paper";

interface LoaderProps {
  style?: StyleProp<ViewStyle>;
  heading?: string;
  caption?: string;
}

export default function Loader({
  heading,
  caption,
  style,
}: LoaderProps): React.ReactElement {
  return (
    <View
      style={
        style
          ? style
          : {
              padding: 12,
              marginTop: "80%",
            }
      }
    >
      <Headline>{heading || "Loading..."}</Headline>
      <Caption>{caption}</Caption>
      <ProgressBar style={{ marginTop: 4 }} indeterminate={true} />
    </View>
  );
}
