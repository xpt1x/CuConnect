import { action, makeAutoObservable } from "mobx";
import { Subject, FullSubject } from "../../types/Subject";

interface fullAttendanceObjectType {
  [key: string]: FullSubject;
}

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject> | null = null;
  fullAttendance: fullAttendanceObjectType | null = null;
  firstRequestCompleted: boolean = false;

  @action.bound
  setAttendance(attendance: ReadonlyArray<Subject> | null) {
    this.attendance = attendance;
  }

  @action.bound
  setFullAttendance(attendance: ReadonlyArray<FullSubject> | null) {
    let fullAttendance: fullAttendanceObjectType = {};
    attendance?.forEach((item) => {
      fullAttendance[item.Title] = item;
    });
    this.fullAttendance = fullAttendance;
    console.log(this.fullAttendance)
  }

  constructor() {
    makeAutoObservable(this);
  }
}
