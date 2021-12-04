<script>
  import MostUsedMember from "../../components/statistics/MostUsedMember.svelte";
  import UsedAverageEachContents from "../../components/statistics/UsedAverageEachContents.svelte";
  import TotalUseTimeEachContents from "../../components/statistics/TotalUseTimeEachContents.svelte";
  import UseTimeByMemberBirth from "../../components/statistics/UseTimeByMemberBirth.svelte";
  import { getAllContents } from '../../js/service/ContentsService'
  import ContentTitle from "../../components/common/ContentTitle.svelte";

  const titleName = "통계";
  let searchParam = {
    sd: '',
    ed: '',
    cId: ''
  }

  function clearSearchDate(){
    searchParam.sd = '';
    searchParam.ed = '';
  }
</script>

<ContentTitle {titleName}/>
{#await getAllContents()}
  loading...
{:then contents}
  <div>
    <div class="search_area">
      <button class="allDayBtn" on:click={clearSearchDate}>전체기간</button>
      <div class="dayRangePicker">
        <input type="date" bind:value={searchParam.sd}> 
        <input type="date" bind:value={searchParam.ed}>
      </div>
      
      <select class="contentsSelect" bind:value={searchParam.cId}>
        <option value="">콘텐츠 선택</option>
        {#each contents as c}
        <option value={c.contentsId}>{c.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="all_flex">
    <div class="left_half">
      <article>
        <div class="topic_title">
          <div class="title_mark"></div>
          <p class="topic_name">콘텐츠별 최다 사용자</p>
        </div>
        <div class="graph_box">
          <MostUsedMember {contents} {searchParam}/>
        </div>
      </article>
      <article>
        <div class="topic_title">
          <div class="title_mark"></div>
          <p class="topic_name">콘텐츠별 누적 사용시간 <span class="mini_text">(단위: 분)</span></p>
        </div>
        <div class="graph_box">
          <TotalUseTimeEachContents {searchParam}/>
        </div>
      </article>
    </div>
    <div class="long_height">
      <article>
        <div class="topic_title">
          <div class="title_mark"></div>
          <p class="topic_name">콘텐츠별 평균 예약시간 <span class="mini_text">(단위: 분)</span></p>
        </div>
        <div class="graph_box">
          <UsedAverageEachContents {searchParam}/>
        </div>
      </article>
    </div>
  </div>

  <div>
    <article>
      <div class="topic_title">
        <div class="title_mark"></div>
        <p class="topic_name">연령대별 예약 <span class="mini_text">(단위: 건)</span></p>
      </div>
      <div class="graph_box all_flex w2_flex">
        <UseTimeByMemberBirth {searchParam}/>
      </div>
    </article>
  </div>
{/await}

<style>
  .search_area{
    display: flex;
  }
  .allDayBtn{
    color: #4c4c4e;
    margin: 20px 6px 16px 21px;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  }
  .dayRangePicker{
    width: fit-content;
    color: #4c4c4e;
    margin: 20px 6px 16px 21px;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  }
  .contentsSelect{
    border-style: none;
    color: #4c4c4e;
    margin: 20px 6px 16px 21px;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  }
  .all_flex{
    display: flex;
  }
  article{
    margin-left: 24px;
    display: inline-block;
  }
  .graph_box{
    padding: 37px 13px 50px 17px;
    border-radius: 5px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }
  .long_height{
    margin-left: 30px;
  }
  .long_height .graph_box{
    padding-top: 115px;
    padding-bottom: 115px;
  }
  .w2_flex{
    width:1086px;
    flex-wrap: wrap;
  }
  .left_half{
    flex-basis: min-content;
  }
  .topic_title{
    display: flex;
    align-items: center;
  }
  .topic_name{
    font-weight: bolder;
  }
  .title_mark{
    background-color: #ffea71;
    height: 18px;
    width: 5px;
    margin-right: 10px;
  }
  .mini_text{
    font-size: 12px;
  }
</style>