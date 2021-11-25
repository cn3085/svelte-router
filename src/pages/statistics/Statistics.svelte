<script>
  import MostUsedMember from "../../components/statistics/MostUsedMember.svelte";
  import UsedAverageEachContents from "../../components/statistics/UsedAverageEachContents.svelte";
  import TotalUseTimeEachContents from "../../components/statistics/TotalUseTimeEachContents.svelte";
  import UseTimeByMemberBirth from "../../components/statistics/UseTimeByMemberBirth.svelte";
  import { getAllContents } from '../../js/service/ContentsService'

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


{#await getAllContents()}
  loading...
{:then contents}
  <div>
    <button on:click={clearSearchDate}>전체기간</button>
    <input type="date" bind:value={searchParam.sd}> 
    <input type="date" bind:value={searchParam.ed}>

    <select bind:value={searchParam.cId}>
        <option value="">-----</option>
        {#each contents as c}
            <option value={c.contentsId}>{c.name}</option>
        {/each}
    </select>
  </div>
  <MostUsedMember {contents} {searchParam}/>
  <TotalUseTimeEachContents {searchParam}/>
  <UsedAverageEachContents {searchParam}/>
  <UseTimeByMemberBirth {searchParam}/>
{/await}
