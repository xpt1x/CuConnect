import React, { useContext } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { TimeTableStoreContext } from "../mobx/contexts";

export default function DaySelector(params: object) {
  const [state, setState] = React.useState({ open: false });
  // const date = new Date();
  // const [day, setDay] = React.useState(date.getDay());
  const TimeTableStore = useContext(TimeTableStoreContext);

  var weekday = [
    "alpha-s",
    "alpha-m",
    "alpha-t",
    "alpha-w",
    "alpha-t",
    "alpha-f",
    "alpha-s",
  ];

  interface Props {
    open: boolean;
  }
  const onStateChange = ({ open }: Props) => setState({ open });
  const onFABPress = (idx: number) => {
    // setDay(idx);
    TimeTableStore.currentDay = idx;
    copyActions = Array.from(actions);
    let fabIdx = idx ? idx - 1 : 6;
    copyActions[fabIdx].style = styles.activeFAB;
  };

  interface Actions {
    icon: IconSource;
    onPress: () => void;
    style?: object;
  }

  const actions = [
    {
      icon: "alpha-s",
      onPress: () => onFABPress(0),
      // small: false,
    },
    {
      icon: "alpha-m",
      onPress: () => onFABPress(1),
      // small: false,
    },
    {
      icon: "alpha-t",
      onPress: () => onFABPress(2),
      // small: false,
    },
    {
      icon: "alpha-w",
      onPress: () => onFABPress(3),
      // small: false,
    },
    {
      icon: "alpha-t",
      onPress: () => onFABPress(4),
      // small: false,
    },
    {
      icon: "alpha-f",
      onPress: () => onFABPress(5),
      // small: false,
    },
    {
      icon: "alpha-s",
      onPress: () => onFABPress(6),
      // small: false,
    },
  ];
  let copyActions: Actions[] = Array.from(actions);
  copyActions[TimeTableStore.currentDay].style = styles.activeFAB;
  const { open } = state;
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "arrow-down" : weekday[TimeTableStore.currentDay]}
          fabStyle={styles.fabButton}
          style={styles.fabGroup}
          visible
          actions={copyActions}
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
  activeFAB: {
    backgroundColor: "rgba(1, 134, 252, 0.48)",
  },
});
