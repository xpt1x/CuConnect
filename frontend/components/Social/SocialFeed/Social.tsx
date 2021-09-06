import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import React from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, Caption, Headline } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

import { getPosts } from "../../../ApiLayer/Api";
import { Post } from "../../../types/PostTypes";
import SocialCard from "./SocialCard";

export default function Social(): React.ReactElement {
  const refRBSheet = React.useRef<RBSheet>() as React.MutableRefObject<RBSheet>;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const tripleDotAction = (): void => {
    if (refRBSheet && refRBSheet.current) return refRBSheet.current.open();
  };
  function openCamera(): void {
    navigation.navigate("Camera");
  }
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const goToProfile = (): void => {
    navigation.push("User Profile");
  };

  const [posts, setPosts] = React.useState<ReadonlyArray<Post>>([]);
  const [message, setMessage] = React.useState<string>("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  React.useEffect(() => {
    getPosts().then((response) => {
      setRefreshing(false);

      if (response.posts) {
        setPosts(response.posts);
      } else if (response.error) {
        console.warn(response.error);
        setMessage(response.error);
      }
    });
  }, [update]);

  const onRefreshFn = (): void => {
    setRefreshing(true);
    forceUpdate(!update);
  };
  const renderSocialCard = ({ item }: { item: Post }): React.ReactElement => {
    return (
      <SocialCard
        tripleDotAction={tripleDotAction}
        navigation={navigation}
        post={item}
      />
    );
  };

  const handlePress = (): void => {
    navigation.navigate("Camera");
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <SafeAreaView>
        <View>
          <Appbar.Header style={styles.header}>
            <Appbar.Action icon="plus-circle-outline" onPress={openCamera} />
            <Appbar.Content titleStyle={styles.appbar} title={" Social "} />
            <Appbar.Action
              icon="account-circle-outline"
              onPress={goToProfile}
            />
          </Appbar.Header>
          <RBSheet
            height={140}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnPressBack={true}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              container: {
                backgroundColor: "#1c1c1c",
              },
              draggableIcon: {
                backgroundColor: "#757676",
              },
            }}
          >
            <Button mode="text" onPress={() => console.warn("Pressed")}>
              View Profile
            </Button>
            <Button
              color="#fa1e0e"
              mode="text"
              onPress={() => console.warn("Pressed")}
              icon="flag"
            >
              Report User
            </Button>
          </RBSheet>

          <View style={{ marginBottom: 170 }}>
            {posts.length > 0 ? (
              <FlatList
                style={styles.container}
                data={posts}
                renderItem={renderSocialCard}
                keyExtractor={(item: Post) => item.id.toString()}
                initialNumToRender={10}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshFn}
                  />
                }
              />
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshFn}
                  />
                }
              >
                <View style={styles.noPostView}>
                  <Headline>No post found</Headline>
                  <Caption>Pull down to refresh</Caption>
                  <Button onPress={handlePress}>Create Post</Button>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 80,
  },
  appbar: {
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
    fontSize: 25,
  },
  header: {
    backgroundColor: "#000",
  },
  noPostView: {
    marginTop: "50%",
    alignItems: "center",
  },
});
