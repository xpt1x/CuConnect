import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../placeholder/marks";
import { StyleSheet, ScrollView, View } from "react-native";
import MarksCard from "./MarksCard";
import Menu from "./Menu";
// import { Button, Menu, Provider } from "react-native-paper";

// const [visible, setVisible] = useState(false);
// const openMenu = () => setVisible(true);
// const closeMenu = () => setVisible(false);

const Marks = ({ navigation }: any) => {
  // MARKS.sort((obj1, obj2) => obj1.name > obj2.name);
  return (
    

    <SafeAreaView>
    <Menu />
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

    // <Provider>
    //   <View>
    //     <Menu
    //       visible={visible}
    //       onDismiss={closeMenu}
    //       anchor={<Button onPress={openMenu}>Show menu</Button>}
    //     >
    //       <Menu.Item onPress={() => {}} title="Item 1" />
    //       <Menu.Item onPress={() => {}} title="Item 2" />
    //     </Menu>
    //   </View>
    // </Provider>
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
