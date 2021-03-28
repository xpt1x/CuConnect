import { createContext } from "react";
import AttendanceStore from "./stores/AttendanceStore";
import TimeTableStore from "./stores/TimeTableStore";

const TimeTableStoreContext = createContext(new TimeTableStore());
const AttendanceStoreContext = createContext(new AttendanceStore());

export {AttendanceStoreContext, TimeTableStoreContext}
