<script>
import dayjs from "dayjs";

import { onDestroy, onMount } from "svelte";
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
    // console.log(contents);
    contents = contents.filter( c => c.enableReservation === true);
    const settingData = await getSettingData();
    todayOperatingTime = getTodayOperatingTime(settingData);
    operatingStartTime = todayOperatingTime.startTime;
    operatingEndTime = todayOperatingTime.endTime;
}

onMount( async () => {
    promise = initData();
    // console.log(operatingStartTime, operatingEndTime);
    document.querySelector('body').style.overflow = 'hidden';
});
onDestroy( async () => {
    document.querySelector('body').style.overflow = 'auto';
});
</script>


<div id="time_table_area">
    {#await promise}
        loading...
    {:then d} 
        <ReservationReadonlyTimeLine {contents}
                                     {operatingStartTime}
                                     {operatingEndTime} />
    {/await}
</div>

<style>
    #time_table_area{
        margin-top: 70px;
    }
</style>