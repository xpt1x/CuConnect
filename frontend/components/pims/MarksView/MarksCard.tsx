import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

import { ElementMarks } from "../../../types/ElementMarks";

interface Props {
  name: string;
  subCode: string;
  marks: ReadonlyArray<ElementMarks>;
  navigation?: NavigationStackProp;
}

const emojiType = (elementMarks: ReadonlyArray<ElementMarks>): string => {
  let totalSum = 0.0,
    obtainedSum = 0.0;
  elementMarks.forEach((element) => {
    totalSum += parseFloat(element.total);
    obtainedSum += parseFloat(element.obtained);
  });
  if (isNaN(totalSum) || isNaN(obtainedSum)) return "emoticon-neutral";
  if (obtainedSum >= totalSum / 2) return "emoticon";
  return "emoticon-sad";
};

export default function MarksCard({
  name,
  subCode,
  marks,
  navigation,
}: Props): React.ReactElement {
  const cardPress = (headerName: string): void => {
    navigation.push("Detailed Marks", {
      subjectCode: headerName,
      marks: marks,
      name: name,
    });
  };

  return (
    <Card style={styles.card} onPress={() => cardPress(subCode)}>
      <Card.Title
        title={name}
        subtitle={`[${subCode}]`}
        titleNumberOfLines={2}
        style={{ width: "85%" }}
      />
      <Card.Content>
        <Avatar.Icon style={styles.emoji} size={36} icon={emojiType(marks)} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "#0d0d0d",
  },
  emoji: {
    marginLeft: "auto",
    marginTop: "-10%",
  },
});
