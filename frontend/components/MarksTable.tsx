import * as React from "react";
import { View, Text } from "react-native";
import { DataTable } from "react-native-paper";

const MarksTable = () => (
  <DataTable>
    <DataTable.Header>
      <DataTable.Title>Dessert</DataTable.Title>
      <DataTable.Title numeric>Calories</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>Frozen yogurt</DataTable.Cell>
      <DataTable.Cell numeric>159 / 200</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
      <DataTable.Cell numeric>237 / 400</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={(page) => {
        console.log(page);
      }}
      label="1-2 of 6"
    />
  </DataTable>
);

export default MarksTable;
