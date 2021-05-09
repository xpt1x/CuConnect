import React from "react";
import { View } from "react-native";
import { Caption, Headline, ProgressBar } from "react-native-paper";

interface LoaderProps {
  heading?: string;
  caption?: string;
}

export default function Loader({ heading, caption }: LoaderProps) {
  return (
    <View
      style={{
        padding: 12,
        marginTop: "80%",
      }}
    >
      <Headline>{heading || "Loading..."}</Headline>
      <Caption>{caption}</Caption>
      <ProgressBar style={{ marginTop: 4 }} indeterminate={true} />
    </View>
  );
}
