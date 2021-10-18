<script>
  import AutoComplete from 'simple-svelte-autocomplete';
  import DotBlue from "../components/member/DotBlue.svelte";
  import DotRed from "../components/member/DotRed.svelte";
  import  axios from "axios";

  let searchKeyword = '';
  $: selecedVersion = [];
  $: {
    selecedVersion;
    if(document.querySelector('#versionSearchInput') !== null){
      document.querySelector('#versionSearchInput').value = '';
    }
  }


  async function searchFunction(){
    const res = await axios.get('https://hdolt.tovair.com/stadmin/system/route/list?brn_code=SOD');
    return res.data.data;
  }

  function valueFunction(value){
    if(value !== ''){
      selecedVersion = [...selecedVersion, value];
      searchKeyword = '';
    }
    console.log(searchKeyword, selecedVersion);
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
  labelFieldName="version"
  delay=200
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
