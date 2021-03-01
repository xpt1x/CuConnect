import Api from "./Api";
import { PromiseInterface } from "./request";

Api.get("/attendance").then((res: PromiseInterface) => {
  if (res.ok) console.log(res.data);
  else console.error(res.error);
});
