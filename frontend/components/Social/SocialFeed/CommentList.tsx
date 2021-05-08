import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Comment from "./Comment";

export default function CommentList() {
  return (
    <View>
      <Comment />
      <Comment />
      <Comment />
    </View>
  );
}

const styles = StyleSheet.create({});
