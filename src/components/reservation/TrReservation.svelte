<script>
    import dayjs from "dayjs";
    export let reservationId = 0;
    export let contents = {};
    export let members = [];
    export let startTime = null;
    export let endTime = null;
    export let useMinute = 0;
    export let regDate = null;
    export let state = null;
    export let i = 0;
    export let goToDetailPage;

    // console.log(reservationId ,contents ,members ,startTime ,endTime ,useMinute ,regDate ,state);

    let memberNames = members.map( m => m.name).join(',');
    let reservationDate = dayjs(startTime).format('YYYY-MM-DD');
    let reservationStime = dayjs(startTime).format('HH:mm');
    let reservationEtime = dayjs(endTime).format('HH:mm');
    let regDateString = dayjs(regDate).format('YYYY-MM-DD HH:mm');
</script>
<tr on:click={() => goToDetailPage(reservationId)} class:cancel={state === 'CANCEL'}>
    <td>{i}</td>
    <td>{reservationId}</td>
    <td>{contents.name}</td>
    <td>{memberNames}</td>
    <td>{reservationDate}</td>
    <td>{reservationStime}~{reservationEtime} ({useMinute}분)</td>
    <td>{regDateString}</td>
    <td>{state === 'OK' ? "예약완료" : "예약취소"}</td>
</tr>
<style>
    td{
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        text-align: center;
        padding: 8px 0;
    }
    tr td:nth-child(1){
        border-left: 1px solid #e2e2e2;
    }
    tr td:last-child{
        border-right: 1px solid #e2e2e2;
    }
    tr:hover{
        font-weight: bolder;
        cursor: pointer;
        border: 1px solid #ffea71;
    }
    tr:hover td{
        border-top: 1px solid #ffea71;
        border-bottom: 1px solid #ffea71;
    }
    tr:hover td:nth-child(1) {
        border-left: 1px solid #ffea71;
    }
    tr:hover td:last-child {
        border-right: 1px solid #ffea71;
    }
    .cancel {
        opacity: 50%;
    }
</style>