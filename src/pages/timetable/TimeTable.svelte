<script>
import dayjs from "dayjs";

import { onMount } from "svelte";
import config from "../../js/config";
import { getAllContents } from "../../js/service/ContentsService";
import { getSettingData, getTodayOperatingTime } from "../../js/service/SettingService";
import ReservationReadonlyTimeLine from "../ReservationReadonlyTimeLine.svelte";

let socket = null;
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


    socket = new WebSocket(config.socketURL);

    socket.onopen = function(e){
        console.log('socket open.', e);	
    }

    socket.onmessage = function(e){
        console.log('socket message', e);
    }

    socket.onclose = function(e){
        if(e.wasClean){
            console.log('socket close. ', e.code, e.reason);
        }else{
            console.error('socker close on error. ', e);
        }
    }

    socket.onerror = function(e){
        console.error(e);
    }
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