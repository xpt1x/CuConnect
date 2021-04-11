import React from "react";
import { StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";

interface SocialCardProps {
  tripleDotAction: () => void;
}

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function SocialCard({ tripleDotAction }: SocialCardProps) {
  const LeftContent = (props: { size: number }) => (
    <Avatar.Icon {...props} icon="account" />
  );
  const RightContent = (props: { size: number }) => (
    <IconButton
      color={"#757676"}
      icon="dots-vertical"
      onPress={() => {
        tripleDotAction();
      }}
      style={{ marginRight: 10 }}
    />
  );

  const [liked, setLiked] = React.useState(false);

  const [imgUri, setImgUri] = React.useState(
    `https://picsum.photos/${getRandom(4, 10) * 100}/${getRandom(3, 10) * 100}`
  );
  const toggleLike = () => {
    setLiked(!liked);
  };

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
      {/* content : date and time and caption */}
      <Card.Title
        title="Vtrix"
        subtitle="Google Placement programm @ block 6 on 25th of september"
        left={LeftContent}
        right={RightContent}
      />

      <Card.Cover
        resizeMode="center"
        style={{ height: 450, width: "100%" }}
        // style={{ height: imgDimensions.height, width: "100%" }}
        source={{ uri: imgUri }}
      />
      <Card.Actions>
        <IconButton
          color={liked ? "#f27d0c" : "#757676"}
          style={styles.button}
          icon={"fire"}
          size={30}
          onPress={() => {
            toggleLike();
          }}
        />
        <IconButton
          color={"#757676"}
          style={styles.button}
          icon={"comment"}
          onPress={() => {}}
        />
      </Card.Actions>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 0,
    backgroundColor: "#000",
  },
  button: {
    width: 50,
  },
});
