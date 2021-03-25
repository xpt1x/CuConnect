import config from "../config.json";
import { TimetableTypes } from "../types/TimetableTypes";
import { Subject } from "../types/Subject";
import { Error } from "../types/Error";

const createUserData = (): FormData => {
  const user = new FormData();
  user.append("uid", "18bcs6543");
  user.append("password", "Astar@4");

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

const getTimetable = async (): Promise<TimetableTypes | Error> => {
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

export { getAttendance, getTimetable, getFullAttendance };
