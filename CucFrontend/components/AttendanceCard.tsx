import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, ProgressBar, Colors, Text } from "react-native-paper";

export default function AttendanceCard() {
  const buttonPress = () => {
    console.log("Hello!");
  };
  return (
    // <Card
    //   header={Header}
    //   style={styles.card}
    //   status="success"
    //   appearance="filled"
    // >
    //   <Text category="s1">Total Attended: 2</Text>
    //   <Text category="s1">Total Delivered: 2</Text>
    // </Card>
    <Card style={styles.card}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Text>Atended : 20</Text>
        <Text>Delivered : 20</Text>
      </Card.Content>

      <ProgressBar
        style={styles.progressBar}
        progress={0.7}
        color={Colors.green500}
        indeterminate={false}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: "auto",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  progressBar: {
    marginTop: 15,
  },
});
