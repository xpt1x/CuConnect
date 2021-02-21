import { createContext } from "react";
import TimeTableStore from "./stores/TimeTableStore";

export const TimeTableStoreContext = createContext(new TimeTableStore());
