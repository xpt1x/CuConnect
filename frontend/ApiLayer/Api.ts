import Request from "./request";
const localURL = "https://cuconnect-back.herokuapp.com/pims";
//const productionURL = "https://pocketims.herokuapp.com/api";
const productionURL = "https://cuconnect-back.herokuapp.com/pims";

const Api = new Request(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? localURL
    : productionURL
);
//attendence full atte, timetable
export default Api;
