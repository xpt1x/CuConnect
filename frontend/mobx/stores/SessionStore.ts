import { action, makeAutoObservable } from "mobx";

export default class SessionStore {
  uid: string | null = null;
  password: string | null = null;

  @action.bound
  setCredentials(uid: string | null, password: string | null) {
    this.uid = uid;
    this.password = password;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
