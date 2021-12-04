<script>
    import { onMount } from "svelte";
    import Pie from "svelte-chartjs/src/Pie.svelte"
    import { getUsingAverageContents } from "../../js/service/StatisticsService";

    let contentsData = [];
    export let searchParam = {
        sd: '',
        ed: '',
        cId: ''
    }

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
            text: '콘텐츠별 평균 예약시간'
        },
    },
    
  }

  onMount( async () => {
    search(searchParam.cId, searchParam.sd, searchParam.ed);
  })

  $ : {
      search(searchParam.cId, searchParam.sd, searchParam.ed);
  }

  async function search(cId, sd, ed){
    contentsData = await getUsingAverageContents(cId, sd, ed);
  }
</script>


<div style="width: 500px;">
    <Pie {data} {options}/>
</div>
    