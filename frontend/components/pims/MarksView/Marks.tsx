import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARKS } from "../../../placeholder/marks";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
} from "react-native";
import MarksCard from "./MarksCard";
import { FAB, Button } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { getAvailableSessions, getMarks } from "../../../ApiLayer/Api";
import { Error } from "../../../types/Error";
import { observer } from "mobx-react-lite";
import { MarksStoreContext } from "../../../mobx/contexts";
import ErrorScreen from "./../Utils/ErrorScreen";
import Loader from "../Utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";

enum Session {
  Previous,
  Current,
}

const Marks = observer(({ navigation }: any) => {
  const MarksStore = React.useContext(MarksStoreContext);
  const refRBSheet = React.useRef<RBSheet>() as React.MutableRefObject<RBSheet>;
  const fabAction = () => {
    if (refRBSheet && refRBSheet.current) return refRBSheet.current.open();
  };
  const [error, setError] = React.useState<string>("");
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const changeSession = (session: Session) => {
    setRefreshing(true);
    switch (session) {
      case Session.Current:
        makeRequest(MarksStore.currentSession);
        break;
      case Session.Previous:
        makeRequest(MarksStore.previousSession);
        break;
      default:
        break;
    }
  };

  const checkLocalMarks = async () => {
    try {
      const marks = await AsyncStorage.getItem("marks");
      const timestamp = await AsyncStorage.getItem("timestamp");

      if (
        marks &&
        timestamp &&
        Date.now() - parseInt(timestamp) <= config.cacheMinute * 1000 * 60
      ) {
        setRefreshing(false);
        // set attendance from storage
        MarksStore.setMarks(JSON.parse(marks));
        console.log("Marks set from AsyncStorage");
      } else {
        makeRequest(undefined);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const makeRequest = async (session: string | undefined) => {
    try {
      if (session === undefined) {
        const { sessions, error } = await getAvailableSessions();
        if (error) return;
        if (sessions) MarksStore.setSessions(sessions);
      }
      const { marks, error } = await getMarks(
        session ? session : MarksStore.currentSession
      );
      setRefreshing(false);
      if (refRBSheet && refRBSheet.current) refRBSheet.current.close();
      if (error) {
        setError(error);
      } else if (marks) {
        MarksStore.setMarks(marks);
        try {
          await AsyncStorage.setItem("marks", JSON.stringify(marks));
          await AsyncStorage.setItem("timestamp", JSON.stringify(Date.now()));
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkLocalMarks();
  }, [update]);

  const onRefreshFn = () => {
    MarksStore.setMarks(null);
    setRefreshing(true);
    forceUpdate(!update);
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshFn} />
        }
      >
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
          <Button mode="text" onPress={() => changeSession(Session.Current)}>
            Current Session
          </Button>
          <Button mode="text" onPress={() => changeSession(Session.Previous)}>
            Previous Session
          </Button>
        </RBSheet>

        {MarksStore && MarksStore.marks ? (
          MarksStore.marks.map((subjectMarks, idx) => (
            <MarksCard
              name={subjectMarks.name.substring(
                0,
                subjectMarks.name.lastIndexOf("(")
              )}
              subCode={subjectMarks.name.substring(
                subjectMarks.name.lastIndexOf("(") + 1,
                subjectMarks.name.lastIndexOf(")")
              )}
              marks={subjectMarks.marks}
              key={idx}
              navigation={navigation}
            />
          ))
        ) : error ? (
          <ErrorScreen message={error} />
        ) : (
          <Loader caption={"Fetching your marks"} />
        )}
      </ScrollView>
      {MarksStore.marks ? (
        <FAB
          style={styles.fab}
          small={true}
          label={MarksStore.sessionLabel}
          icon="chevron-up"
          onPress={fabAction}
        />
      ) : null}
    </SafeAreaView>
  );
});
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
