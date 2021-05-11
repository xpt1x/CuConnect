import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
} from "react-native";
import { Appbar, Button, Caption, Headline } from "react-native-paper";
import SocialCard from "./SocialCard";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import AppLoading from "expo-app-loading";
import RBSheet from "react-native-raw-bottom-sheet";
import { getPosts } from "../../../ApiLayer/Api";
import { Post } from "../../../types/PostTypes";
import { ScrollView } from "react-native-gesture-handler";

export default function Social({ navigation, route }: any) {
  const refRBSheet = React.useRef<RBSheet>() as React.MutableRefObject<RBSheet>;
  const tripleDotAction = () => {
    if (refRBSheet && refRBSheet.current) return refRBSheet.current.open();
  };
  function openCamera() {
    navigation.navigate("Camera");
  }
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const goToProfile = () => {
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
        console.log(response.error);
        setMessage(response.error);
      }
    });
  }, [update]);

  const onRefreshFn = () => {
    setRefreshing(true);
    forceUpdate(!update);
  };
  const renderSocialCard = ({ item }: any) => {
    return (
      <SocialCard
        tripleDotAction={tripleDotAction}
        navigation={navigation}
        post={item}
      />
    );
  };

  const handlePress = () => {
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
            <Button mode="text" onPress={() => console.log("Pressed")}>
              View Profile
            </Button>
            <Button
              color="#fa1e0e"
              mode="text"
              onPress={() => console.log("Pressed")}
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
