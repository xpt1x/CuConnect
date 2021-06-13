import { action, makeAutoObservable } from "mobx";

import { FullSubject,Subject } from "../../types/Subject";

interface fullAttendanceObjectType {
  [key: string]: FullSubject;
}

function compareTitles(a: Subject, b: Subject): number {
  if (a.Title < b.Title) return -1;
  else if (a.Title > b.Title) return 1;
  else return 0;
}

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject> | null = null;
  fullAttendance: fullAttendanceObjectType | null = null;
  firstRequestCompleted = false;

  @action.bound
  setAttendance(attendance: Array<Subject> | null):void {
    this.attendance = attendance ? attendance.sort(compareTitles) : null;
  }

  @action.bound
  setFullAttendance(attendance: Array<FullSubject> | null):void {
    const fullAttendance: fullAttendanceObjectType = {};
    attendance?.forEach((item) => {
      fullAttendance[item.Title] = item;
    });
    this.fullAttendance = fullAttendance;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
