import React from "react";
import {
  Appbar,
  ProgressBar,
  Colors,
  Surface,
  DataTable,
  Avatar,
} from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";

export default function DetailedAttendance() {
  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="JavaScript" subtitle="[TDY-414]" />
      </Appbar.Header>
      <ProgressBar progress={0.8} color={Colors.green500} />
      <Avatar.Text size={200} label="90%" />
      <ScrollView style={styles.container}>
        <Surface style={styles.surface}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Frozen yogurt</DataTable.Cell>
              <DataTable.Cell numeric>159 / 200</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
              <DataTable.Cell numeric>237 / 400</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Surface>
      </ScrollView>
    </View>
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
});
