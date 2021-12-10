<script>
import dayjs from "dayjs";
import { onDestroy, onMount } from "svelte";
import ContentTitle from "../../components/common/ContentTitle.svelte";
import { getAllContents } from "../../js/service/ContentsService";
import { getSettingData, getTodayOperatingTime } from "../../js/service/SettingService";
import ReservationTodayTimeLine from "../ReservationTodayTimeLine.svelte";

const titleName = '오늘의 예약' ;
let contents = [];
let todayOperatingTime = {};
let operatingStartTime = dayjs();
let operatingEndTime = dayjs();
let promise;

let searchDate = dayjs().format('YYYY-MM-DD');

async function initData(){
    contents = await getAllContents();
    contents = contents.filter( c => c.enableReservation === true);
    const settingData = await getSettingData();
    todayOperatingTime = getTodayOperatingTime(settingData);
    operatingStartTime = todayOperatingTime.startTime;
    operatingEndTime = todayOperatingTime.endTime;
}

onMount( async () => {
    promise = initData();
    document.querySelector('body').style.overflow = 'hidden';
});

onDestroy( async () => {
    document.querySelector('body').style.overflow = 'auto';
})
</script>


<ContentTitle {titleName}/>
<div class="dayRangePicker">
    <input type="date" bind:value={searchDate}> 
</div>
<div id="time_table_area">
    {#await promise}
        loading...
    {:then d} 
        <ReservationTodayTimeLine {contents}
                                  reservationDay={searchDate}
                                  {operatingStartTime}
                                  {operatingEndTime} />
    {/await}
</div>

<style>
.dayRangePicker{
    width: fit-content;
    color: #4c4c4e;
    margin: 20px 6px 16px 21px;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
}
</style>