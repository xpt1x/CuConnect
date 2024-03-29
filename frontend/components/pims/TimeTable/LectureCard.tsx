import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, Chip, Divider } from "react-native-paper";

import { Lecture } from "../../../types/TimetableTypes";

interface LectureCardProps {
  lecture: Lecture | null;
  time?: string;
  holiday?: boolean;
}

interface ContentProps {
  obj: string | null;
}

const LeftContent = ({ obj, ...props }: ContentProps): React.ReactElement => (
  <Avatar.Icon {...props} icon={obj ? `alpha-${obj}` : "star-face"} />
);

export default function LectureCard({
  lecture,
  time,
  holiday,
}: LectureCardProps): React.ReactElement {
  return holiday ? (
    <Card style={styles.card}>
      <Card.Title
        title={"Wohoooooo!"}
        subtitle={"No classes today"}
        left={(props) =>
          LeftContent({
            obj: null,
            ...props,
          })
        }
        titleNumberOfLines={2}
        titleStyle={styles.cardTitle}
      />
    </Card>
  ) : lecture ? (
    <Card style={styles.card}>
      <Card.Title
        title={lecture.title}
        subtitle={lecture.teacher}
        left={(props) =>
          LeftContent({
            obj: lecture.title[0].toLowerCase(),
            ...props,
          })
        }
        titleNumberOfLines={2}
        titleStyle={styles.cardTitle}
      />
      <Card.Content style={styles.cardContent}>
        <Chip style={styles.time} icon="clock">
          {time}
        </Chip>
        <Chip mode="outlined" style={styles.lecType}>
          {lecture.type}
        </Chip>
      </Card.Content>
    </Card>
  ) : (
    <Divider style={{ backgroundColor: "white" }} />
  );
}
const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#0d0d0d",
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
