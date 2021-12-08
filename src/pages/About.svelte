<script>
  import AutoComplete from 'simple-svelte-autocomplete';
  import DotBlue from "../components/member/DotBlue.svelte";
  import DotRed from "../components/member/DotRed.svelte";
  import  axios from "axios";
import { getAxios } from '../js/service/AuthAxios';

  let searchKeyword = '';
  $: selecedVersion = [];
  $: {
    selecedVersion;
    if(document.querySelector('#versionSearchInput') !== null){
      document.querySelector('#versionSearchInput').value = '';
    }
  }


  async function searchFunction(){
    const request = getAxios();
    const res = await request.get('/v1/members/all');
    console.log(res.data.data);
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
  
  function clearInput(value){
    if(value){
      
    }
  }

</script>


<AutoComplete
  inputId="versionSearchInput"
  bind:selectedItem={searchKeyword}
  searchFunction={searchFunction}
  valueFunction={valueFunction}
  labelFieldName="name"
  localFiltering=false
  noResultsText="검색 결과가 없습니다."
  onChange={clearInput}>
  
  <div slot="item" let:item={item} let:label={label}>
    {@html label}
    {#if item.use === 'Y'}
      <DotRed/>
      {:else}
      <DotBlue/>
      {/if}
      <span>{item.use}</span>
  </div>

</AutoComplete>

  <div>
    {#each selecedVersion as v}
      <div>{v.version}</div>
    {/each}
  </div>
