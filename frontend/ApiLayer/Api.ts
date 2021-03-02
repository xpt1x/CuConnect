import Request from "./request";
const localURL = "http://192.168.1.10:8000/pims";
//const productionURL = "https://pocketims.herokuapp.com/api";
const productionURL = "https://imsback.snapatd.tech/api";

const Api = new Request(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? localURL
    : productionURL
);
//attendence full atte, timetable
export default Api;
