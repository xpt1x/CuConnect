import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, ProgressBar, Colors, Text } from "react-native-paper";

const cardPress = () => {};
// Show detailed attendance here

export default function AttendanceCard(params: any) {
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
    <Card style={styles.card} onPress={cardPress}>
      <Card.Title title="JavaScript" subtitle="[TDY-352]" />
      <Card.Content>
        <Text>Atended : 20</Text>
        <Text>Delivered : 20</Text>
      </Card.Content>
      <Card.Content>
        <Text style={styles.cardPercent}>90%</Text>
      </Card.Content>
      <ProgressBar
        style={styles.progressBar}
        progress={0.7}
        color={Colors.green600}
        indeterminate={false}
      />
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
  },
  progressBar: {
    marginTop: 15,
  },
  // cardPercent: {
  //   marginLeft: "auto",
  //   color: "#77E666",
  //   marginVertical: -38,
  //   marginRight: -18,
  //   fontWeight: "bold",
  //   fontSize: 62,
  // },
  cardPercent: {
    marginLeft: "auto",
    color: "#77E666",
    marginTop: -80,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 50,
  },
});
