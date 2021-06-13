import React from "react";
import { ScrollView,StyleSheet, Text } from "react-native";
import { DataTable,Surface } from "react-native-paper";

import { ElementMarks } from "../../../types/ElementMarks";
const infoRow = (elementMarks: ElementMarks, idx: number): React.ReactElement => {
  return (
    <DataTable.Row key={idx}>
      <DataTable.Cell>{elementMarks.element}</DataTable.Cell>
      <DataTable.Cell
        numeric
      >{`${elementMarks.obtained}/${elementMarks.total}`}</DataTable.Cell>
    </DataTable.Row>
  );
};

interface RouteParam {
  name: string;
  marks: ReadonlyArray<ElementMarks>;
}

interface Props {
  route: Record<string, RouteParam>
}

export default function DetailedMarks({ route }: Props) : React.ReactElement {
  const { marks, name }: RouteParam = route.params;
  return (
    <>
      <Text style={styles.title}>{name}</Text>
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <DataTable>
            {marks.map((elementMarks, idx) => infoRow(elementMarks, idx))}
          </DataTable>
        </Surface>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  surface: {
    padding: "1.5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    backgroundColor: "#000",
  },
  title: {
    padding: 24,
    color: "white",
    alignSelf: "center",
    fontSize: 24,
    marginBottom: 12,
  },
});
