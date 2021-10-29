<script>
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import TimeHead from "../components/timeline/TimeHead.svelte";
import TimeTd from "../components/timeline/TimeTd.svelte";

  dayjs.extend(customParseFormat);

  const start = '8:00:00';
  const end = '20:00:00';

  const MINUTE_INTERVAL = 5;

  const startDate = dayjs(start, "HH:mm:ss");
  const endDate = dayjs(end, "HH:mm:ss");

  console.log(startDate.add(MINUTE_INTERVAL, 'minute'));

  let addMinuteTime = startDate;

  let timeHeadList = [];

  while(addMinuteTime.diff(endDate) <= 0){

    timeHeadList.push({
      h: addMinuteTime.get('h'),
      m: addMinuteTime.get('m'),
    });

    addMinuteTime = addMinuteTime.add(MINUTE_INTERVAL, 'minute');
  }

  console.log(timeHeadList);
</script>

<div class="form_line">
  <div class="form_group">
      <div class="form_name">
          time
      </div>
      <div class="input_form">
          <div class="time_line_box">
              <div class="time_line">
                {#each timeHeadList as th}
                  <TimeHead h={th.h} m={th.m}/>
                {/each}
              </div>
              <div class="time_schedule">
                <div class="time_schedule_line_box">
                  {#each timeHeadList as th}
                    <TimeTd m={th.m}/>
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

</style>