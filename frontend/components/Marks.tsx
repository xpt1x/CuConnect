import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../placeholder/marks";
import { StyleSheet, ScrollView, View } from "react-native";
import MarksCard from "./MarksCard";
import { Appbar } from "react-native-paper";

const Marks = () => {
  return (
    <View>
      <ScrollView style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Marks" />
        </Appbar.Header>
        {MARKS.map((data, idx) => (
          <MarksCard
            name={data.name.substring(0, data.name.lastIndexOf("("))}
            subCode={data.name.substring(
              data.name.lastIndexOf("(") + 1,
              data.name.lastIndexOf(")")
            )}
            key={idx}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default Marks;
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    width: "100%",
  },
  appbar: {
    backgroundColor: "#000000",
  },
  scrollContainer: {
    width: "100%",
  },
});
