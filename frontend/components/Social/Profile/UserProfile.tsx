import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Text, Avatar, Divider, Chip, Colors } from "react-native-paper";
import profilePic from "../../../devAssets/avatar.png";
import { NavigationStackProp } from "react-navigation-stack";
import readCreds from "../../../utils/readCreds";
import { getProfile, getUserPosts } from "../../../ApiLayer/Api";
import Loader from "../../pims/Utils/Loader";
import { Post } from "../../../types/PostTypes";

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

interface UserProfileProps {
  navigation: NavigationStackProp;
}

export default function UserProfile({ navigation }: UserProfileProps) {
  let images = [];
  for (let i = 0; i < 9; i++) {
    let link = `https://picsum.photos/${getRandom(10, 20) * 100}/${
      getRandom(10, 20) * 100
    }`;
    images.push(link);
  }

  const [user, setUser] = React.useState<{
    display_name: string;
    uid: string;
    rep: number;
  }>({ display_name: "", uid: "", rep: 0.0 });

  const [posts, setPosts] = React.useState<ReadonlyArray<Post>>([]);

  const getUserData = async () => {
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

  const fetchUserPosts = async () => {
    const {creds} = await readCreds();
    if(!creds) return;
    const { posts } = await getUserPosts(creds.uid);
    if (posts) {
      setPosts(posts);
    }
  };

  React.useEffect(() => {
    getUserData();
    fetchUserPosts();
  }, []);

  return (
    <ScrollView>
      <View style={styles.nameAndPhoto}>
        <Avatar.Image size={125} source={profilePic} />
        <Text style={styles.userName}>{user.display_name}</Text>
        <Text style={styles.uid}>{user.uid}</Text>
      </View>
      <View style={styles.data}>
        <View style={styles.dataElement}>
          <Text style={styles.dataText}>Posts</Text>
          <Divider style={styles.divider} />
          <Text style={styles.dataNumbers}>11</Text>
        </View>
        <View style={styles.dataElement}>
          <Chip mode={"outlined"}>{user.rep}</Chip>
        </View>
        <View style={styles.dataElement}>
          <Text style={styles.dataText}>Likes</Text>
          <Divider style={styles.divider} />
          <Text style={styles.dataNumbers}>23</Text>
        </View>
      </View>
      <View style={styles.imagesContainer}>
        {/* {images.map((link, idx) => {
              return (
                <Image
                  source={{ uri: link }}
                  style={styles.image}
                  key={idx}
                  resizeMode={"cover"}
                />
              );
            })} */}
        {posts.length === 0 ? (
          <Loader
            style={{ marginTop: "10%", width: "100%", padding: 12 }}
            heading={"Loading posts..."}
            caption={"Fetching your posts"}
          />
        ) : (
          posts.map((post) => (
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
