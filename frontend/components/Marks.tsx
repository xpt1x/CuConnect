import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../placeholder/marks";
import { StyleSheet, ScrollView, View } from "react-native";
import MarksCard from "./MarksCard";

const Marks = ({ navigation }) => {
  MARKS.sort((obj1, obj2) => obj1.name > obj2.name);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {MARKS.map((data, idx) => (
          <MarksCard
            name={data.name.substring(0, data.name.lastIndexOf("("))}
            subCode={data.name.substring(
              data.name.lastIndexOf("(") + 1,
              data.name.lastIndexOf(")")
            )}
            marks={data.marks}
            key={idx}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: "#1C95FF",
  },
  scrollContainer: {
    width: "100%",
  },
});
