<script>
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import Pagination from "../../components/common/page/Pagination.svelte";
    import CloseIcon from "../../components/common/icon/CloseIcon.svelte";
    import { Chasing } from "svelte-loading-spinners";
    import { getAxios } from '../../js/service/AuthAxios';
    import { makeQueryString } from "../../js/util/WebUtil";
    import { pageContent, setNumber } from "../../js/page_store";
    import page from 'page';
    import TrReservation from '../../components/reservation/TrReservation.svelte';
    import { onMount, tick } from 'svelte';
import config from '../../js/config';
    

    export let querystring;

    let queryObj = new URLSearchParams();

    $ : {
        $pageContent = null;
        queryObj = new URLSearchParams(querystring);
        getList(queryObj.get('page'));
    }

    const titleName = '예약 조회';
    
    let searchParam = {
        cName: null,
        cId: null,
        mName: null,
        mId: null,
        st: '',
        sdt: null,
        edt: null,
        page: null
    };

    let contentsList = null;

    console.log(searchParam);

    const request = getAxios();

    let pageMaxNumber = 0;

    async function getList(pageNum){

        searchParam.cName =queryObj.get('cName') ?? null;
        searchParam.cId =  queryObj.get('cId') ?? '';  
        searchParam.mName =queryObj.get('mName') ?? null;
        searchParam.mId =  queryObj.get('mId') ?? null;  
        searchParam.st =   queryObj.get('st') ?? '';
        searchParam.sdt =  queryObj.get('sdt') ?? null;
        searchParam.edt =  queryObj.get('edt') ?? null;
        searchParam.page = pageNum;

        let tempSearchParam = {...searchParam};
        tempSearchParam.sdt = tempSearchParam.sdt ? tempSearchParam.sdt + ' 00:00:00' : null;
        tempSearchParam.edt = tempSearchParam.edt ? tempSearchParam.edt + ' 00:00:00' : null;

        const res = await request.get('/v1/reservations?' + makeQueryString(tempSearchParam));
        const data = res.data;
        if(res.status === 200 && data.code === 'SUCC'){
            console.log(data);
            pageMaxNumber = data.data.totalElements - (data.data.pageable.pageSize * data.data.number);
            $pageContent = data.data.content;
            setNumber(data.data.number, data.data.totalPages);
        }
        await tick();
    }


    async function searchReservation(){
        page.show('/reservation?' + makeQueryString(searchParam));
    }

    function movePage(pageNum){
        let newQueryObj = new URLSearchParams(querystring);
        newQueryObj.set('page', pageNum);
        page.show('/reservation?' + newQueryObj.toString());
    }

    function enterSearch(e){
        if(e.key === 'Enter'){
            page.show('/reservation?' + makeQueryString(searchParam));
        }
    }

    function clearDateParam(){
        searchParam.sdt = '';
        searchParam.edt = '';
    }
    
    function goToDetailPage(reservationId){
        page.show('/reservation/detail/' + reservationId + '?' + makeQueryString(searchParam));
    }

    async function getContentsList(){
        const request = getAxios();
        
        const res = await request.get('/v1/contents/all?er=true');
        if(res.status === 200 && res.data.code === 'SUCC'){
            console.log(res.data.data);
            return res.data.data;
        }else{
            return [];
        }
    }

    function downloadExcel(){
        if(document.excel.sdt.value !== ''){
            document.excel.sdt.value = document.excel.sdt.value + ' 00:00:00';
        }
        if(document.excel.edt.value !== ''){
            document.excel.edt.value = document.excel.edt.value + ' 00:00:00';
        }
        document.excel.submit();
    }

    onMount( async () => {
        contentsList = await getContentsList();
    })
</script>
<ContentTitle {titleName}/>

<div id="search_area">
    <div class="form_line">
        <div class="form_group">
            <div class="form_name">
                회원이름
            </div>
            <div class="input_form">
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.mName} on:keyup={enterSearch} placeholder="이름을 입력하세요.">
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                콘텐츠
            </div>
            <div class="input_form">
                <select class="input w2" bind:value={searchParam.cId}>
                    {#if contentsList === null}
                        <option value="">loading...</option>
                    {:else if contentsList.length < 1} 
                        <option value="">없음</option>
                    {:else}
                        <option value="">선택 안 함</option>
                        {#each contentsList as c}
                            <option value={'' + c.contentsId}>{c.name}</option>
                        {/each}
                    {/if}
                </select>
            </div>
        </div>
    </div>
    <div class="form_line">
        <div class="form_group">
            <div class="form_name">
                예약일
            </div>
            <div class="input_form">
                <input class="input w3" type="date" max="9999-12-31"  bind:value={searchParam.sdt}>
            </div>
            <div class="middle_line">ㅡ</div>
            <div class="input_form">
                <input class="input w3" type="date" max="9999-12-31"  bind:value={searchParam.edt}>
            </div>
            <div id="r_search_clear_wrapper" on:click={clearDateParam}>
                <CloseIcon width={'0.8em'}/>
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                상태
            </div>
            <div class="input_form">
                <label for="r-type">
                    모두<input class="input w1 radio" id="r-type" type="radio" value="" bind:group={searchParam.st}>
                </label>
                <label for="r-type-ok">
                    예약완료<input class="input w1 radio" id="r-type-ok" type="radio" value="OK" bind:group={searchParam.st}>
                </label>
                <label for="r-type-cancel">
                    예약취소<input class="input w1 radio" id="r-type-cancel" type="radio" value="CANCEL" bind:group={searchParam.st}>
                </label>
            </div>
        </div>
        <div class="form_group form_btn_group">
            <button class="search_btn submit w1" type="button" on:click={searchReservation}>검색</button>
            <button class="download_btn submit w1" type="button"  on:click={downloadExcel}>Download</button>
        </div>
    </div>
</div>

<table>
    <thead>
        <th style="width: 5%;">No</th>
        <th style="width: 5%;">예약번호</th>
        <th style="width: 20%;">콘텐츠</th>
        <th style="width: 20%;">참여자</th>
        <th style="width: 10%;">예약날짜</th>
        <th style="width: 15%;">예약시간</th>
        <th style="width: 15%;">등록일</th>
        <th style="width: 5%;">상태</th>
    </thead>
    <tbody>
        {#if $pageContent === null}
            <td colspan="7" style="text-align: -webkit-center;height: 330px;">
                <Chasing size={65} color={"#FFDC14"} unit={'px'} duration={'1s'}/>
            </td>
        {:else if $pageContent.length === 0}
            <td colspan="6">
                데이터가 없습니다.
            </td>
        {:else}
            {#each $pageContent as r, index}
                <TrReservation reservationId= {r.reservationId}
                            contents = {r.contents}
                            members = {r.members}
                            startTime = {r.startTime}
                            endTime = {r.endTime}
                            useMinute = {r.useMinute}
                            regDate = {r.regDate}
                            state = {r.state}
                            i = {pageMaxNumber - index}
                            {goToDetailPage}/>
            {/each}
        {/if}
    </tbody>
</table>
<div id="page_navigation_wrapper">
    {#if $pageContent !== []}
        <Pagination {movePage}/>
        <!-- <Pagination number = {$pageContent.number}
                    totalPages = {$pageContent.totalPages} 
                    first = {$pageContent.first}
                    last = {$pageContent.last}
                    {getList}/> -->
    {/if}  
</div>

<form name="excel" action={config.excelURL + '/reservations'} style="display:none;">
    <input type="hidden" name="format" value="xls">
    <input type="hidden" name="cName" bind:value={searchParam.cName}>
    <input type="hidden" name="cId" bind:value={searchParam.cId}>
    <input type="hidden" name="mName" bind:value={searchParam.mName}>
    <input type="hidden" name="mId" bind:value={searchParam.mId}>
    <input type="hidden" name="st" bind:value={searchParam.st}>
    <input type="hidden" name="sdt" bind:value={searchParam.sdt}>
    <input type="hidden" name="edt" bind:value={searchParam.edt}>
</form>

<style>
    table{
        width: 100%;
        border-collapse: separate;
        font-size: 15px;
        border-spacing: 0 5px;
    }
    th{
        height: 25px;
        background-color: #ffea71;
    }
    
    #page_navigation_wrapper{
        margin: 40px 0;
    }

    #search_area{
        margin: 20px 0;
    }
    .form_group{
        display: inline-flex;
        align-items: center;
    }

    .form_name{
        width: 65px;
    }
    .input_form > input, select{
        height: 35px;
    }
    .middle_line{
        font-weight: bolder;
        margin: 0 5px;
        color: #d9d9d9;
    }

    .submit{
        width: 85px;
        margin: 0 8px;
    }
    .submit:hover{
        box-shadow: 1px 1px #d9d9d9;
        font-weight: bolder;
        cursor: pointer;
    }
    .download_btn{
        color: white;
        background-color: #217346;
    }
    .search_btn{
        background-color: #ffea71;
    }
    .form_btn_group{
        padding-left: 10%;
    }
    .input.w1.radio{
        width: 30px;
        margin-right: 15px;
    }
    #r_search_clear_wrapper{
        display: flex;
        align-items: center;
        margin-left: 15px;
        cursor: pointer;
    }
</style>