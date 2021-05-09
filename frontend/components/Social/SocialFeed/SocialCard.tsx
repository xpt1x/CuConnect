import React from "react";
import { StyleSheet, View, Animated, Image, Dimensions } from "react-native";
import { Avatar, Card, IconButton, Paragraph } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";
import { Post } from "../../../types/PostTypes";

import { PinchGestureHandler, State, PinchGestureHandlerGestureEvent, PinchGestureHandlerStateChangeEvent} from "react-native-gesture-handler";

interface SocialCardProps {
  tripleDotAction: () => void;
  navigation: NavigationStackProp;
  post: Post;
}

// interface Props {
//   navigation: NavigationStackProp;
// }

//navigation for comments to be done
export default function SocialCard({
  tripleDotAction,
  navigation,
  post,
}: SocialCardProps) {
  const [liked, setLiked] = React.useState(false);
  const [imageHeight, setImageHeight] = React.useState(250);

  const fireBadgeAnimation = React.useRef(new Animated.Value(0)).current;
  const fireOverlayAnimation = React.useRef(new Animated.Value(0)).current;

  const fireBadgeFadeIn = () => {
    Animated.timing(fireBadgeAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fireBadgeFadeOut = () => {
    Animated.timing(fireBadgeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fireOverlayFadeInOut = () => {
    Animated.sequence([
      Animated.timing(fireOverlayAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(280),
      Animated.timing(fireOverlayAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const toggleLike = () => {
    setLiked(!liked);
  };

  const getImageHeight = () => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    Image.getSize(
      post.image,
      (width, height) => {
        width / height < 4 / 5
          ? setImageHeight(450)
          : windowWidth * (height / width) < 120
          ? 120
          : setImageHeight(windowWidth * (height / width));
      },
      (error) => {
        console.log(error);
      }
    );
  };
  //Display fire logo useEffect

  React.useEffect(() => {
    getImageHeight();
  });

  React.useEffect(() => {
    if (liked) {
      fireBadgeFadeIn();
      fireOverlayFadeInOut();
    } else fireBadgeFadeOut();
  }, [liked]);

  const LeftContent = (props: { size: number }) => (
    <View style={{ position: "relative" }}>
      <Avatar.Icon {...props} icon="account" />
      <Animated.View
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          opacity: fireBadgeAnimation,
        }}
      >
        <IconButton icon="fire" size={25} color={"#f27d0c"} />
      </Animated.View>
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
  let _scale = new Animated.Value(1);
  let _translateX = new Animated.Value(0);
  let _translateY = new Animated.Value(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike();
    } else {
      lastTap = now;
    }
  };

  const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
    const windowWidth = Dimensions.get("window").width;
    _scale.setValue(event.nativeEvent.scale)
    _translateX.setValue(event.nativeEvent.focalX - (windowWidth/2))
    _translateY.setValue(event.nativeEvent.focalY - (imageHeight/2))
  };
  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    //end
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(_scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.spring(_translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.spring(_translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
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
        title={post.author_data.display_name}
        subtitle={post.likes}
        left={LeftContent}
        right={RightContent}
      />
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <View style={{ position: "relative" }} collapsable={false}>
          {/* <Card.Cover
          resizeMode="cover"
          style={{ height:imageHeight , width: "100%" }}
          // style={{ aspectRatio: imageWidth/imageHeight }}
          source={{ uri: post.image }}
        /> */}
          <Animated.Image
            resizeMode="cover"
            style={{
              height: imageHeight,
              width: "100%",
              transform: [{ perspective: 5000 }, { scale: _scale }, { translateX: _translateX  }, {translateY: _translateY}],
            }}
            source={{ uri: post.image }}
          />

          <Animated.View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: fireOverlayAnimation,
            }}
          >
            <IconButton
              icon="fire"
              size={150}
              color={"rgba(242, 125, 12, 0.9)"}
            />
          </Animated.View>
        </View>
      </PinchGestureHandler>

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
          {post.title}
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
