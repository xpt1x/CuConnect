import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Surface, Title, Text, Colors, Chip } from "react-native-paper";

export default function Calendar() {
  const [month, setMonth] = React.useState("January, 2021");

  return (
    <View>
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
    </View>
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
    borderRadius: 15,
  },

  title: {
    // marginLeft: 15,
    marginHorizontal: 15,
  },
  green: {
    backgroundColor: Colors.green800,
  },
  red: {
    backgroundColor: Colors.red900,
  },
  calender: {
    paddingBottom: 15,
    paddingTop: 15,
  },
});
