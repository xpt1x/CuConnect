import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Card, IconButton, Paragraph } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

interface SocialCardProps {
  tripleDotAction: () => void;
  navigation: NavigationStackProp;
}

// interface Props {
//   navigation: NavigationStackProp;
// }
function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
//navigation for comments to be done
export default function SocialCard({
  tripleDotAction,
  navigation,
}: SocialCardProps) {
  const [liked, setLiked] = React.useState(false);
  const [imgUri, setImgUri] = React.useState(
    `https://picsum.photos/${getRandom(4, 10) * 100}/${getRandom(3, 10) * 100}`
  );
  const toggleLike = () => {
    setLiked(!liked);
  };
  const LeftContent = (props: { size: number }) => (
    <View style={{ position: "relative" }}>
      <Avatar.Icon {...props} icon="account" />
      <IconButton
        icon="fire"
        size={25}
        color={"#f27d0c"}
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          opacity: liked ? 1 : 0,
        }}
      />
    </View>
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
      <Card.Title title="Vtrix" left={LeftContent} right={RightContent} />

      <Card.Cover
        resizeMode="center"
        style={{ height: 450, width: "100%" }}
        // style={{ height: imgDimensions.height, width: "100%" }}
        source={{ uri: imgUri }}
      />

      {/* <Card.Actions>
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
          onPress={() => {
            navigation.push("Comments");
          }}
        />
      </Card.Actions> */}
      <Card.Content>
        <Paragraph
          style={{ fontSize: 13, marginTop: 13, textAlign: "justify" }}
        >
          Google Placement program @ block 6 on 25th of september
        </Paragraph>
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 0,
    backgroundColor: "#000",
  },
  button: {
    width: 35,
  },
});
