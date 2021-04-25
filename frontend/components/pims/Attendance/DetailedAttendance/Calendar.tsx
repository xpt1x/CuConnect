import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Surface, Title, Text, Colors } from "react-native-paper";
import { FullSubject } from "../../../../types/Subject";

interface calendarProps {
  subject: FullSubject;
}

function parseDate(date: string): ReadonlyArray<string> {
  const splitDate = date.split(" ");
  return [splitDate[1], splitDate[2]];
}

export default function Calendar({ subject }: calendarProps) {
  const [month, setMonth] = React.useState("January, 2021");
  const { FullAttendanceReport } = subject;
  return (
    <>
      <ScrollView horizontal={true} style={styles.calender}>
        {FullAttendanceReport.map((entry, idx) => {
          const color =
            entry.AttendanceCode === "P" ? styles.green : styles.red;
          const [date, month] = parseDate(entry.AttDate);
          return (
            <Surface style={[styles.surface, color]} key={idx}>
              <Title>{date}</Title>
              <Text>{month}</Text>
            </Surface>
          );
        })}
      </ScrollView>
      {/* <Title style={styles.title}>{month}</Title> */}
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