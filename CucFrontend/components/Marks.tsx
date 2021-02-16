import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../placeholder/marks";
import MarksTable from "./MarksTable";

const Marks = () => (
  <SafeAreaView>
    <MarksTable />
  </SafeAreaView>
);

export default Marks;
