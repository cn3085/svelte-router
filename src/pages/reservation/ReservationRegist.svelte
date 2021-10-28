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

    const titleName = '예약 등록';

    let selectedContents = {};
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
    let selecedVersion = '';

    async function searchFunction(){
        const request = getAxios();
        const res = await request.get('/v1/members/all');
        return res.data.data;
    }

    function valueFunction(value){
        if(value !== ''){
        selecedVersion = [...selecedVersion, value];
        searchKeyword = '';
        }
        console.log(searchKeyword, selecedVersion);
    }

    onMount( async () => {
        await getContentsList();
    })

    
    function selectContents(contents){
        selectedContents = contents;
    }

    let member = {
        name : {
            value : null,
            require : true,
        },
        sex : {
            value : 'M',
            require : true
        },
        birth : {
            value : null,
            require : true
        },
        myPhoneNumber : {
            value : null,
            require : false
        },
        parentPhoneNumber : {
            value : null,
            require : false
        },
        school : {
            value : null,
            require : false
        },
        grade : {
            value : '1',
            require : false
        },
        memo : {
            value : null,
            require : false
        },
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
                <div class="form_name">
                    성별<span class="necessary">*</span>
                </div>
                <div class="input_form">
                    <label for="sex-type-m">
                        남<input class="input w1" id="sex-type-m" type="radio" name="sexType" value="M" bind:group={member.sex.value}>
                    </label>
                    <label for="sex-type-w">
                        여<input class="input w1" id="sex-type-w" type="radio" name="sexType" value="W" bind:group={member.sex.value}>
                    </label>
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
                                class:selected_contents={selectedContents.contentsId === c.contentsId}
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
                    <input class="input w2" type="time" maxlength="15" bind:value={member.school.value} placeholder="학교명을 입력하세요.">
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    종료시간
                </div>
                <div class="input_form">
                    <input class="input w2" type="time" maxlength="15" bind:value={member.school.value} placeholder="학교명을 입력하세요.">
                </div>
            </div>
        </div>
        <div class="form_line">
            
            <div class="form_group">
                <div class="form_name">
                    연락처2
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="15" bind:value={member.parentPhoneNumber.value} placeholder="‘-’ 구분없이 입력하세요">
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    메모
                </div>
                <div class="input_form">
                    <textarea class="input w8" cols="40" rows="40" bind:value={member.memo.value} maxlength="500"></textarea>
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
</style>