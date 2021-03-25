export interface Lecture {
  title: string;
  type: string;
  group: string;
  teacher: string;
}

export interface TimetableTypes {
  [key: string]: {
    [key: string]: Lecture | null;
  };
}
