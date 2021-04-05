import { action, makeAutoObservable } from "mobx";
import { Subject, FullSubject } from "../../types/Subject";

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject> | null = null;
  fullAttendance: ReadonlyArray<FullSubject> | null = null;
  firstRequestCompleted: boolean = false;

  @action.bound
  setAttendance(attendance: ReadonlyArray<Subject> | null) {
    this.attendance = attendance;
  }

  @action.bound
  setFullAttendance(attendance: ReadonlyArray<FullSubject> | null) {
    this.fullAttendance = attendance;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
