import { TimetableType } from "../types/TimetableTypes";
import { FullSubject, Subject } from "../types/Subject";
import { Error } from "../types/Error";
import { SubjectMarks, Sessions } from "../types/MarksTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";

const createUserData = async () => {
  const user = new FormData();
  try {
    const uid = await AsyncStorage.getItem("uid");
    const password = await AsyncStorage.getItem("password");
    if (uid !== null && password !== null) {
      user.append("uid", uid);
      user.append("password", password);
    }
  } catch (e) {
    console.log("Failed reading creds from storage");
  }
  return user;
};

// interface ValidateUserResponse {
//   full_name?: string;
//   error?: string;
// }

interface RegisterResponse {
  error?: string;
  success?: string;
}

interface FullNameResponse {
  full_name: string | null;
  exists: boolean;
  error?: string;
}

interface AttendanceResponse {
  attendance?: Array<Subject>;
  error?: string;
}

interface FullAttendanceResponse {
  fullattendance?: Array<FullSubject>;
  error?: string;
}

interface TimeTableResponse {
  timetable?: TimetableType;
  error?: string;
}

interface MarksResponse {
  marks?: Array<SubjectMarks>;
  error?: string;
}

interface AvailableSessionsResponse {
  sessions?: Sessions;
  error?: string;
}

const getFullName = async (
  uid: string,
  password: string
): Promise<FullNameResponse> => {
  try {
    const user = new FormData();
    user.append("uid", uid);
    user.append("password", password);

    const response = await fetch(config.imsApiUrl + "/checkuser", {
      method: "POST",
      body: user,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {
    exists: false,
    full_name: null,
    error: "Application faliure.",
  };
};

// const validateUser = async (uid: string, password: string): Promise<ValidateUserResponse> => {
//   try {
//     const user = new FormData();
//     user.append("uid", uid);
//     user.append("password", password);

//     const response = await fetch(config.imsApiUrl + "/validate", {
//       method: "POST",
//       body: user,
//     });
//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
//   return {error: "Can't validate (Internal Failure)"}
// };

const registerUser = async (full_name: string): Promise<RegisterResponse> => {
  const user = await createUserData();
  user.append("display_name", full_name);

  try {
    const response = await fetch(config.imsApiUrl + "/register", {
      method: "POST",
      body: user,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return { error: "Error registering user (Internal Failure)" };
};

const getAttendance = async (): Promise<AttendanceResponse> => {
  try {
    const response = await fetch(config.imsApiUrl + "/attendance", {
      method: "POST",
      body: await createUserData(),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return { error: "Error getting attendace" };
};

const getTimetable = async (): Promise<TimeTableResponse> => {
  try {
    const response = await fetch(config.imsApiUrl + "/timetable", {
      method: "POST",
      body: await createUserData(),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return { error: "Error getting timetable" };
};

const getFullAttendance = async (): Promise<FullAttendanceResponse> => {
  try {
    const response = await fetch(config.imsApiUrl + "/fullattendance", {
      method: "POST",
      body: await createUserData(),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return { error: "Error getting fullattendance" };
};

const getAvailableSessions = async (): Promise<AvailableSessionsResponse> => {
  try {
    const response = await fetch(config.imsApiUrl + "/availablesessions", {
      method: "POST",
      body: await createUserData(),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return { error: "Error getting available sessions" };
};

const getMarks = async (session: string): Promise<MarksResponse> => {
  try {
    const response = await fetch(config.imsApiUrl + `/marks/${session}`, {
      method: "POST",
      body: await createUserData(),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return { error: "Error getting marks" };
};

export {
  // validateUser,
  getAttendance,
  getTimetable,
  getFullAttendance,
  getMarks,
  getAvailableSessions,
  registerUser,
  getFullName,
};
