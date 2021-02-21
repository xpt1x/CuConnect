import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet } from "react-native";
interface Props {
  name: string;
  subCode: string;
  // navigation?: NavigationStackProp;
}
export default function MarksCard({ name, subCode /*, navigation */ }: Props) {
  const cardPress = (headerName: string) => {
    // navigation.push("Detailed Attendance", {
    //   headerName: headerName,
    // });s
  };

  return (
    <Card style={styles.card} onPress={() => cardPress(name)}>
      <Card.Content>
        <Title>{name}</Title>
        <Paragraph>{`[${subCode}]`}</Paragraph>
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
  },
});
