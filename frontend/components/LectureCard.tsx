import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Badge,
  Chip,
} from "react-native-paper";
const LeftContent = (props: object) => (
  <Avatar.Icon {...props} icon="alpha-j" />
);

export default function LectureCard({ lecture }) {
  return (
    <>
      <Card style={styles.card}>
        <Card.Title title={lecture.title} subtitle="Vtrix" left={LeftContent} />
        <Card.Content style={styles.cardContent}>
          <Chip style={styles.time} icon="clock">
            {lecture}
          </Chip>
          <Chip mode="outlined" style={styles.lecType}>
            {lecture.type}
          </Chip>
        </Card.Content>
      </Card>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
  },
  time: {
    margin: 7,
    width: "55%",
  },
  lecType: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
    width: "25%",
  },
});
