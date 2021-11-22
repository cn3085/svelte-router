<script>
    import { onMount } from 'svelte';
    import Bar from 'svelte-chartjs/src/Bar.svelte';
    import { getTotalUseTimeContents } from "../../js/service/StatisticsService";

    let contentsData = [];

    $: contentsNameLabels = contentsData.map( t => t.NAME);
    $: useMinuteDatas = contentsData.map( t => t.TOTAL );
    $: colorDatas = contentsData.map( t => t.COLOR);


    $: data = {
        labels: contentsNameLabels,
        datasets: [
            {
                label: "누적 사용시간(분)",
                data: useMinuteDatas,
                backgroundColor: colorDatas,
                borderWidth: 2,
                borderColor: colorDatas
            }
        ]
    };

    let options = {
        plugins: {
        title: {
            display: true,
            text: '콘텐츠별 누적 사용시간'
        },
        },
        responsive: true,
        scales: {
        }
    }

    onMount( async () => {
        contentsData = await getTotalUseTimeContents();
    })
</script>
    
<div style="width:500px;">
    <Bar {data} {options} />
</div>
      
      