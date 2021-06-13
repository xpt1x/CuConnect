import React from "react";
import { Image,ScrollView, StyleSheet, Text,View } from "react-native";
import { Avatar, Chip, Colors,Divider } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

import { getProfile, getUserPosts } from "../../../ApiLayer/Api";
import { Post } from "../../../types/PostTypes";
import readCreds from "../../../utils/readCreds";
import Loader from "../../pims/Utils/Loader";

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

interface UserProfileProps {
  navigation: NavigationStackProp;
}

export default function UserProfile({ navigation }: UserProfileProps): React.ReactElement {

  const [user, setUser] = React.useState<{
    display_name: string;
    uid: string;
    rep: number;
  }>({ display_name: "", uid: "", rep: 0.0 });

  const [userPosts, setUserPosts] = React.useState<{fetched: boolean, posts: ReadonlyArray<Post>}>({fetched: false, posts: []});

  const getUserData = async () : Promise<void> => {
    const { creds } = await readCreds();
    if (creds) {
      const { profile } = await getProfile(creds.uid);
      if (profile) {
        setUser({
          uid: profile.user_id,
          display_name: profile.display_name,
          rep: profile.rep,
        });
      }
    }
  };

  const fetchUserPosts = async () : Promise<void> => {
    // dont fetch with when uid == "" it will result in error
    if(user.uid === "") return;
    const { posts } = await getUserPosts(user.uid);
    if (posts) {
      setUserPosts({fetched: true, posts})
    }
  };

  React.useEffect(() => {
    getUserData();
    fetchUserPosts();
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.nameAndPhoto}>
        <Avatar.Icon size={125} icon={"account"}  />
        <Text style={styles.userName}>{user.display_name}</Text>
        <Text style={styles.uid}>{user.uid}</Text>
      </View>
      <View style={styles.data}>
        <View style={styles.dataElement}>
          <Text style={styles.dataText}>Posts</Text>
          <Divider style={styles.divider} />
          <Text style={styles.dataNumbers}>{userPosts.fetched ? userPosts.posts.length : "..."}</Text>
        </View>
        <View style={styles.dataElement}>
          <Chip mode={"outlined"}>{user.rep || "..."}</Chip>
        </View>
        <View style={styles.dataElement}>
          <Text style={styles.dataText}>Likes</Text>
          <Divider style={styles.divider} />
          {/* FAKE DATA */}
          <Text style={styles.dataNumbers}>{Math.floor(user.rep * 0.5) || "..."}</Text>
        </View>
      </View>
      <View style={styles.imagesContainer}>
        {!userPosts.fetched ? (
          <Loader
            style={{ marginTop: "10%", width: "100%", padding: 12 }}
            heading={"Loading posts..."}
            caption={"Fetching your posts"}
          />
        ) : (
          userPosts.posts.map((post) => (
            <Image
              source={{ uri: post.image }}
              style={styles.image}
              key={post.id}
              resizeMode={"cover"}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nameAndPhoto: {
    flex: 1,
    alignItems: "center",
    marginTop: 45,
    marginBottom: 35,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "6%",
  },
  uid: {
    marginTop: "1%",
    fontSize: 14,
    color: Colors.grey700,
  },
  data: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 35,
  },
  dataElement: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  divider: {
    height: 12,
  },
  dataText: {
    fontSize: 14,
  },
  dataNumbers: {
    fontSize: 30,
    color: Colors.grey500,
  },
  image: {
    width: "45%",
    marginRight: "2.5%",
    marginLeft: "2.5%",
    marginBottom: 20,
    height: 230,
    borderRadius: 20,
  },
  imagesContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
