<script>
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import TrMember from '../../components/member/TrMember.svelte'
    import Pagination from "../../components/common/page/Pagination.svelte";
    import { Chasing } from "svelte-loading-spinners";
    import CloseIcon from "../../components/common/icon/CloseIcon.svelte";
    import { getAxios } from '../../js/service/AuthAxios'
    import { makeQueryString } from "../../js/util/WebUtil";
    import { pageContent, setNumber } from "../../js/page_store";
    import config from "../../js/config";
    import page from 'page';
import { empty } from 'svelte/internal';

    export let querystring;

    let queryObj = new URLSearchParams();

    $ : {
        $pageContent = null;
        queryObj = new URLSearchParams(querystring);
        getList(queryObj.get('page'));
    }

    const titleName = '회원 조회';
    
    let searchParam = {
        nm: null,
        st: '',
        ab: null,
        bb: null,
        mp: null,
        pp: null,
        sch: null,
        gd: '',
        page: null
    };


    const request = getAxios();

    let pageMaxNumber = 0;

    async function getList(pageNum){

        searchParam.nm =  queryObj.get('nm') ?? null;
        searchParam.st =  queryObj.get('st') ?? '';
        searchParam.ab =  queryObj.get('ab') ?? null;
        searchParam.bb =  queryObj.get('bb') ?? null;
        searchParam.mp =  queryObj.get('mp') ?? null;
        searchParam.pp =  queryObj.get('pp') ?? null;
        searchParam.sch =  queryObj.get('sch') ?? null;
        searchParam.gd =  queryObj.get('gd') ?? '';
        searchParam.page = pageNum;

        const res = await request.get('/v1/members?' + makeQueryString(searchParam));
        const data = res.data;
        if(res.status === 200 && data.code === 'SUCC'){
            pageMaxNumber = data.data.totalElements - (data.data.pageable.pageSize * data.data.number);
            $pageContent = data.data.content;
            setNumber(data.data.number, data.data.totalPages);
        }
    }


    async function searchMember(){
        page.show('/member?' + makeQueryString(searchParam));
    }

    function movePage(pageNum){
        let newQueryObj = new URLSearchParams(querystring);
        newQueryObj.set('page', pageNum);
        page.show('/member?' + newQueryObj.toString());
    }

    function enterSearch(e){
        if(e.key === 'Enter'){
            page.show('/member?' + makeQueryString(searchParam));
        }
    }

    function clearBirthParam(){
        searchParam.ab = '';
        searchParam.bb = '';
    }

    function downloadExcel(){
        document.excel.submit();
    }
    

    
    function goToDetailPage(memberId){
        page.show('/member/detail/' + memberId + '?' + makeQueryString(searchParam));
    }

    
</script>
<ContentTitle {titleName}/>

<div id="search_area">
    <div class="form_line">
        <div class="form_group">
            <div class="form_name">
                이름
            </div>
            <div class="input_form">
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.nm} on:keyup={enterSearch} placeholder="이름을 입력하세요.">
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                성별
            </div>
            <div class="input_form">
                <label for="sex-type-m">
                    모두<input class="input w1 radio" id="sex-type-m" type="radio" name="sexType" value="" bind:group={searchParam.st}>
                </label>
                <label for="sex-type-m">
                    남<input class="input w1 radio" id="sex-type-m" type="radio" name="sexType" value="M" bind:group={searchParam.st}>
                </label>
                <label for="sex-type-w">
                    여<input class="input w1 radio" id="sex-type-w" type="radio" name="sexType" value="W" bind:group={searchParam.st}>
                </label>
            </div>
        </div>
    </div>
    <div class="form_line">
        <div class="form_group">
            <div class="form_name">
                연락처
            </div>
            <div class="input_form">
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.mp} on:keyup={enterSearch} placeholder="본인 연락처를 입력하세요.">
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                생년월일
            </div>
            <div class="input_form">
                <input class="input w3" type="date" max="9999-12-31"  bind:value={searchParam.ab}>
            </div>
            <div class="middle_line">ㅡ</div>
            <div class="input_form">
                <input class="input w3" type="date" max="9999-12-31"  bind:value={searchParam.bb}>
            </div>
            <div id="birth_search_clear_wrapper" on:click={clearBirthParam}>
                <CloseIcon width={'0.8em'}/>
            </div>
        </div>
    </div>
    <div class="form_line">
        <div class="form_group">
            <div class="form_name">
                학교
            </div>
            <div class="input_form">
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.sch} on:keyup={enterSearch} placeholder="학교명을 입력하세요.">
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                학년
            </div>
            <div class="input_form">
                <select class="input w2" bind:value={searchParam.gd}>
                    <option value="">선택 안 함</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
        </div>
        <div class="form_group form_btn_group">
            <button class="search_btn submit w1" type="button" on:click={searchMember}>검색</button>
            <button class="download_btn submit w1" type="button" on:click={downloadExcel}>Download</button>
        </div>
    </div>
    
</div>

<table>
    <thead>
        <th style="width: 5%;">No</th>
        <th style="width: 15%;">이름</th>
        <th style="width: 20%;">성별</th>
        <th style="width: 20%;">생년월일</th>
        <th style="width: 20%;">본인 연락처</th>
        <th style="width: 20%;">학교</th>
    </thead>
    <tbody>
        {#if $pageContent === null}
            <td colspan="6" style="text-align: -webkit-center;height: 330px;">
                <Chasing size={65} color={"#FFDC14"} unit={'px'} duration={'1s'}/>
            </td>
        {:else if $pageContent.length === 0}
            <td colspan="6" style="text-align: -webkit-center;">
                데이터가 없습니다.
            </td>
        {:else}
            {#each $pageContent as m, index}
                <TrMember memberId= {m.memberId}
                            name = {m.name}
                            sex = {m.sex}
                            birth = {m.birth}
                            myPhoneNumber = {m.myPhoneNumber}
                            school = {m.school}
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

<form name="excel" action={config.excelURL + '/members'} style="display:none;">
    <input type="hidden" name="format" value="xls">
    <input type="hidden" name="nm" bind:value={searchParam.nm}>
    <input type="hidden" name="st" bind:value={searchParam.st}>
    <input type="hidden" name="ab" bind:value={searchParam.ab}>
    <input type="hidden" name="bb" bind:value={searchParam.bb}>
    <input type="hidden" name="mp" bind:value={searchParam.mp}>
    <input type="hidden" name="pp" bind:value={searchParam.pp}>
    <input type="hidden" name="sch" bind:value={searchParam.sch}>
    <input type="hidden" name="gd" bind:value={searchParam.gd}>
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
    #birth_search_clear_wrapper{
        display: flex;
        align-items: center;
        margin-left: 15px;
        cursor: pointer;
    }
</style>