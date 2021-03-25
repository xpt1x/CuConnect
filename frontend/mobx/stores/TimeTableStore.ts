import { action, makeAutoObservable } from "mobx";
import {TimetableTypes} from "../../types/TimetableTypes"

export default class TimeTableStore {
  date = new Date();
  currentDay = this.date.getDay();
  timetable: TimetableTypes|null = null;

  @action.bound
  changeCurrentDay(day: number) {
    this.currentDay = day;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
