<script>
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import TrContents from '../../components/contents/TrContents.svelte'
    import Pagination from "../../components/common/page/Pagination.svelte";
    import CloseIcon from "../../components/common/icon/CloseIcon.svelte";
    import { getAxios } from '../../js/service/AuthAxios'
    import { makeQueryString } from "../../js/util/WebUtil";
    import { pageContent, setNumber } from "../../js/page_store";
    import { onMount } from 'svelte';
    import page from 'page';

    export let querystring;

    let queryObj = new URLSearchParams();

    $ : {
        queryObj = new URLSearchParams(querystring);
        getList(queryObj.get('page'));
    }

    const titleName = '콘텐츠 조회';
    
    let searchParam = {
        nm: null,
        er: null,
    };

    const request = getAxios();

    let pageMaxNumber = 0;

    async function getList(pageNum){

        searchParam.nm =  queryObj.get('nm') ?? null;
        searchParam.st =  queryObj.get('er') ?? null;
        searchParam.page = pageNum;

        const res = await request.get('/v1/contents?' + makeQueryString(searchParam));
        const data = res.data;
        if(res.status === 200 && data.code === 'SUCC'){
            pageMaxNumber = data.data.totalElements - (data.data.pageable.pageSize * data.data.number);
            $pageContent = data.data.content;
            setNumber(data.data.number, data.data.totalPages);
        }
    }


    async function searchContents(){
        page.show('/contents?' + makeQueryString(searchParam));
    }

    function movePage(pageNum){
        let newQueryObj = new URLSearchParams(querystring);
        newQueryObj.set('page', pageNum);
        page.show('/contents?' + newQueryObj.toString());
    }

    function enterSearch(e){
        if(e.key === 'Enter'){
            page.show('/contents?' + makeQueryString(searchParam));
        }
    }
    
    
    function goToDetailPage(contentsId){
        page.show('/contents/detail/' + contentsId + '?' + makeQueryString(searchParam));
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
                예약 가능 여부
            </div>
            <div class="input_form">
                <label for="sex-type-m">
                    모두<input class="input w1 radio" id="sex-type-m" type="radio" name="er" value="" bind:group={searchParam.er}>
                </label>
                <label for="sex-type-m">
                    예약가능<input class="input w1 radio" id="sex-type-m" type="radio" name="er" value="true" bind:group={searchParam.er}>
                </label>
                <label for="sex-type-w">
                    예약불가<input class="input w1 radio" id="sex-type-w" type="radio" name="er" value="false" bind:group={searchParam.er}>
                </label>
            </div>
        </div>
    </div>
    
    <div class="form_line">
        <div class="form_group form_btn_group">
            <button class="search_btn submit w1" type="button" on:click={searchContents}>검색</button>
            <button class="download_btn submit w1" type="button">Download</button>
        </div>
    </div>
    
</div>

<table>
    <thead>
        <th style="width: 5%;">No</th>
        <th style="width: 75%;">이름</th>
        <th style="width: 20%;">예약 가능여부</th>
    </thead>
    <tbody>
        {#each $pageContent as c, index}
            <TrContents contentsId= {c.contentsId}
                      name={c.name}
                      enableReservation = {c.enableReservation}
                      i = {pageMaxNumber - index}
                      {goToDetailPage}/>
        {:else}
            <td colspan="6">데이터가 존재하지 않습니다.</td>
        {/each}
    </tbody>
</table>
<div id="page_navigation_wrapper">
    {#if $pageContent !== []}
        <Pagination {movePage}/>
    {/if}  
</div>

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
</style>