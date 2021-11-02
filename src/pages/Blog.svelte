<script>
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { reservationTimeSelection } from "../js/reservation_store";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import TimeTh from "../components/timeline/TimeTh.svelte";
  import TimeTd from "../components/timeline/TimeTd.svelte";
  import { getDateTimeAtThisTime } from "../js/util/TimeUtil";
  import { getFilledTimeArray } from "../js/service/TimeLineService";
  import * as SettingService from "../js/service/SettingService";
  import * as ReservationService from "../js/service/ReservationService";
  import ReservationTd from '../components/timeline/ReservationTd.svelte'
  import DotRed from "../components/member/DotRed.svelte";

  dayjs.extend(customParseFormat);

  let start = '00:00';
  let end = '00:00';

  const MINUTE_INTERVAL = 5;
  
  let startDate  = dayjs(start, "HH:mm");
  let endDate = dayjs(end, "HH:mm");
  
  let reservationTimeList = [];
  
  let registedReservationList = [];

  $: {
    //setting값을 가져와서 timeline 그림
    start;
    end;
    startDate = dayjs(start, "HH:mm");
    endDate = dayjs(end, "HH:mm");

    reservationTimeList = getFilledTimeArray(startDate, endDate, MINUTE_INTERVAL);
    $reservationTimeSelection.timeList = reservationTimeList;
  }
  
  
  onMount( async () => {
    //settings에서 오늘의 운영시간 가져옴
    const settingData = await SettingService.getSettingData();
    const todayOperatingTime = SettingService.getTodayOperatingTime(settingData);

    start = todayOperatingTime.startTime;
    end = todayOperatingTime.endTime;

    console.log({
      sdt: getDateTimeAtThisTime(start),
      edt: getDateTimeAtThisTime(end),
      cId: 600
    });

    //등록된 예약들 가져옴
    registedReservationList = await ReservationService.getReservationList({
      sdt: getDateTimeAtThisTime(start),
      edt: getDateTimeAtThisTime(end),
      cId: 600
    });

    console.log(registedReservationList);
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
                  <TimeTh endDate= {th.endDate}/>
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
                  {#each registedReservationList as r}
                    <ReservationTd {MINUTE_INTERVAL} todayStartDate={startDate} LINE_WIDTH={70} reservation={r}/>
                    <!-- <div class="time_registed" style="background-color:{r.contents.color};left:{70*2}px; width:{r.useMinute / 5 * 70}px" >
                      <div>{dayjs(r.startTime).format('HH:mm')} {dayjs(r.endTime).format('HH:mm')}</div>
                      <div>
                        <DotRed/>최왈왈
                      </div>
                      <div>외 1명</div>
                    </div> -->
                  {/each}
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
      position: relative;
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