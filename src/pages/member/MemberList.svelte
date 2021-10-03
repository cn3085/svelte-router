<script>
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import TrMember from '../../components/member/TrMember.svelte'
    import Pagination from "../../components/common/page/Pagination.svelte";
    import {getAxios} from '../../js/service/AuthAxios'
    import { makeQueryString } from "../../js/util/WebUtil";
    import { onMount, tick } from 'svelte';

    const titleName = '회원 조회';

    
    let searchParam = {
        nm: null,
        st: null,
        ab: null,
        mp: null,
        pp: null,
        sch: null,
        gd: null
    };

    const request = getAxios();

    const pageContent = null;

    onMount(async () => {
        const res = await request.get('/v1/members?' + makeQueryString(searchParam));
        const data = res.data;
        if(res.status === 200 && data.code === 'SUCC'){
            console.log(data.data);
            pageContent = await data.data;
        }
    })

    async function getMemberList(){
        const res = await request.get('/v1/members?' + makeQueryString(searchParam));
        const data = res.data;
        if(res.status === 200 && data.code === 'SUCC'){
            console.log(data.data);
            return await data.data;
        }
        // .then(res => console.log(res))
        // .catch(res => {
        //     console.error(res);
        // })
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
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.nm} placeholder="이름을 입력하세요.">
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                성별
            </div>
            <div class="input_form">
                <label for="sex-type-m">
                    남<input class="input w1" id="sex-type-m" type="radio" name="sexType" value="M" bind:group={searchParam.st}>
                </label>
                <label for="sex-type-w">
                    여<input class="input w1" id="sex-type-w" type="radio" name="sexType" value="W" bind:group={searchParam.st}>
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
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.mp} placeholder="‘-’ 구분없이 입력하세요">
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
        </div>
    </div>
    <div class="form_line">
        <div class="form_group">
            <div class="form_name">
                학교
            </div>
            <div class="input_form">
                <input class="input w4" type="text" maxlength="15" bind:value={searchParam.sch} placeholder="학교명을 입력하세요.">
            </div>
        </div>
        <div class="form_group">
            <div class="form_name">
                학년
            </div>
            <div class="input_form">
                <select class="input w2" bind:value={searchParam.gd}>
                    <option value="1" selected>1</option>
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
            <button class="search_btn submit w1" type="button" on:click={getMemberList}>검색</button>
            <button class="download_btn submit w1" type="button">Download</button>
        </div>
    </div>
    
</div>

<table>
    <thead>
        <th>No</th>
        <th>이름</th>
        <th>성별</th>
        <th>생년월일</th>
        <th>연락처</th>
        <th>학교</th>
    </thead>
    <tbody>
        {#await getMemberList()}
            <p>kkk</p>
        {:then data}
            {#each data.content as m, index}
                <TrMember {...m} i={data.totalElements - (data.pageable.pageSize * data.number + index)}/>
            <!-- <tr>
                <td>1</td>
                <td>{m.name}</td>
                <td><DotBlue/>남</td>
                <td>{m.birth}</td>
                <td>{m.myPhoneNumber ?? '-'}</td>
                <td>{m.school ?? '-'}</td>
            </tr> -->
            {/each}
        {:catch}
            <tr>
                <td colspan="6">데이터 조회에 실패했습니다. 잠시후 다시 시도해주세요.</td>
            </tr>
        {/await}
    </tbody>
</table>
<div id="page_navigation_wrapper">
    <Pagination/>
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
</style>