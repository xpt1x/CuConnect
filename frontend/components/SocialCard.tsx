import React from "react";
import { StyleSheet, Image } from "react-native";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";

const LeftContent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="folder" />
);
const RightContent = (props: { size: number }) => (
  <IconButton
    color={"#757676"}
    icon="dots-vertical"
    onPress={() => {}}
    style={{ marginRight: 10 }}
  />
);

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function SocialCard() {
  const [liked, setLiked] = React.useState(false);
  const [imgDimensions, setImgDimensions] = React.useState({
    height: 0,
    width: 0,
  });
  const [imgWidth, setImgWidth] = React.useState(0);
  const tempUri = `https://picsum.photos/${getRandom(1, 10) * 100}/${
    getRandom(2, 6) * 100
  }`;
  React.useEffect(() => {
    Image.getSize(
      tempUri,
      (width, height) => {
        const finalHeight = height > 450 ? 450 : height;
        setImgDimensions({ height: finalHeight, width });
      },
      (error) => {
        return error;
      }
    );
  }, []);

  const toggleLike = () => setLiked(!liked);

  let lastTap: number | null = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike();
    } else {
      lastTap = now;
    }
  };
  return (
    <Card
      style={styles.card}
      onPress={() => {
        handleDoubleTap();
      }}
    >
      <Card.Title
        title="Title"
        subtitle="Card Subtitle"
        left={LeftContent}
        right={RightContent}
      />

      <Card.Cover
        style={{ height: imgDimensions.height, width: "100%" }}
        source={{ uri: tempUri }}
      />
      <Card.Actions>
        <IconButton
          color={liked ? "#f27d0c" : "#757676"}
          style={styles.button}
          icon="fire"
          onPress={() => {
            toggleLike();
          }}
        />
        <IconButton
          color={"#757676"}
          style={styles.button}
          icon="comment"
          onPress={() => {}}
        />
      </Card.Actions>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  button: {
    width: 50,
  },
});
