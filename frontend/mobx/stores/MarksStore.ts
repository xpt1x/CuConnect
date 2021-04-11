import { action, makeAutoObservable, computed } from "mobx";
import { SubjectMarks, Sessions } from "../../types/MarksTypes";

export default class MarksStore {
  marks: ReadonlyArray<SubjectMarks> | null = null;
  sessions: Sessions = {};
  firstRequestCompleted: boolean = false;

  @computed
  get currentSession(): string {
    const session = Object.keys(this.sessions).find((key: string) => this.sessions[key] === true);
    if (session === undefined) return Object.keys(this.sessions)[0];
    return session;
  }

  @computed
  get previousSession(): string {
    const session = Object.keys(this.sessions).find((key: string) => this.sessions[key] === false);
    if (session === undefined) return Object.keys(this.sessions)[0];
    return session;
  }

  @action.bound
  setMarks(marks: ReadonlyArray<SubjectMarks> | null) {
    this.marks = marks;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
