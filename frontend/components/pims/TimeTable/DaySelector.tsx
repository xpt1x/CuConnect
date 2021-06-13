import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { TimeTableStoreContext } from "../../../mobx/contexts";

export const DaySelector = () : React.ReactElement => {
  const [state, setState] = React.useState({ open: false });
  const TimeTableStore = useContext(TimeTableStoreContext);

  const weekday = [
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
  const onStateChange = ({ open }: Props): void => setState({ open });
  const onFABPress = (idx: number): void => {
    TimeTableStore.changeCurrentDay(idx);
    copyActions = Array.from(actions);
    copyActions[idx].style = styles.activeFAB;
  };

  interface Actions {
    icon: IconSource;
    onPress: () => void;
    style?: Record<string, unknown>;
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
  copyActions[TimeTableStore.currentDayNumber].style = styles.activeFAB;
  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "arrow-down" : weekday[TimeTableStore.currentDayNumber]}
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
    backgroundColor: "#00dac6",
  },
  activeFAB: {
    backgroundColor: "#00dac6",
  },
});

export default DaySelector;
