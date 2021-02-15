import React from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function DaySelector(params: object) {
  const [state, setState] = React.useState({ open: false });
  interface Props {
    open: boolean;
  }
  const onStateChange = ({ open }: Props) => setState({ open });

  const { open } = state;
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "arrow-down" : "alpha-m"}
          fabStyle={styles.fabButton}
          style={styles.fabGroup}
          visible
          actions={[
            {
              icon: "alpha-m",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
            {
              icon: "alpha-t",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
            {
              icon: "alpha-w",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
            {
              icon: "alpha-t",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
            {
              icon: "alpha-f",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
            {
              icon: "alpha-s",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
            {
              icon: "alpha-s",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
}
const styles = StyleSheet.create({
  fabGroup: {
    zIndex: 5,
  },
  fabButton: {
    backgroundColor: "#0186FC",
  },
});
