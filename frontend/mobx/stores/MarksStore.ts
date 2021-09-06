import { action, computed, makeAutoObservable } from "mobx";

import { Sessions, SubjectMarks } from "../../types/MarksTypes";

function compareNames(a: SubjectMarks, b: SubjectMarks): number {
  if (a.name < b.name) return -1;
  else if (a.name > b.name) return 1;
  else return 0;
}

type Label = "Sessions" | "Current" | "Previous";

export default class MarksStore {
  marks: ReadonlyArray<SubjectMarks> | null = null;
  sessions: Sessions = {};
  firstRequestCompleted = false;
  sessionLabel = "";

  @computed
  get currentSession(): string {
    const session = Object.keys(this.sessions).find(
      (key: string) => this.sessions[key] === true
    );
    if (session === undefined) return Object.keys(this.sessions)[0];
    this.setLabel("Current");
    return session;
  }

  @computed
  get previousSession(): string {
    const session = Object.keys(this.sessions).find(
      (key: string) => this.sessions[key] === false
    );
    if (session === undefined) return Object.keys(this.sessions)[0];
    this.setLabel("Previous");
    return session;
  }

  @action
  setLabel(label: Label): void {
    this.sessionLabel = label;
  }

  @action.bound
  setMarks(marks: Array<SubjectMarks> | null): void {
    this.marks = marks ? marks.sort(compareNames) : null;
  }

  @action.bound
  setSessions(sessions: Sessions | null): void {
    this.sessions = sessions ? sessions : {};
  }

  constructor() {
    this.sessionLabel = "Sessions";
    makeAutoObservable(this);
  }
}
