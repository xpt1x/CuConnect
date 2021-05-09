import { TimetableType } from "../types/TimetableTypes";
import { FullSubject, Subject } from "../types/Subject";
import { SubjectMarks, Sessions } from "../types/MarksTypes";
import config from "../config";
import { Post } from "../types/PostTypes";
import readCreds from "../utils/readCreds";

const createUserData = async () => {
  const user = new FormData();
  const { creds } = await readCreds();
  if (creds) {
    user.append("uid", creds.uid);
    user.append("password", creds.password);
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

interface PostResponse {
  posts?: ReadonlyArray<Post>;
  error?: string;
}

const getPosts = async (): Promise<PostResponse> => {
  try {
    const response = await fetch(config.imsApiUrl + "/posts");
    return { posts: await response.json() };
  } catch (error) {
    console.log(error);
  }
  return { error: "Error getting posts" };
};

const savePost = async (
  uid: string,
  image: { uri: string; type: string; name: string },
  title = "Test from API"
) => {
  const formData = new FormData();
  formData.append("image", {
    uri: image.uri,
    type: image.type,
    name: image.name,
  });
  formData.append("author", uid);
  formData.append("title", title);
  try {
    const response = await fetch(config.imsApiUrl + `/posts/`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const text = await response.text();
  } catch (e) {
    console.log(e);
  }
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
  getPosts,
  savePost,
};
