<script>
import { onMount } from 'svelte';
import Bar from 'svelte-chartjs/src/Bar.svelte';
import { getMostUsedMember } from "../../js/service/StatisticsService";
import { getAllContents } from '../../js/service/ContentsService'

let searchParam = {
    sd: '',
    ed: '',
    cId: 0
}
let memberData = [];

$: memberNames = memberData.map( d => d.memberName + ' (' +  d.allCount + '건)');

let contentsData = {};
$: {
    contentsData = {};
    for(let t of memberData){
        for(let c of t.contents){
            if(!contentsData[c.contentsId]){
                contentsData[c.contentsId] = {};
            }
            let datasetElement = contentsData[c.contentsId];
            datasetElement.label = c.contentsName;
            if(!datasetElement['data']){
                datasetElement['data'] = [];
            }
            datasetElement.data.push(c.eachCount);
            if(!datasetElement['backgroundColor']){
                datasetElement['backgroundColor'] = c.color + '90';
            }
        }
    }
}


$: data = {
    labels: memberNames,
    datasets: Object.values(contentsData)
};
$ : {
    console.log(data);
}

$: options = {
    plugins: {
        title: {
            display: true,
            text: '예약 많은 순위'
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
        }
    }
}

onMount( async () => {
    search();
})

async function search(){
    memberData = await getMostUsedMember(searchParam.cId, searchParam.sd, searchParam.ed);
    console.log(memberData);
}
</script>

<div>
    <input type="date" bind:value={searchParam.sd}> 
    <input type="date" bind:value={searchParam.ed}>

    <select bind:value={searchParam.cId}>
        <option value="">-----</option>
        {#await getAllContents()}
            <option>불러오는 중입니다.</option>
        {:then contents} 
            {#each contents as c}
                <option value={c.contentsId}>{c.name}</option>
            {/each}
        {/await}
    </select>

    {searchParam.sd}
    {searchParam.ed}
    <button on:click={search}>검색</button>
</div>
<div style="width:500px;">
    <Bar {data} {options}/>
</div>
  
  