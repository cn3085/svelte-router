import { getAxios } from "./AuthAxios";
import { makeQueryString } from "../util/WebUtil";

export async function getAllContents() {
  const request = getAxios();

  const res = await request.get("/v1/contents/all");
  if (res.status === 200 && res.data?.code === "SUCC") {
    return res.data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}
