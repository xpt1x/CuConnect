import { action, makeAutoObservable } from "mobx";
import { Subject, FullSubject } from "../../types/Subject";

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject>|null = null;
  fullAttendance: ReadonlyArray<FullSubject>|null = null
  @action.bound
  setAttendance(attendance: ReadonlyArray<Subject>){
    this.attendance = attendance;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
