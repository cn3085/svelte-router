<script>
    import Pie from "svelte-chartjs/src/Pie.svelte"
    const testData = [
        {
            "CONTENTS_ID": 598,
            "AVERAGE": 35.2,
            "COLOR": "#f2ff38",
            "NAME": "오락실Test"
        },
        {
            "CONTENTS_ID": 599,
            "AVERAGE": 33.9,
            "COLOR": "#ffcd56",
            "NAME": "노래방Test"
        },
        {
            "CONTENTS_ID": 600,
            "AVERAGE": 33.7,
            "COLOR": "#5781ff",
            "NAME": "플스Test"
        }
    ];

    const contentsNameLabels = testData.map( t => t.NAME);
    const contentsAverageDatas = testData.map( t => t.AVERAGE);
    const colorDatas = testData.map( t => t.COLOR + '90');
    const hoverColorDatas = testData.map( t => t.COLOR );


    let data = {
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
    responsive: true
  }
</script>


<div style="width: 500px;">
    <Pie {data} {options}/>
</div>
    