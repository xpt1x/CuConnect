import React from "react";
import {
  ProgressBar,
  Colors,
  Surface,
  DataTable,
  Chip,
  List,
  Text,
} from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

let infoRow = () => {
  return (
    <DataTable.Row>
      <DataTable.Cell>Required To Hit 75%</DataTable.Cell>
      <DataTable.Cell numeric>6</DataTable.Cell>
    </DataTable.Row>
  );
};

let calendar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section style={styles.calendarSection}>
      <List.Accordion
        title="Calendar"
        left={(props) => <List.Icon {...props} icon="calendar" />}
        expanded={expanded}
        onPress={handlePress}
      >
        {/* Add calender component here */}
        <Text style={styles.calendarAccordionItem}>Days</Text>
      </List.Accordion>
    </List.Section>
  );
};
export default function DetailedAttendance() {
  return (
    <>
      <ProgressBar progress={0.8} color={Colors.green500} />

      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <Chip textStyle={styles.chipText} style={styles.chip}>
            8/10
          </Chip>
          <AnimatedCircularProgress
            style={styles.cardPercent}
            size={110}
            width={9}
            fill={86}
            tintColor={"green"}
            backgroundColor="#3d5875"
          >
            {() => <Text style={styles.percentText}>90%</Text>}
          </AnimatedCircularProgress>
          {calendar()}
          <DataTable>
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
            {infoRow()}
          </DataTable>
        </Surface>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },

  surface: {
    padding: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    marginHorizontal: "auto",
  },
  calendarSection: {
    width: "112%",
  },
  calendarAccordionItem: {
    backgroundColor: "grey",
    // change background color
    height: 50,
  },
  chip: {
    marginBottom: "4%",
    marginTop: "2%",
    marginRight: "5%",
    alignSelf: "flex-end",
  },
  chipText: {
    fontSize: 18,
  },
  cardPercent: {
    alignSelf: "center",
    marginBottom: "18%",
    marginTop: "2%",
  },
  percentText: {
    fontSize: 20,
  },
});
