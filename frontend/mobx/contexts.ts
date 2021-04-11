import { createContext } from "react";
import AttendanceStore from "./stores/AttendanceStore";
import TimeTableStore from "./stores/TimeTableStore";
import MarksStore from "./stores/MarksStore";

const TimeTableStoreContext = createContext(new TimeTableStore());
const AttendanceStoreContext = createContext(new AttendanceStore());
const MarksStoreContext = createContext(new MarksStore());


export {AttendanceStoreContext, TimeTableStoreContext, MarksStoreContext};
