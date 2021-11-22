<script>
    import { onMount } from "svelte";
    import Pie from "svelte-chartjs/src/Pie.svelte"
    import { getUsingAverageContents } from "../../js/service/StatisticsService";

    let contentsData = [];

    $: contentsNameLabels = contentsData.map( t => t.NAME);
    $: contentsAverageDatas = contentsData.map( t => t.AVERAGE);
    $: colorDatas = contentsData.map( t => t.COLOR + '90');
    $: hoverColorDatas = contentsData.map( t => t.COLOR );


    $: data = {
    labels: contentsNameLabels,
    datasets: [
      {
        data: contentsAverageDatas,
        backgroundColor: colorDatas,
        hoverBackgroundColor: hoverColorDatas
      }
    ]
  };

  let options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '콘텐츠별 평균 사용시간'
        },
    },
    
  }

  onMount( async () => {
    contentsData = await getUsingAverageContents();
  })
</script>


<div style="width: 500px;">
    <Pie {data} {options}/>
</div>
    