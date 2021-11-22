<script>
    import dayjs from 'dayjs';
    import { getRandomColor } from "../../js/util/WebUtil";
    import Bar from 'svelte-chartjs/src/Bar.svelte';
    import { getUsetimeByBirth } from "../../js/service/StatisticsService";
    import { onMount } from 'svelte';

    let birthData = [];
    let searchYear = '2021';
    let dataListWithGroupName = [];
    let groupData = {};
    let contentsNames = [];
    $: {
        dataListWithGroupName = birthData.map( t => {
            const groupName = getAgeGroup(searchYear, t.YEAR);
            t['groupName'] = groupName;
            return t;
        })
        console.log(dataListWithGroupName);

        contentsNames = Array.from(new Set(dataListWithGroupName.map( d => d.NAME)));

        for(let data of dataListWithGroupName){
            if(!groupData[data.groupName]){
                groupData[data.groupName] = {};
            }
            let eachGroupObject = groupData[data.groupName];
            if(!eachGroupObject[data.YEAR]){
                eachGroupObject[data.YEAR] = {};
            }
            let eachContentsForYear = eachGroupObject[data.YEAR];
            if(!eachContentsForYear["data"]){
                eachContentsForYear["data"] = [];
            }
            let index = contentsNames.indexOf(data.NAME);
            eachContentsForYear.data[index] = data.COUNT;
            if(!eachContentsForYear['backgroundColor']){
                eachContentsForYear['backgroundColor'] =  getRandomColor() + '90';
            }
            eachContentsForYear.label = data.YEAR;
        }

    }
    

    function getAgeGroup(nowYear, birthYear){
        const KOREAN_AGE_MARGIN = 1;
        const yearsOld = nowYear - birthYear + KOREAN_AGE_MARGIN;
        let groupName = '';
        if(yearsOld < 8){
            groupName = '미취학 아동';
        }else if(yearsOld < 14){
            groupName = '초등학생';
        }else if(yearsOld < 17){
            groupName = '중학생';
        }else if(yearsOld < 20){
            groupName = '고등학생';
        }else{
            groupName = '성인';
        }
        return groupName;
    }


    function toChartJsData(value){
        return {
            labels: contentsNames,
            datasets: Object.values(value)
        }
    }


    let options = {
        plugins: {
            title: {
                display: true,
                text: '연령대별 사용시간'
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
        birthData = await getUsetimeByBirth();
    })
</script>

{#each Object.entries(groupData) as entry}
    <div style="width:500px;">
        <p>{entry[0]}</p>
        <Bar data={toChartJsData(entry[1])} {options} />
    </div>
{/each}