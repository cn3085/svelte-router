<script>
import { onMount } from 'svelte';
import Bar from 'svelte-chartjs/src/Bar.svelte';
import { getMostUsedMember } from "../../js/service/StatisticsService";

export let contents = [];
export let searchParam = {
    sd: '',
    ed: '',
    cId: ''
}

let memberData = [];

$: memberNames = memberData.map( d => d.memberName + ' (' +  d.allCount + '건)');

let contentsDataList = [];
$: {
    contentsDataList = [];
    for(let c of contents){
        let contentsData = {};
        contentsData.label = c.name;
        contentsData.backgroundColor = c.color +'90';
        contentsData.data = [];
        for(let m of memberData){
            let [memberContents] = m.contents.filter( mc => mc.contentsId === c.contentsId);
            if(memberContents){
                contentsData.data.push(memberContents.eachCount);
            }else{
                contentsData.data.push(0);
            }
        }
        contentsDataList.push(contentsData);
    }
}

$ : {
    search(searchParam.cId, searchParam.sd, searchParam.ed);
}


$: data = {
    labels: memberNames,
    datasets: contentsDataList
};

const options = {
    plugins: {
        title: {
            display: true,
            text: '콘텐츠별 최다 사용자'
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
    search(searchParam.cId, searchParam.sd, searchParam.ed);
})

async function search(cId, sd, ed){
    memberData = await getMostUsedMember(cId, sd, ed);
    // console.log(memberData);
}
</script>

<div style="width:500px;">
    <Bar {data} {options}/>
</div>
  
  