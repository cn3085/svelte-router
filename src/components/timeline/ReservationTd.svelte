<script>
    import dayjs from 'dayjs';
    import DotRed from '../../components/member/DotRed.svelte'
    import DotBlue from '../../components/member/DotBlue.svelte'
    import MembersBaloon from './MembersBaloon.svelte';
    import page from 'page';
    export let reservation = {};
    export let todayStartDate = dayjs();
    export let MINUTE_INTERVAL = 5;
    export let LINE_WIDTH = 0;

    let startTime;
    let endTime;
    let useMinute;
    let color;
    $: members = [];
    let leftCount;
    let widthCount;

   
    $: {
        startTime = dayjs(reservation.startTime);
        endTime = dayjs(reservation.endTime);
        useMinute= reservation.useMinute;
        color = reservation.contents.color;
        members = reservation.members;
        let reservationDayDate = dayjs(startTime.format('YYYY-MM-DD') + ' ' + todayStartDate.format('HH:mm'));
        leftCount = startTime.diff(reservationDayDate, 'm') / MINUTE_INTERVAL;
        widthCount = useMinute / MINUTE_INTERVAL;

        // console.log(reservation.reservationId, members)
    }


    $: membersCount = members.length;

    function showThisReservationPage(){
        window.open('/reservation/detail/' + reservation.reservationId);
    }
</script>

<div class="time_registed" style="background-color:{color}95;left:{leftCount * LINE_WIDTH}px; width:{widthCount * LINE_WIDTH}px">
    <div class="label" style="border-top-color:{color}" on:click={showThisReservationPage}></div>
    <div>
        {dayjs(startTime).format('HH:mm')}
        <div style="display: inline-block;">~</div>
        {dayjs(endTime).format('HH:mm')}
    </div>
    <div class="member_name">
        {#if members[0].sex === 'M'}
            <DotBlue/>
        {:else}
            <DotRed/>
        {/if}
        {members[0].name}
    </div>
    {#if membersCount > 1}
        <div>외 {membersCount - 1}명</div>    
    {/if}
    <MembersBaloon {members} />
</div>

<style>
.time_registed{
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-weight: bolder;
    top: 0px;
    height: 110px;
    border: 1px solid rgba(255,255,255,0.2);
    /* border-radius: 5px; */
    backdrop-filter: blur(1px);
    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.3); */
}
.time_registed .member_name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
    margin: 0 auto;
}
.time_registed .label{
    cursor: pointer;
    width: 0;
    height: 0;
    border-top: 20px solid;
    border-right: 20px solid transparent;
    position: absolute;
    top: 3px;
    left: 3px;
}
</style>



<!-- {
    "reservationId": 3850,
    "startTime": "2021-11-02 10:15:00",
    "endTime": "2021-11-02 10:30:00",
    "state": "OK",
    "contents": {
        "contentsId": 600,
        "name": "플스Test",
        "color": "#5781ff",
        "description": null,
        "enableReservation": true,
        "notice": null,
        "regDate": "2021-10-28T10:49:56.296",
        "updDate": "2021-11-01T14:32:44.063"
    },
    "members": [
        {
            "memberId": 7169,
            "name": "철수33",
            "sex": "M",
            "birth": "2001-01-23",
            "myPhoneNumber": null,
            "parentsPhoneNumber": null,
            "address": null,
            "school": null,
            "grade": null,
            "memo": null
        },
        {
            "memberId": 7170,
            "name": "철수34",
            "sex": "M",
            "birth": "2016-03-06",
            "myPhoneNumber": null,
            "parentsPhoneNumber": null,
            "address": null,
            "school": null,
            "grade": null,
            "memo": null
        }
    ],
    "regDate": "2021-11-02T09:21:16.526",
    "useMinute": 15
} -->