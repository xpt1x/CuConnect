import React from "react";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";

export default function Comment() {
  const LeftContent = (props: { size: number }) => (
    <Avatar.Icon {...props} icon="folder" />
  );
  return (
    <Card>
      <Card.Title title="Card Title" left={LeftContent} />
      <Card.Content>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
  );
}
