import { getAxios } from "./AuthAxios";
import { makeQueryString } from "../util/WebUtil";

export async function getMostUsedMember(cId, sd, ed) {
  const request = getAxios();

  const queryString = makeQueryString({
    cId: cId,
    sd: sd,
    ed: ed,
  });

  // console.log(queryString);

  const res = await request.get(
    "/v1/statistics/most-used-member?" + queryString
  );
  if (res.status === 200 && res.data?.code === "SUCC") {
    return res.data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}

export async function getUsingAverageContents(cId, sd, ed) {
  const request = getAxios();

  const queryString = makeQueryString({
    cId: cId,
    sd: sd,
    ed: ed,
  });

  const res = await request.get(
    "/v1/statistics/using-average-contents?" + queryString
  );
  if (res.status === 200 && res.data?.code === "SUCC") {
    return res.data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}

export async function getTotalUseTimeContents(cId, sd, ed) {
  const request = getAxios();

  const queryString = makeQueryString({
    cId: cId,
    sd: sd,
    ed: ed,
  });

  const res = await request.get(
    "/v1/statistics/total-usetime-contents?" + queryString
  );
  if (res.status === 200 && res.data?.code === "SUCC") {
    return res.data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}

export async function getUsetimeByBirth(cId, sd, ed) {
  const request = getAxios();

  const queryString = makeQueryString({
    cId: cId,
    sd: sd,
    ed: ed,
  });

  const res = await request.get(
    "/v1/statistics/usetime-by-birth?" + queryString
  );
  if (res.status === 200 && res.data?.code === "SUCC") {
    return res.data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}
