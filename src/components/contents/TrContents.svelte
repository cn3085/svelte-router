<script>
    import * as day from "../../js/util/TimeUtil";
    export let contentsId = 0;
    export let name = '';
    export let enableReservation = '';
    export let regDate = '';
    export let i = 0;
    export let goToDetailPage;

</script>
<tr on:click={() => goToDetailPage(contentsId)} class:disabled_contents={enableReservation === false}>
    <td>{i}</td>
    <td>{name}</td>
    <td>
        {enableReservation === true ? '가능' : '불가능'}
    </td>
    <td>{day.formatting(regDate)}</td>
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

    .disabled_contents {
        opacity: 50%;
    }
</style>