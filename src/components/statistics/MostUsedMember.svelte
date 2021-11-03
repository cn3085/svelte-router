<script>
import Bar from 'svelte-chartjs/src/Bar.svelte';

const testData = [
        {
            "memberId": 7170,
            "memberName": "철수34",
            "allCount": 47,
            "contents": [
                {
                    "contentsId": 598,
                    "contentsName": "오락실Test",
                    "color": "#f2ff38",
                    "eachCount": 20
                },
                {
                    "contentsId": 600,
                    "contentsName": "플스Test",
                    "color": "#5781ff",
                    "eachCount": 15
                },
                {
                    "contentsId": 599,
                    "contentsName": "노래방Test",
                    "color": "blue",
                    "eachCount": 12
                }
            ]
        },
        {
            "memberId": 7146,
            "memberName": "철수10",
            "allCount": 45,
            "contents": [
                {
                    "contentsId": 598,
                    "contentsName": "오락실Test",
                    "color": "#f2ff38",
                    "eachCount": 18
                },
                {
                    "contentsId": 600,
                    "contentsName": "플스Test",
                    "color": "#5781ff",
                    "eachCount": 17
                },
                {
                    "contentsId": 599,
                    "contentsName": "노래방Test",
                    "color": "blue",
                    "eachCount": 10
                }
            ]
        },
        {
            "memberId": 7140,
            "memberName": "철수4",
            "allCount": 42,
            "contents": [
                {
                    "contentsId": 600,
                    "contentsName": "플스Test",
                    "color": "#5781ff",
                    "eachCount": 20
                },
                {
                    "contentsId": 599,
                    "contentsName": "노래방Test",
                    "color": "blue",
                    "eachCount": 13
                },
                {
                    "contentsId": 598,
                    "contentsName": "오락실Test",
                    "color": "#f2ff38",
                    "eachCount": 9
                }
            ]
        },
        {
            "memberId": 7159,
            "memberName": "철수23",
            "allCount": 41,
            "contents": [
                {
                    "contentsId": 600,
                    "contentsName": "플스Test",
                    "color": "#5781ff",
                    "eachCount": 17
                },
                {
                    "contentsId": 598,
                    "contentsName": "오락실Test",
                    "color": "#f2ff38",
                    "eachCount": 15
                },
                {
                    "contentsId": 599,
                    "contentsName": "노래방Test",
                    "color": "blue",
                    "eachCount": 9
                }
            ]
        },
        {
            "memberId": 7157,
            "memberName": "철수21",
            "allCount": 39,
            "contents": [
                {
                    "contentsId": 600,
                    "contentsName": "플스Test",
                    "color": "#5781ff",
                    "eachCount": 17
                },
                {
                    "contentsId": 598,
                    "contentsName": "오락실Test",
                    "color": "#f2ff38",
                    "eachCount": 11
                },
                {
                    "contentsId": 599,
                    "contentsName": "노래방Test",
                    "color": "blue",
                    "eachCount": 11
                }
            ]
        }
    ];

const memberNames = testData.map( d => d.memberName + ' (' +  d.allCount + '건)');

let contentsData = {};

for(let t of testData){
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

console.log(Object.values(contentsData));

let data = {
    labels: memberNames,
    datasets: Object.values(contentsData)
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
    x: {
        stacked: true,
    },
    y: {
        stacked: true
    }
    }
}
</script>

<div style="width:500px;">
<Bar {data} {options} />
</div>
  
  