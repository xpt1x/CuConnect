import React, { useContext } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { TimeTableStoreContext } from "../mobx/contexts";
import { observer } from "mobx-react-lite";

export const DaySelector = (params: object) => {
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
    TimeTableStore.changeCurrentDay(idx);
    copyActions = Array.from(actions);
    copyActions[idx].style = styles.activeFAB;
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
    },
    {
      icon: "alpha-m",
      onPress: () => onFABPress(1),
    },
    {
      icon: "alpha-t",
      onPress: () => onFABPress(2),
    },
    {
      icon: "alpha-w",
      onPress: () => onFABPress(3),
    },
    {
      icon: "alpha-t",
      onPress: () => onFABPress(4),
    },
    {
      icon: "alpha-f",
      onPress: () => onFABPress(5),
    },
    {
      icon: "alpha-s",
      onPress: () => onFABPress(6),
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
        />
      </Portal>
    </Provider>
  );
};
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

export default DaySelector;
