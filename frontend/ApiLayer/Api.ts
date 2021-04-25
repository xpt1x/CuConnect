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

interface FullNameResponse {
  full_name: string | null;
  exists: boolean;
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

const validateUser = async (uid: string, password: string): Promise<string> => {
  try {
    const user = new FormData();
    user.append("uid", uid);
    user.append("password", password);

    const response = await fetch(config.imsApiUrl + "/validate", {
      method: "POST",
      body: user,
    });
    const jsonResponse = await response.json();
    const { error } = jsonResponse;

    return error ? error : jsonResponse;
  } catch (error) {
    console.log(error);
    return "Application Internal Failure";
  }
};

interface RegisterResponse {
  error?: string;
  success?: string;
}

const registerUser = async (
  uid: string,
  password: string,
  full_name: string
): Promise<RegisterResponse> => {
  const user = new FormData();
  user.append("uid", uid);
  user.append("password", password);
  user.append("display_name", full_name);

  try {
    const response = await fetch(config.imsApiUrl + "/register", {
      method: "POST",
      body: user,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return { error: "Internal Failure" };
  }
};

const getAttendance = async (): Promise<Array<Subject> | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + "/attendance", {
      method: "POST",
      body: await createUserData(),
    });
    const jsonResponse = await response.json();
    const { error } = jsonResponse;

    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

const getTimetable = async (): Promise<TimetableType | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + "/timetable", {
      method: "POST",
      body: await createUserData(),
    });

    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

const getFullAttendance = async (): Promise<Array<FullSubject> | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + "/fullattendance", {
      method: "POST",
      body: await createUserData(),
    });

    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

const getAvailableSessions = async (): Promise<Sessions | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + "/availablesessions", {
      method: "POST",
      body: await createUserData(),
    });
    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

const getMarks = async (
  session: string
): Promise<Array<SubjectMarks> | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + `/marks/${session}`, {
      method: "POST",
      body: await createUserData(),
    });

    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

export {
  validateUser,
  getAttendance,
  getTimetable,
  getFullAttendance,
  getMarks,
  getAvailableSessions,
  registerUser,
  getFullName,
};
