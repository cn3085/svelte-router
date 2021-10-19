<script>
    import * as t from "../js/util/TimeUtil";
    import TimeLine from '../components/Booking/TimeLine.svelte';

    const nowDate = t.getDate();

    const disabledTime = [
        {
            stime: '2021-10-19 00:15:00',
            etime: '2021-10-19 00:30:00'
        },
        {
            stime: '2021-10-19 00:55:00',
            etime: '2021-10-19 01:00:00'
        }
    ]

    //const atimeList = [].fill(() => dayjs(now).add(5, 'minute'), 0, 12);
    

</script>
<div>
    <TimeLine {nowDate} {disabledTime}/>
</div>