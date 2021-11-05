<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import AutoComplete from 'simple-svelte-autocomplete';
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import page from 'page';
    import { onMount } from 'svelte';
    import DotRed from '../../components/member/DotRed.svelte';
    import DotBlue from '../../components/member/DotBlue.svelte';
    import CloseIcon from '../../components/common/icon/CloseIcon.svelte'
    import Blog from '../Blog.svelte';
    import { reservationTimeSelection } from "../../js/reservation_store";

    const titleName = '예약 등록';

    $ : selectedContents = null;
    let contentsList = [];

    async function getContentsList(){
        const request = getAxios();

        const res = await request.get('/v1/contents/all?er=true');
        if(res.status === 200 && res.data.code === 'SUCC'){
            contentsList = res.data.data;
            console.log(contentsList);
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

    async function searchFunction(){
        const request = getAxios();
        const res = await request.get('/v1/members/all');
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

    onMount( async () => {
        await getContentsList();
    })

    
    async function selectContents(contents){
        selectedContents = contents;
        $reservationTimeSelection.registedTimeList =  await getRegistReservationList(contentsId);
        console.log(selectedContents);
    }


    async function registMember(){
        const emptyRequiredKey = Object.keys(member).filter( key => member[key].require && !member[key].value);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 성별, 생년월일은 필수값입니다.');
            return false;
        }

        
        try{
            const request = getAxios();
            const res = await request.post('/v1/members', {
                name: member.name.value,
                sex: member.sex.value,
                birth: member.birth.value,
                myPhoneNumber: member.myPhoneNumber.value,
                parentPhoneNumber: member.parentPhoneNumber.value,
                school: member.school.value,
                grade: member.grade.value,
                memo: member.memo.value
            });

            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
                page.replace('/member/detail/' + res.data.data.memberId);
            }
        }catch(err){
            console.log(err);
            console.log( '>>', err.message);
            console.log(err.response);
            console.log(err.response.status);
            if(err.response.status === 401){
                alertError('로그인 후 시도해주세요.');
                return;
            }
        }
    }

    function goToListPage(){
        page.show('/member');
    }

</script>
<ContentTitle {titleName}/>
<div id="content_body">
    <div class="form_content">
        <div class="form_line">
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
            <div class="form_group">
                <div class="form_name">
                    콘텐츠
                </div>
                <div class="input_form items_box">
                    {#each contentsList as c}
                        <button class="input w2 contents_item"
                                class:selected_contents={selectedContents !== null && selectedContents.contentsId === c.contentsId}
                                on:click={() => selectContents(c)}>
                                {c.name}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    시작시간
                </div>
                <div class="input_form">
                    <input class="input w2" type="time" maxlength="15">
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    종료시간
                </div>
                <div class="input_form">
                    <input class="input w2" type="time" maxlength="15">
                </div>
            </div>
        </div>
        
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    예약 시간
                </div>
                <div class="input_form">
                    {#if selectedContents !== null}
                        <Blog bind:contentsId={selectedContents.contentsId}/>
                    {/if}
                </div>
            </div>
        </div>
        <div class="form_line w10">
            <div class="form_group button_group">
                <button class="success_btn submit w4" type="button" on:click={registMember}>회원등록</button>
            </div>
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
    .time_line_box{
        height: 155px;
        border: 1px solid black;
        width: 900px;
    }
    .time_line{
        display: flex;
        align-items: flex-end;
        margin: 0 20px;
    }
    .time_line .a_time{
        width: 44px;
        height: 8px;
        margin-top: 20px;
        border-bottom: 1px solid #a6a6a7;
        border-left: 1px solid #a6a6a7;
        position: relative;
    }

    .a_time .time_number{
        color: #a6a6a7;
        font-size: 10px;
        position: inherit;
        left: -7px;
        top: -15px;
    }
    .a_time.hour{
        height: 10px;
        border-left: 1px solid black;
    }
    .a_time.hour .time_number{
        color: black;
        font-size: 16px;
        left: -10px;
        top: -22px;
    }
    .a_time.half{
        height: 9px;
    }
    .a_time.half .time_number{
        color: #7c7c7c;
        font-size: 12px;
        left: -8px;
        top: -16px;
    }
</style>