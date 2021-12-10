<script>
  import dayjs from "dayjs";
  import { onMount, tick } from "svelte";
  import { reservationTimeSelection } from "../js/reservation_store";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import TimeTh from "../components/timeline/TimeTh.svelte";
  import TimeTd from "../components/timeline/TimeTd.svelte";
  import { getFilledTimeArray } from "../js/service/TimeLineService";
  import ReservationTd from '../components/timeline/ReservationTd.svelte'

  dayjs.extend(customParseFormat);

  export let contentsId;
  export let operatingStartTime = '00:00:00';
  export let operatingEndTime = '00:00:00';
  export let showScrollDay;
  let scrollInit = false;
  $: if(showScrollDay !== null && !scrollInit){
    // scrollInit = true;
    moveScroll(dayjs(showScrollDay));
  }

  const MINUTE_INTERVAL = 5;
  const LINE_WIDTH = 70;
  let reservationTimeList = [];

  let startDate  = dayjs(operatingStartTime, "HH:mm");
  let endDate = dayjs(operatingEndTime, "HH:mm");

  $: {
    contentsId;
    $reservationTimeSelection.startDate = null;
    $reservationTimeSelection.endDate = null;
    $reservationTimeSelection.startTimeValue = null;
    $reservationTimeSelection.endTimeValue = null;
    reservationTimeList = getFilledTimeArray(startDate, endDate, MINUTE_INTERVAL);
    $reservationTimeSelection.timeList = reservationTimeList;
    console.log('$$$');
  }

  
  async function moveScroll(showScrollDay){
    await tick();
    const timeLineBox = document.querySelector('.time_line_box');
    const CENTER_PADDING = -20;
    if(timeLineBox){
      const converShowScrollDay = dayjs(startDate.format('YYYY-MM-DD') + ' ' + showScrollDay.format('HH:mm'));
      const diffMinute = startDate.diff(converShowScrollDay, 'm') * -1 + CENTER_PADDING;
      // console.log(converShowScrollDay, diffMinute, diffMinute / MINUTE_INTERVAL * LINE_WIDTH)
      timeLineBox.scrollTo({left : diffMinute / MINUTE_INTERVAL * LINE_WIDTH, top: 0, behavior: 'smooth'});
    }
  }
  
  onMount( async () => {
    startDate = dayjs(operatingStartTime, "HH:mm");
    endDate = dayjs(operatingEndTime, "HH:mm");
  })
</script>


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
      {#each $reservationTimeSelection.registedTimeList as r (r.reservationId)}
        <ReservationTd {MINUTE_INTERVAL} todayStartDate={startDate} {LINE_WIDTH} reservation={r}/>
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