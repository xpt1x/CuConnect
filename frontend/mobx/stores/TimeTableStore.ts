import { observable } from "mobx";
import { createContext } from "react";

export default class TimeTableStore {
  date = new Date();
  @observable currentDay = this.date.getDay();
  @observable timetable = null;
}
