import { action, makeAutoObservable } from "mobx";
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
  }

  constructor() {
    makeAutoObservable(this);
  }
}
