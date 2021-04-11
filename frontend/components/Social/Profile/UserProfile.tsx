import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import {
  Text,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Colors,
} from "react-native-paper";
import profilePic from "../../../devAssets/avatar.png";

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function UserProfile() {
  let images = [];
  for (let i = 0; i < 9; i++) {
    let link = `https://picsum.photos/${getRandom(10, 20) * 100}/${
      getRandom(10, 20) * 100
    }`;
    images.push(link);
  }
  return (
    <ScrollView>
      <View style={styles.nameAndPhoto}>
        <Avatar.Image size={125} source={profilePic} />
        <Text style={styles.userName}>Jennifer Lawrence</Text>
        <Text style={styles.uid}>18BCS2414</Text>
      </View>
      <View style={styles.data}>
        <View style={styles.dataElement}>
          <Text style={styles.dataText}>Posts</Text>
          <Divider style={styles.divider} />
          <Text style={styles.dataNumbers}>12</Text>
        </View>
        <View style={styles.dataElement}>
          <Chip mode={"outlined"}>122</Chip>
        </View>
        <View style={styles.dataElement}>
          <Text style={styles.dataText}>Likes</Text>
          <Divider style={styles.divider} />
          <Text style={styles.dataNumbers}>258</Text>
        </View>
      </View>
      <View style={styles.imagesContainer}>
        {images.map((link, idx) => {
          return (
            <Image
              source={{ uri: link }}
              style={styles.image}
              key={idx}
              resizeMode={"cover"}
            />
          );
        })}
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
