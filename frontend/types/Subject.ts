interface FullReport {
  [key: string]: string;
}

export interface Subject {
  UId: string;
  Code: string;
  Title: string;
  DutyLeave: number;
  DutyLeave_N_P: number;
  DutyLeave_Others: number;
  MedicalLeave: number;
  EncryptCode: string;
  Lec_Attd: number;
  Lec_Delv: number;
  Lec_Perc: number;
  name: string;
  Prac_Attd: number;
  Prac_Delv: number;
  Prac_Perc: number;
  Trl_Attd: number;
  Trl_Delv: number;
  Trl_Perc: number;
  Semester: number;
  StudentId: number;
  Total_Attd: string;
  Total_Delv: number;
  Total_Perc: number;
  colorcode: string;
  TotalPercentage: string;
  EligibilityDelivered: string;
  EligibilityPercentage: string;
  EligibilityAttended: string;
}

export interface FullSubject extends Subject { 
  FullAttendanceReport: ReadonlyArray<FullReport>;
}