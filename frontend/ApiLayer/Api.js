import { create } from "apisauce";

const localURL = "http://127.0.0.1:8000/pims";
//const productionURL = "https://pocketims.herokuapp.com/api";
const productionURL = "https://imsback.snapatd.tech/api";

const Api = create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? localURL
      : productionURL,
});
//attendence full atte, timetable
export default Api;
