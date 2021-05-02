import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function CommentLiist() {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <View>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
