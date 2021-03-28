import { action, makeAutoObservable } from "mobx";
<<<<<<< HEAD
import { min } from "react-native-reanimated";
import {TimetableType} from "../../types/TimetableTypes"

export default class TimeTableStore {
  attendance = undefined
  fullAttendance = undefined

  @action.bound
  setFullAttendance(fullAttendance) {
    this.fullAttendance = fullAttendance;
  }

  @action.bound
  setAttendance(minimalAttendance){
    this.attendance = minimalAttendance;
=======
import { Subject } from "../../types/Subject";

export default class AttendanceStore {
  attendance: ReadonlyArray<Subject>|null = null;

  @action.bound
  setAttendance(attendance: ReadonlyArray<Subject>){
    this.attendance = attendance;
>>>>>>> c394cde99882034204ed7ddf22b6044efd96d021
  }

  constructor() {
    makeAutoObservable(this);
  }
}
