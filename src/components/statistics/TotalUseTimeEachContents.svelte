<script>
    import Bar from 'svelte-chartjs/src/Bar.svelte';

    const testData = [
        {
            "CONTENTS_ID": 600,
            "TOTAL": 12355,
            "COLOR": "#5781ff",
            "NAME": "플스Test"
        },
        {
            "CONTENTS_ID": 598,
            "TOTAL": 12269,
            "COLOR": "#f2ff38",
            "NAME": "오락실Test"
        },
        {
            "CONTENTS_ID": 599,
            "TOTAL": 11419,
            "COLOR": "#ffcd56",
            "NAME": "오락실"
        }
    ];

    const contentsNameLabels = testData.map( t => t.NAME);
    const useMinuteDatas = testData.map( t => t.TOTAL );
    const colorDatas = testData.map( t => t.COLOR);


    let data = {
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
            text: 'Chart.js Bar Chart - Stacked'
        },
        },
        responsive: true,
        scales: {
        }
    }
</script>
    
<div style="width:500px;">
    <Bar {data} {options} />
</div>
      
      