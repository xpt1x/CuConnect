import AsyncStorage from "@react-native-async-storage/async-storage";

import AttendanceStore from "../../mobx/stores/AttendanceStore";
import MarksStore from "../../mobx/stores/MarksStore";
import TimeTableStore from "../../mobx/stores/TimeTableStore";

const signOut = async (
  attendanceStore?: AttendanceStore,
  timetableStore?: TimeTableStore,
  marksStore?: MarksStore
): Promise<void> => {
  try {
    if (attendanceStore) {
      attendanceStore.setAttendance(null);
      attendanceStore.setFullAttendance(null);
    }
    if (marksStore) marksStore.setMarks(null);
    if (timetableStore) timetableStore.setTimetable(null);
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  } catch (e) {
    console.warn(e);
  }
};

export { signOut };
