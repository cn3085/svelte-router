<script>
  import dayjs from "dayjs";
  import { getFilledTimeArray } from "../js/service/TimeLineService";
  import { reservationTimeSelection } from "../js/reservation_store";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import TimeHead from "../components/timeline/TimeHead.svelte";
  import TimeTd from "../components/timeline/TimeTd.svelte";
  import { onMount } from "svelte";
  import * as SettingService from "../js/service/SettingService";

  dayjs.extend(customParseFormat);

  let start = '00:00';
  let end = '00:00';

  const MINUTE_INTERVAL = 5;
  
  const startDate = dayjs(start, "HH:mm");
  const endDate = dayjs(end, "HH:mm");
  
  let reservationTimeList = getFilledTimeArray(startDate, endDate, MINUTE_INTERVAL);
  
  $reservationTimeSelection.timeList = reservationTimeList;
  
  onMount( async () => {
    const settingData = await SettingService.getSettingData();
    const todayOperatingTime = SettingService.getTodayOperatingTime(settingData);
    
    console.log(todayOperatingTime);

    start = todayOperatingTime.startTime;
    end = todayOperatingTime.endTime;

  })
</script>

<div class="form_line">
  <div class="form_group">
      <div class="form_name">
          time
      </div>
      <div class="input_form">
          <div class="time_line_box">
              <div class="time_line">
                <div class="time_head start"> 
                  <div class="time_number">{('' + startDate.get('h')).padStart(2, '0')}</div>
                </div>
                {#each reservationTimeList as th}
                  <TimeHead endDate= {th.endDate}/>
                {/each}
              </div>
              <div class="time_schedule">
                <div class="time_schedule_line_box">
                  <div class="time_td start"></div>
                  {#each $reservationTimeSelection.timeList as th}
                    <TimeTd {...th}/>
                  {/each}
                </div>
                <div class="time_schedule_content_box"></div>
              </div>
          </div>
      </div>
  </div>
</div>
<style>
  .time_line_box{
        height: 155px;
        /* border: 1px solid black; */
        width: 900px;
        overflow: scroll;
        overflow-y: hidden;
    }
    .time_line{
        display: flex;
        width: 100%;
        align-items: flex-end;
        margin: 0 20px;
    }
    .time_line_box::-webkit-scrollbar {
        height: 12px;
    }
    .time_line_box::-webkit-scrollbar-thumb {
        background-color: #d1d1d1;
        border-radius: 5px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    .time_line_box::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 5px;
        box-shadow: inset 0px 0px 5px white;
    }
    .time_schedule{
      margin: 0 20px;
    }

    .time_schedule_line_box{
      display: flex;
    }
    .time_head.start{
        width: 0px;
        height: 10px;
        margin-top: 20px;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }
    .time_head.start .time_number{
        position: inherit;
        color: black;
        font-size: 16px;
        left: -9px;
        top: -22px;
    }
    .time_td.start{
        border-left: 1px solid black;
        height: 110px;
        width: 0px;
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: auto;
    }
</style>