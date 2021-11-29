<script>
import dayjs from "dayjs";

import { onMount } from "svelte";
import { getAllContents } from "../../js/service/ContentsService";
import { getSettingData, getTodayOperatingTime } from "../../js/service/SettingService";
import ReservationReadonlyTimeLine from "../ReservationReadonlyTimeLine.svelte";

let contents = [];
let todayOperatingTime = {};
let operatingStartTime = dayjs();
let operatingEndTime = dayjs();
let promise;


async function initData(){
    contents = await getAllContents();
    const settingData = await getSettingData();
    todayOperatingTime = getTodayOperatingTime(settingData);
    operatingStartTime = todayOperatingTime.startTime;
    operatingEndTime = todayOperatingTime.endTime;
}

onMount( async () => {
    promise = initData();
    console.log(operatingStartTime, operatingEndTime);
});
</script>


<div>
    {#await promise}
        loading...
    {:then d} 
        <ReservationReadonlyTimeLine {contents}
                                     {operatingStartTime}
                                     {operatingEndTime} />
    {/await}
</div>