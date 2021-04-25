import { action, computed, makeAutoObservable } from "mobx";
import { Lecture, TimetableType } from "../../types/TimetableTypes";

const DayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class TimeTableStore {
  date = new Date();
  currentDayNumber = this.date.getDay();
  timetable: TimetableType | null = null;

  @action.bound
  changeCurrentDay(day: number) {
    this.currentDayNumber = day;
  }

  @action.bound
  setTimetable(tt: TimetableType | null) {
    this.timetable = tt;
  }

  @computed
  get currentDay(): string {
    return DayMap[this.currentDayNumber];
  }

  @computed
  get currentDayLectures(): Array<string> | null {
    var keys;
    if (this.timetable) {
      keys =
        this.timetable[DayMap[this.currentDayNumber]] !== undefined
          ? this.timetable[DayMap[this.currentDayNumber]]
          : null;
    }
    return keys ? Object.keys(keys).sort() : null;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
