import * as React from "react";
import { View, Text } from "react-native";
import { List, DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../placeholder/marks";

const Marks = () => (
  <SafeAreaView>
    <List.AccordionGroup>
      {MARKS.map((subject, idx) => (
        <List.Accordion title={subject.name} key={idx} id={idx}>
          <DataTable>
            {subject.marks.map((row) => (
              <DataTable.Row>
                <DataTable.Cell> {row.element} </DataTable.Cell>
                <DataTable.Cell>
                  {" "}
                  {`${row.obtained}/${row.total}`}{" "}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </List.Accordion>
      ))}
    </List.AccordionGroup>
  </SafeAreaView>
);

export default Marks;
