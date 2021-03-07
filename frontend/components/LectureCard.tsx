import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Chip, Divider } from "react-native-paper";
import { Lecture } from "../types/Lecture";

interface LectureCardProps {
  lecture: Lecture | null;
  time: string;
  holiday: boolean;
}

interface ContentProps {
  obj: string | null;
}

const LeftContent = ({ obj, ...props }: ContentProps) => (
  <Avatar.Icon {...props} icon={obj ? `alpha-${obj}` : "star-face"} />
);

export default function LectureCard({
  lecture,
  time,
  holiday,
}: LectureCardProps) {
  return lecture !== null ? (
    <Card style={styles.card}>
      <Card.Title
        title={holiday ? "Wohoooooo!" : lecture.title}
        subtitle={holiday ? "No classes today" : lecture.teacher}
        left={(props) =>
          LeftContent({
            obj: holiday ? null : lecture.title[0].toLowerCase(),
            ...props,
          })
        }
        titleNumberOfLines={2}
        titleStyle={styles.cardTitle}
      />
      {holiday ? null : (
        <Card.Content style={styles.cardContent}>
          <Chip style={styles.time} icon="clock">
            {time}
          </Chip>
          <Chip mode="outlined" style={styles.lecType}>
            {lecture.type}
          </Chip>
        </Card.Content>
      )}
    </Card>
  ) : (
    <Divider />
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
    // width: "55%",
  },
  lecType: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
    // width: "25%",
  },
  cardTitle: {
    fontSize: 18,
    width: "90%",
    lineHeight: 22,
    marginTop: 10,
  },
});
