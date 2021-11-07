import { getAxios } from "./AuthAxios";
import { makeQueryString } from "../util/WebUtil";

export async function getReservationList(searchParam) {
  const request = getAxios();

  console.log(makeQueryString(searchParam));
  const res = await request.get("/v1/reservations/contents-timeline?" + makeQueryString(searchParam));
  const data = res.data;
  if (res.status === 200 && data.code === "SUCC") {
    return data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}


// [
//     {
//     "reservationId": 3568,
//     "startTime": "2021-10-02 08:13:00",
//     "endTime": "2021-10-02 09:13:00",
//     "state": "OK",
//     "contents": {
//         "contentsId": 600,
//         "name": "플스Test",
//         "color": "blue",
//         "description": null,
//         "enableReservation": true,
//         "notice": "안 고장났습니다.",
//         "regDate": null,
//         "updDate": null
//     },
//     "members": [
//         {
//             "memberId": 7140,
//             "name": "철수4",
//             "sex": "M",
//             "birth": "2019-09-17",
//             "myPhoneNumber": null,
//             "parentsPhoneNumber": null,
//             "address": null,
//             "school": null,
//             "grade": null,
//             "memo": null
//         }
//     ],
//     "regDate": "2021-10-28T10:50:48.338",
//     "useMinute": 60
//     },
// ]