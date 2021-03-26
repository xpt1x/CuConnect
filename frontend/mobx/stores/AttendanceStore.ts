import { action, makeAutoObservable } from "mobx";
import { Subject } from "../../types/Subject";

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject>|null = null;

  @action.bound
  setAttendance(attendance: ReadonlyArray<Subject>){
    this.attendance = attendance;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
