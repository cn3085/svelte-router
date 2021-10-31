import { getAxios } from "./AuthAxios";

export function getSettingData() {
  const request = getAxios();

  const res = await request.get("/v1/settings?");
  const data = res.data;
  if (res.status === 200 && data.code === "SUCC") {
    return data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}
