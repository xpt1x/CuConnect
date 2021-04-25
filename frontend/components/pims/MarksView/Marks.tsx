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
  const [error, setError] = React.useState<Error | null>(null);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [update, forceUpdate] = React.useState<boolean>(false);

  const mountedRef = React.useRef(true);

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
        // set attendance from storage
        if (!mountedRef.current) return;
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
        const response = await getAvailableSessions();
        if ("message" in response) return;
        MarksStore.sessions = response;
      }
      const marksResponse = await getMarks(
        session ? session : MarksStore.currentSession
      );
      setRefreshing(false);
      if (refRBSheet && refRBSheet.current) refRBSheet.current.close();
      if ("message" in marksResponse) {
        const error = marksResponse as Error;
        console.log(`Error from Marks Component: ${JSON.stringify(error)}`);
        if (!mountedRef.current) return;
        setError(error);
      } else {
        if (!mountedRef.current) return;
        MarksStore.setMarks(marksResponse);
        try {
          await AsyncStorage.setItem("marks", JSON.stringify(marksResponse));
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
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    makeRequest(undefined);
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
          <ErrorScreen message={error.message} />
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