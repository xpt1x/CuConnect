import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Surface, Title, Text, Colors } from "react-native-paper";

export default function Calendar() {
  const [month, setMonth] = React.useState("January, 2021");

  return (
    <>
      <ScrollView horizontal={true} style={styles.calender}>
        <Surface style={[styles.surface, styles.green]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.red]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.red]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.green]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.green]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.green]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.red]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
        <Surface style={[styles.surface, styles.red]}>
          <Title>25</Title>
          <Text>Feb</Text>
        </Surface>
      </ScrollView>
      <Title style={styles.title}>{month}</Title>
    </>
  );
}

const styles = StyleSheet.create({
  calendarAccordionItem: {
    backgroundColor: "grey",
    height: 50,
  },
  surface: {
    margin: 8,
    padding: 8,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 10,
    borderRadius: 7,
    borderTopWidth: 10,
  },

  title: {
    // marginLeft: 15,
    marginRight: "auto",
    marginHorizontal: 15,
    marginBottom: 12,
  },
  green: {
    borderTopColor: Colors.green800,
  },
  red: {
    borderTopColor: Colors.red900,
  },
  calender: {
    paddingBottom: 15,
    width: "111%",
    paddingTop: 15,
  },
});
