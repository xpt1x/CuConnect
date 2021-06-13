import { RouteProp } from "@react-navigation/core";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text,TextInput } from "react-native-paper";

import { CommentType } from "../../../types/PostTypes";
import Comment from "./Comment";

interface CommentListProps {
  route: RouteProp<
    {
      params: {
        comments: ReadonlyArray<CommentType>;
        post_id: number;
      };
    },
    "params"
  >;
}

export default function CommentList({
  route,
}: CommentListProps): React.ReactElement {
  // const {comments} = route.params;
  const [newComment, setNewComment] = React.useState("");
  // console.log(route.params.comments);
  return (
    <>
      <ScrollView style={{ flex: 1, height: "87%" }}>
        {route.params && route.params.comments
          ? route.params.comments.map((comment: any) => (
              <Comment
                comment={comment}
                post_id={route.params.post_id}
                key={comment.id}
              />
            ))
          : null}
      </ScrollView>
      <View style={{ height: "12%" }}>
        <TextInput
          mode={"outlined"}
          autoFocus={true}
          style={styles.textInput}
          value={newComment}
          multiline={true}
          onChangeText={(newComment) => setNewComment(newComment)}
        />
        <IconButton
          icon={"send"}
          size={32}
          onPress={() => {}}
          style={styles.send}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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

  send: {
    position: "absolute",
    right: 0,
    zIndex: 30,
    marginRight: 16,
    transform: [{ rotateZ: "-36deg" }],
  },
  textInput: { alignSelf: "center", width: "95%", zIndex: 20 },
});
