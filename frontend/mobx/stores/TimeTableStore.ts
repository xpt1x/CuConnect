import { action, makeAutoObservable } from "mobx";

export default class TimeTableStore {
  date = new Date();
  currentDay = this.date.getDay();
  timetable = null;

  @action.bound
  changeCurrentDay(day: number) {
    this.currentDay = day;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
