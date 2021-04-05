import { action, makeAutoObservable, observable } from "mobx";
import { TimetableType } from "../../types/TimetableTypes";

export default class TimeTableStore {
  date = new Date();
  currentDay = this.date.getDay();

  @observable
  timetable: TimetableType | null = null;

  @action.bound
  changeCurrentDay(day: number) {
    this.currentDay = day;
  }

  @action.bound
  setTimetable(tt: TimetableType | null) {
    this.timetable = tt;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
