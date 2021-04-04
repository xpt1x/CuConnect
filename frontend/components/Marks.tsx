import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../placeholder/marks";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import MarksCard from "./MarksCard";
import { FAB, Button } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

const Marks = ({ navigation }: any) => {
  const refRBSheet = React.useRef<RBSheet>() as React.MutableRefObject<RBSheet>;
  const fabAction = () => {
    if (refRBSheet && refRBSheet.current) return refRBSheet.current.open();
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <RBSheet
          height={140}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            container: {
              backgroundColor: "#1c1c1c",
            },
            draggableIcon: {
              backgroundColor: "#757676",
            },
          }}
        >
          <Button mode="text">
            Current Session
          </Button>
          <Button mode="text">
            Previous Session
          </Button>
        </RBSheet>

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
      <FAB
        style={styles.fab}
        small={true}
        label={"Session"}
        icon="chevron-up"
        onPress={fabAction}
      />
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
