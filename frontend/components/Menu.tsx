import * as React from "react";
import { StyleSheet} from "react-native";
import { Button, Menu, Divider } from "react-native-paper";

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    
    <Menu
    style={styles.menu}
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>Select Session</Button>}
    >
      <Menu.Item onPress={() => {}} title="CurrentSession-20212" />
      <Divider />
      <Menu.Item onPress={() => {}} title="PreviousSession-20211" />
    </Menu>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
  menu:{
    marginLeft: 80,
  },
});