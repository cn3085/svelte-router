<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import router from 'page'
    import { onMount, tick } from 'svelte';
    import page from 'page';
    import dayjs from 'dayjs';
    import config from "../../js/config";
    import customParseFormat from "dayjs/plugin/customParseFormat";
    import AutoComplete from 'simple-svelte-autocomplete';
    import DotRed from '../../components/member/DotRed.svelte';
    import DotBlue from '../../components/member/DotBlue.svelte';
    import CloseIcon from '../../components/common/icon/CloseIcon.svelte'
    import ReservationShowTimeLine from '../ReservationShowTimeLine.svelte';
    import { reservationTimeSelection, setTime, initTime } from "../../js/reservation_store";
    import * as ReservationService from "../../js/service/ReservationService";
    import { getDateTimeAtThisTime } from "../../js/util/TimeUtil";
    import * as SettingService from "../../js/service/SettingService";

    dayjs.extend(customParseFormat);
    let socket;

    export let params;
    export let querystring;

    const reservationId = params.id;

    const titleName = '예약 조회';
    
    let operatingStartTime;
    let operatingEndTime;

    let originReservationStartDate;
    let originReservationStartTime;
    let originReservationEndDate;
    let originReservationEndTime;
    let originSelectedContents;

    let memo;

    let state = 'Y';

    $ : selectedContents = null;

    async function getContentsList(){
        const request = getAxios();

        const res = await request.get('/v1/contents/all?er=true');
        if(res.status === 200 && res.data.code === 'SUCC'){
            return res.data.data;
        }
    }

    let searchKeyword = '';
    let selectedMembers = [];

    $: {
        selectedMembers;
        if(document.querySelector('#search_member_input') !== null){
            document.querySelector('#search_member_input').value = '';
        }
    }

    async function searchFunction(searchWord){
        const request = getAxios();
        const res = await request.get('/v1/members/all?nm=' + searchWord);
        return res.data.data;
    }

    function valueFunction(member){
        if(!member){
            return;
        }

        const sameMember = selectedMembers.filter( m => m.memberId === member.memberId);
        if(sameMember.length === 0){
            selectedMembers = [...selectedMembers, member];
        }
        searchKeyword = '';
    }

    function removeMember(memberId){
        selectedMembers = selectedMembers.filter( m => m.memberId !== memberId);
    }

    
    async function selectContents(contents){
        selectedContents = contents;
        const reservationDate = originReservationStartDate;
        const loading = document.querySelector('#loading');
        loading.style.display = 'block';
        $reservationTimeSelection.registedTimeList =  await getRegistReservationList(selectedContents.contentsId, reservationDate);
        loading.style.display = 'none';

        console.log($reservationTimeSelection.registedTimeList);
    }

    async function getRegistReservationList(contentsId, reservationDate){

        const registedReservationList = await ReservationService.getReservationList({
            sdt: reservationDate + ' ' + operatingStartTime,
            edt: reservationDate + ' ' + operatingEndTime,
            cId: contentsId
        });
        return registedReservationList.filter( r => r.reservationId != reservationId);
    }


    async function updateReservation(){
        const members = selectedMembers.map( m => {
            return {
                "memberId" : m.memberId
            }
        });

        if(members === null || members.length < 1){
            alertError(5000, '참여자를 1명 이상 선택해주세요.');
            return;
        }
        if(selectedContents === null || !selectedContents.contentsId){
            alertError(5000, '콘텐츠를 선택해주세요.');
            return;
        }
        if($reservationTimeSelection.startDate == null || $reservationTimeSelection.endDate == null){
            alertError(5000, '예약 시간을 선택해주세요.');
            return;
        }

        if(!confirm('예약을 수정하시겠습니까?')){
            return false;
        }
        let requestBody = {
            "reservationId" : reservationId,
            "state" : state,
            "startTime" : `${originReservationStartDate} ${$reservationTimeSelection.startTimeValue}:00`,
            "endTime" : `${originReservationStartDate} ${$reservationTimeSelection.endTimeValue}:00`,
            "contents" : {
                "contentsId" : selectedContents.contentsId
            },
            "members" : members,
            "memo" : memo
        }
        
        try{
            const request = getAxios();
            const res = await request.put('/v1/reservations', requestBody);

            if(res.status === 200 && res?.data.code === 'SUCC'){
                let oldSelectedContents = originSelectedContents.contentsId;

                originReservationStartTime = $reservationTimeSelection.startTimeValue;
                
                originReservationEndTime = $reservationTimeSelection.endTimeValue;
                
                originSelectedContents = selectedContents;

                socket.send(oldSelectedContents);
                socket.send(selectedContents.contentsId);

                alertSuccess(3000, res.data.message);
            }else{
                handleExpectedException(res);
            }
        }catch(err){
            console.log(err);
            if(err.response?.status === 401){
                alertError('로그인 후 시도해주세요.');
                return;
            }
        }
    }


    function handleExpectedException(res){
        if(res.status === 200 && res?.data.code === 'R_RESTRICT_CONTENTS'){
            alertError(5000, res.data.message);
        }else if(res.status === 200 && res?.data.code === 'R_DOUBLE_BOOKING'){
            alertError(5000, res.data.message)
        }else if(res.status === 200 && res?.data.code === 'R_CONTAINS_ANOTHER_RESERVATION'){
            const errorMembers = res.data.data;
            const errMessage = errorMembers.map( m => {
                const memberName = m.name;
                const registedRservation = m.reservations.map( r => dayjs(r.startTime).format('HH:mm') + '~' + dayjs(r.endTime).format('HH:mm') + '/' + r.contents.name).join('');
                return `${memberName} (${registedRservation})`;
            }).join('<br/>');

            alertError(10000, res.data.message, errMessage);
        }else if(res.status === 200 && res?.data.code === 'R_OVERTIME_USE_MEMBER'){
            const errorMembers = res.data.data;
            const errMessage = errorMembers.map( m => {
                return `${m.name}(${m.birth}) 현재까지 사용시간: ${m.usedMinute}분`;
            }).join('<br/>');
            
            alertError(10000, res.data.message, errMessage);
        }else{
            alertError(10000, res.data.message);
        }
    }


    function cancelReservation(){
        if(!confirm('정말로 예약을 취소하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.put('/v1/reservations/' + reservationId + '/cancel')
        .then(res => {
            if(res.status === 200 && res.data.code === 'SUCC'){
                socket.send(originSelectedContents.contentsId);
                alertSuccess(3000, res.data.message);
                // page.redirect('/reservation/detail/' + reservationId);
                window.location.reload();
            }
        })
        .catch(res => {
            console.error(res);
            router.replace('/login');
        })
    }


    function removeReservation(){
        if(!confirm('정말로 예약을 삭제하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.delete('/v1/reservations/' + reservationId)
        .then(res => {
            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
                page.replace('/reservation')
            }
        })
        .catch(res => {
            console.error(res);
            router.replace('/login');
        })
    }


    function goToListPage(){
        page.show('/reservation?' + querystring);
    }


    async function bindReservationData(reservationData){
        selectedMembers = reservationData.members;

        originReservationStartDate = dayjs(reservationData.startTime).format('YYYY-MM-DD');
        originReservationStartTime = dayjs(reservationData.startTime).format('HH:mm');

        originReservationEndDate = dayjs(reservationData.endTime).format('YYYY-MM-DD');
        originReservationEndTime = dayjs(reservationData.endTime).format('HH:mm');

        originSelectedContents = reservationData.contents;
        state = reservationData.state;

        memo = reservationData.memo;

        state = reservationData.state;
        await selectContents(reservationData.contents);
        initTime(reservationData.startTime, reservationData.endTime);
        await tick();
    }


    let promise;
    onMount(async () => {
        const settingData = await SettingService.getSettingData();
        const todayOperatingTime = SettingService.getTodayOperatingTime(settingData);

        operatingStartTime = todayOperatingTime.startTime;
        operatingEndTime = todayOperatingTime.endTime;

        const request = getAxios();
        request.get('/v1/reservations/' + reservationId)
                .then( async res => {
                    if(res.status === 200 && res.data.code === 'SUCC'){
                        promise = await bindReservationData(res.data.data);
                    }else{
                        alertError(5000, '해당 예약의 정보를 조회할 수 없습니다.');
                    }
                })
                .catch( res => {
                    console.error(res);
                    alertError(5000, '해당 예약의 정보를 조회할 수 없습니다.');
                });

        
        window.scrollTo(0,0);


        socket = new WebSocket(config.socketURL);

        socket.onopen = function(e){
            console.log('socket open.', e);	
        }

        socket.onmessage = function(e){
            console.log('socket message', e);
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
</script>
<ContentTitle {titleName}/>
<div id="content_body">
    <div class="form_content">
        <div class="form_line">
            <div class:cancel_wrapper={state === 'CANCEL'}></div>
            <div class="form_group">
                <div class="form_name">
                    참여자
                </div>
                <div class="input_form">
                    <AutoComplete
                        id="search_member_input"
                        inputId="search_member_input"
                        bind:selectedItem={searchKeyword}
                        searchFunction={searchFunction}
                        valueFunction={valueFunction}
                        labelFieldName="name"
                        delay=200
                        localFiltering=false
                        noResultsText="검색 결과가 없습니다.">
                        
                        <div class="auto_result_box" slot="item" let:item={item} let:label={label}>
                            {#if item.sex === 'M'}
                                <DotBlue/>
                                {:else}
                                <DotRed/>
                            {/if}
                            {@html label.replaceAll('<b></b>', '')}
                            <span class="small_text">({item.birth})</span>
                        </div>

                    </AutoComplete>
                </div>
            </div>
            <div class="form_group">
                <div class="input_form items_box">
                    {#each  selectedMembers as m}
                        <div class="join_member">
                            {#if m.sex === 'M'}
                                <DotBlue/>
                                {:else}
                                <DotRed/>
                            {/if}
                            <div>
                                <div class="join_name">{m.name}</div>
                                <div class="join_birth">{m.birth}</div>
                            </div>
                            <div class="remove_member_btn" on:click={() => removeMember(m.memberId)}>
                                <CloseIcon width='0.6em'/>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class:cancel_wrapper={state === 'CANCEL'}></div>
            <div class="form_group">
                <div class="form_name">
                    콘텐츠 - {originSelectedContents?.name}
                </div>
                <div class="input_form items_box">
                    {#await getContentsList()}
                        <div>컨텐츠 정보를 불러오는 중입니다.</div>
                    {:then contentsList} 
                        {#each contentsList as c}
                            <button class="input w2 contents_item"
                                    class:selected_contents={selectedContents !== null && selectedContents.contentsId === c.contentsId}
                                    on:click={() => selectContents(c)}>
                                    {c.name}
                            </button>
                        {/each}
                    {/await}
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class:cancel_wrapper={state === 'CANCEL'}></div>
            <div class="form_group">
                <div class="form_name">
                    시작시간
                </div>
                <div class="input_form">
                    <input class="input w2" type="time" maxlength="15" bind:value={$reservationTimeSelection.startTimeValue} readonly disabled>
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    종료시간
                </div>
                <div class="input_form">
                    <input class="input w2" type="time" maxlength="15"  bind:value={$reservationTimeSelection.endTimeValue} readonly disabled>
                </div>
            </div>
        </div>
        
        <div class="form_line">
            <div class:cancel_wrapper={state === 'CANCEL'}></div>
            <div class="form_group">
                <div class="form_name">
                    예약 시간 - {originReservationStartDate} ({originReservationStartTime} ~ {originReservationEndTime})
                    
                </div>
                <div class="input_form">
                    <div id="loading"></div>
                    {#if selectedContents !== null}
                        {#await promise}
                            로딩
                        {:then p} 
                            <ReservationShowTimeLine contentsId={selectedContents.contentsId}
                                                    showScrollDay={$reservationTimeSelection.startDate}
                                                    {operatingStartTime}
                                                    {operatingEndTime} />
                        {/await}
                    {/if}
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    메모
                </div>
                <div class="input_form">
                    <textarea class="input w8" cols="40" rows="40" maxlength="500" bind:value={memo}></textarea>
                </div>
            </div>
        </div>
        
        <div class="form_line w10">
            {#if state === 'OK'}
                <div class="form_group button_group">
                    <button class="success_btn submit w2" type="button" on:click={updateReservation}>예약 수정</button>
                </div>
                <div class="form_group button_group">
                    <button class="warn_btn submit w2" type="button" on:click={cancelReservation}>예약 취소</button>
                </div>
            {:else}
                <div class="form_group button_group">
                    <button class="success_btn submit w2" type="button" on:click={updateReservation}>예약 수정</button>
                </div>
                <div class="form_group button_group">
                    <button class="warn_btn submit w2" type="button" on:click={removeReservation}>예약 삭제</button>
                </div>
            {/if}
            <div class="form_group button_group list_btn stick_r" on:click={goToListPage}>
                <ListIcon width="1.8em"/>
            </div>
        </div>
    </div>
</div>
<style>
    :global(#search_member_input){
        padding: 1px 2px 1px 36px;
        width: 264px;
        border-radius: 5px;
        box-shadow: 0 3px 5px 0 rgb(0 0 0 / 25%);
        height: 38px;
        border: 1px solid white;
    }
    :global(.autocomplete-list){
        margin-top: 4px;
        border: solid 1px #bfbfbf;
        border-radius: 5px;
    }
    :global(.autocomplete-list-item .auto_result_box){
        color: #bfbfbf !important;
    }
    :global(.autocomplete-list-item.selected){
        color: #4c4c4e !important;
        background-color: #ffea71 !important;
    }
    :global(.autocomplete-list-item.selected .auto_result_box){
        color: #4c4c4e !important;
        background-color: #ffea71 !important;
    }
    .items_box{
        display: flex;
        flex-wrap: wrap;
        width: 700px;
    }
    .contents_item{
        margin: 10px 20px 10px 0;
    }
    .selected_contents{
        background-color: #ffea71;
    }
    .small_text{
        font-size: 10px;
    }
    :global(.autocomplete-list-item.selected .small_text){
        color: #4c4c4e !important;
    }
    :global(.autocomplete-list-item .small_text){
        color: #bfbfbf !important;
    }
    .join_member{
        display: flex;
        align-items: center;
        width: max-content;
        height: 100%;
        padding: 5px 10px;
        margin: 10px 11px 0 0;
        border-radius: 10px;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        border: dashed 1px #c7c7c7;
        background-color: #fff;
    }
    .join_member .join_name{
        margin-right: 5px;
    }
    .join_member .join_birth{
        font-size: 8px;
        line-height: 8px;
        color: #ababab;
    }
    .remove_member_btn{
        cursor: pointer;
        color: #ff4e4e;
    }
    #loading{
        display: none;
        width: 100%;
        height: 155px;
        position: absolute;
        background: grey;
        z-index: 1;
        opacity: 0.4;
        border-radius: 5px;
    }
    .cancel_wrapper{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        cursor:not-allowed;
    }
    .form_line{
        position: relative;
    }
</style>