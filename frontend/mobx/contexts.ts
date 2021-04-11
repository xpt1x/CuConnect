import { createContext } from "react";
import AttendanceStore from "./stores/AttendanceStore";
import TimeTableStore from "./stores/TimeTableStore";
import MarksStore from "./stores/MarksStore";
import SessionStore from "./stores/SessionStore";

const TimeTableStoreContext = createContext(new TimeTableStore());
const AttendanceStoreContext = createContext(new AttendanceStore());
const MarksStoreContext = createContext(new MarksStore());
const SessionStoreContext = createContext(new SessionStore());

export {
  AttendanceStoreContext,
  TimeTableStoreContext,
  MarksStoreContext,
  SessionStoreContext,
};
