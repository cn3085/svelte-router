<script>
  import dayjs from "dayjs";
  import { onDestroy, onMount, tick } from "svelte";
  import config from "../js/config";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import TimeTh from "../components/timeline/TimeTh.svelte";
  import TimeTd from "../components/timeline/TimeTd.svelte";
  import { getFilledTimeArray } from "../js/service/TimeLineService";
  import * as ReservationService from "../js/service/ReservationService";
  import ReservationTd from '../components/timeline/ReservationTd.svelte'

  dayjs.extend(customParseFormat);

  export let contents = [];
  export let reservationDay =  dayjs().format('YYYY-MM-DD');
  export let operatingStartTime = '00:00:00';
  export let operatingEndTime = '00:00:00';
  export let showScrollDay = dayjs();

  let socket;

  $: registedReservationMap = {};

  let scrollInit = false;
  $: if(showScrollDay !== null && !scrollInit){
    moveScroll(dayjs(showScrollDay));
  }

  $: {
    reservationDay;
    getAllRegistedReservation();
  }

  const MINUTE_INTERVAL = 5;
  const LINE_WIDTH = 70;
  let reservationTimeList = [];

  let startDate  = dayjs(operatingStartTime, "HH:mm");
  let endDate = dayjs(operatingEndTime, "HH:mm");

  
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


  function getRegistReservationList(contentsId, reservationDate){
    return ReservationService.getReservationList({
        sdt: reservationDate + ' ' + dayjs(startDate).format('HH:mm:ss'),
        edt: reservationDate + ' ' + dayjs(endDate).format('HH:mm:ss'),
        cId: contentsId
    }).then((data) => {
      registedReservationMap[contentsId].data = data;
    })
  }
  
  
  function getAllRegistedReservation(){
    for( let c of contents){
      // console.log(c.contentsId, c.name);
      const promise = getRegistReservationList(c.contentsId, reservationDay);
      registedReservationMap[c.contentsId] = {promise : promise};
    }
  }


  
  onMount( async () => {
    startDate = dayjs(operatingStartTime, "HH:mm");
    endDate = dayjs(operatingEndTime, "HH:mm");
    reservationTimeList = getFilledTimeArray(startDate, endDate, MINUTE_INTERVAL);
    getAllRegistedReservation();
    moveScrollPerMinute();

    socket = new WebSocket(config.socketURL);

    socket.onopen = function(e){
      console.log('socket open.', e);
    }
      
    socket.onmessage = function(e){
      console.log('socket message', e);
      console.log('socket message', e.data);
      let contentsId = e.data;
      getRegistReservationList(contentsId, reservationDay);
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
  })

  onDestroy( async () => {
    clearInterval(scrollIntervalId);
    socket.close();
  })

  function motivationLeftContentsList(e){
    const con = document.querySelector('.contents_name_box');
    let top = e.target.scrollTop;
    con.scrollTo(0, top);
    
    const time = document.querySelector('.time_line');
    let left = e.target.scrollLeft;
    time.scrollTo(left, 0);
  }

  let scrollIntervalId;
  function moveScrollPerMinute(){
    scrollIntervalId = setInterval(() => {
      moveScroll(dayjs())
    }, 1000 * 60 * 5);
  }
</script>

  <div class="time_line">
    <div class="time_head start">
      <div class="time_number">{('' + startDate.get('h')).padStart(2, '0')}</div>
    </div>
    {#each reservationTimeList as th}
      <TimeTh endDate= {th.endDate}/>
    {/each}
  </div>
  <div class="contents_time_line">
    <div class="contents_name_box">
      {#each contents as c}
        <div class="contents_name" style="background:{c.color};">{@html c.name.replaceAll(' ', '<br/>')}</div>
      {/each}
    </div>

    <div class="time_line_box" on:scroll={motivationLeftContentsList}>

      {#each contents as c}
          <div class="time_schedule">
            <div class="time_schedule_line_box">
              <div class="time_td start"></div>
              {#each reservationTimeList as th}
                <TimeTd {...th}/>
              {/each}
            </div>
            {#await registedReservationMap[c.contentsId]?.promise}
            {:then d} 
            <div class="time_schedule_content_box"></div>
              {#if registedReservationMap[c.contentsId]}
                {#each registedReservationMap[c.contentsId].data as r}
                  <ReservationTd {MINUTE_INTERVAL} todayStartDate={startDate} {LINE_WIDTH} reservation={r}/>
                {/each}
              {/if}
            {/await}
            </div>
      {/each}

    </div>
  </div>

<style>
  body{
    overflow: hidden;
  }
  .contents_time_line{
    display: flex;
  }
  .contents_name_box{
    margin-top: 31px;
    height: 698px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .time_line_box{
      flex-shrink: 0;
      width: 1270px;
      height: 710px;
      /* border: 1px solid black; */
      overflow: scroll;
      margin-top: 31px;
  }
  .time_line{
      position: fixed;
      display: flex;
      width: 1260px;
      overflow: hidden;
      align-items: flex-end;
      margin: 0 20px;
      margin-left: 130px;
      padding-left: 10px;
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
    box-sizing: border-box;
  }
  .contents_name{
    text-align: center;
    font-weight: bolder;
    border-radius: 5px;
    width: 120px;
    height: 110px;
    padding: 29px 17px;
    flex-shrink: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow:  -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  }
  :global(.time_td){
    border-bottom: 1px solid #a6a6a7;
  }
</style>