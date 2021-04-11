import config from "../config.json";
import { TimetableType } from "../types/TimetableTypes";
import { Subject } from "../types/Subject";
import { Error } from "../types/Error";
import {SubjectMarks, Sessions} from "../types/MarksTypes";

const createUserData = (): FormData => {
  const user = new FormData();
  user.append("uid", "18bcs2414");
  user.append("password", "Sanuthe)44");
  return user;
};

const getAttendance = async (): Promise<ReadonlyArray<Subject> | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + "/attendance", {
      method: "POST",
      body: createUserData(),
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
      body: createUserData(),
    });

    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

const getFullAttendance = async (): Promise<ReadonlyArray<Subject> | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + "/fullattendance", {
      method: "POST",
      body: createUserData(),
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
      body: createUserData(),
    });
    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

const getMarks = async (session: string): Promise<ReadonlyArray<SubjectMarks> | Error> => {
  try {
    const response = await fetch(config.imsApiUrl + `/marks/${session}`, {
      method: "POST",
      body: createUserData(),
    });

    const jsonResponse = await response.json();
    const { error } = jsonResponse;
    return error ? { message: error } : jsonResponse;
  } catch (error) {
    console.log(error);
    return { message: error };
  }
};

export { getAttendance, getTimetable, getFullAttendance, getMarks, getAvailableSessions };
