import { action, makeAutoObservable } from "mobx";
import { Subject, FullSubject } from "../../types/Subject";

interface fullAttendanceObjectType {
  [key: string]: FullSubject;
}

function compareTitles(a: Subject, b: Subject) {
  if (a.Title < b.Title) return -1;
  else if (a.Title > b.Title) return 1;
  else return 0;
}

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject> | null = null;
  fullAttendance: fullAttendanceObjectType | null = null;
  firstRequestCompleted: boolean = false;

  @action.bound
  setAttendance(attendance: Array<Subject> | null) {
    this.attendance = attendance ? attendance.sort(compareTitles) : null;
  }

  @action.bound
  setFullAttendance(attendance: Array<FullSubject> | null) {
    let fullAttendance: fullAttendanceObjectType = {};
    attendance?.forEach((item) => {
      fullAttendance[item.Title] = item;
    });
    this.fullAttendance = fullAttendance;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
