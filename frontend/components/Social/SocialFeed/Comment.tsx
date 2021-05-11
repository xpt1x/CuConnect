import React from "react";
import { Avatar, Card, Title, Paragraph , Colors, Text } from "react-native-paper";
import {CommentType} from "../../../types/PostTypes";

interface CommentProp {
  comment : CommentType,
  post_id : Number
}

export default function Comment({
  comment,
  post_id
} : CommentProp) {
  const LeftContent = (props: { size: number }) => (
    <Avatar.Icon {...props} size={36} icon="account" />
  );
  return (
    <Card style={{ backgroundColor: "black" }}>
      <Card.Title
        titleStyle={{ fontSize: 14 , color: Colors.blueGrey200 }}
        subtitleNumberOfLines={10}
        subtitleStyle={{color : Colors.grey200}}
        title={comment.author_data.display_name}
        left={LeftContent}
        subtitle={comment.msg}
      />
    </Card>
  );
}
