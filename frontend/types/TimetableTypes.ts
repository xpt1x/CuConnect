export interface Lecture {
  title: string;
  type: string;
  group: string;
  teacher: string;
}

export interface TimetableType {
  [key: string]: {
    [key: string]: Lecture | null;
  };
}
