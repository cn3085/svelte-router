<script>
    import { onMount } from 'svelte';
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import { alertSuccess } from '../../js/toast_store'
    import { getAxios } from '../../js/service/AuthAxios'
    import { requiredCheck } from '../../js/util/WebUtil';


    const titleName = '설정';

    let setting = {
        sunDayStart : {
            value : null,
            require : true,
        },
        sunDayEnd : {
            value : null,
            require : true
        },
        monDayStart : {
            value : null,
            require : true
        },
        monDayEnd : {
            value : null,
            require : true,
        },
        tuesDayStart : {
            value : null,
            require : true
        },
        tuesDayEnd : {
            value : null,
            require : true
        },
        wednesDayStart : {
            value : null,
            require : true,
        },
        wednesDayEnd : {
            value : null,
            require : true
        },
        thursDayStart : {
            value : null,
            require : true
        },
        thursDayEnd : {
            value : null,
            require : true,
        },
        friDayStart : {
            value : null,
            require : true
        },
        friDayEnd : {
            value : null,
            require : true
        },
        saturDayStart : {
            value : null,
            require : true
        },
        saturDayEnd : {
            value : null,
            require : true
        },
        reservationMaxMinute : {
            value : null,
            require : true
        }
    }

    const request = getAxios();

    async function getSettings(){
        const res = await request.get('/v1/settings');
        const data = res.data;
        if(res.status === 200 && data.code === 'SUCC'){
            setting.sunDayStart.value = data.data.sunDayStart;
            setting.sunDayEnd.value = data.data.sunDayEnd;
            setting.monDayStart.value = data.data.monDayStart;
            setting.monDayEnd.value = data.data.monDayEnd;
            setting.tuesDayStart.value = data.data.tuesDayStart;
            setting.tuesDayEnd.value = data.data.tuesDayEnd;
            setting.wednesDayStart.value = data.data.wednesDayStart;
            setting.wednesDayEnd.value = data.data.wednesDayEnd;
            setting.thursDayStart.value = data.data.thursDayStart;
            setting.thursDayEnd.value = data.data.thursDayEnd;
            setting.friDayStart.value = data.data.friDayStart;
            setting.friDayEnd.value = data.data.friDayEnd;
            setting.saturDayStart.value = data.data.saturDayStart;
            setting.saturDayEnd.value = data.data.saturDayEnd;
            setting.reservationMaxMinute.value = data.data.reservationMaxMinute;
        }
    }


    function saveSetting(){
        const emptyRequiredKey = requiredCheck(setting);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '설정의 모든 항목은 필수값입니다.');
            return false;
        }

        if(!confirm('저장하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.put('/v1/settings', {
            sunDayStart : setting.sunDayStart.value,
            sunDayEnd : setting.sunDayEnd.value,
            monDayStart : setting.monDayStart.value,
            monDayEnd : setting.monDayEnd.value,
            tuesDayStart : setting.tuesDayStart.value,
            tuesDayEnd : setting.tuesDayEnd.value,
            wednesDayStart : setting.wednesDayStart.value,
            wednesDayEnd : setting.wednesDayEnd.value,
            thursDayStart : setting.thursDayStart.value,
            thursDayEnd : setting.thursDayEnd.value,
            friDayStart : setting.friDayStart.value,
            friDayEnd : setting.friDayEnd.value,
            saturDayStart : setting.saturDayStart.value,
            saturDayEnd : setting.saturDayEnd.value,
            reservationMaxMinute : setting.reservationMaxMinute.value
        }).then(res => {
            console.log(res);
            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
            }
        })
        .catch(res => {
            console.error(res);
            router.replace('/login');
        })
    }

    onMount( async () => {
        await getSettings();
    })

    
</script>
<ContentTitle {titleName}/>

<article>
    <div class="topic_title">
        <div class="title_mark"></div>
        <p class="topic_name">운영시간 설정</p>
    </div>
    <div class="topic_content">
        <table>
            <thead>
                <th style="width: 20%;">요일</th>
                <th style="width: 40%;">시작 시간</th>
                <th style="width: 40%;">종료 시간</th>
            </thead>
            <tbody>
                <tr>
                    <td>일요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.sunDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.sunDayEnd.value}>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>월요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.monDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.monDayEnd.value}>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>화요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.tuesDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.tuesDayEnd.value}>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>수요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.wednesDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.wednesDayEnd.value}>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>목요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.thursDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.thursDayEnd.value}>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>금요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.friDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.friDayEnd.value}>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>토요일</td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.saturDayStart.value}>
                        </div>
                    </td>
                    <td>
                        <div class="input_form">
                            <input class="input w3" type="time" max="9999-12-31"  bind:value={setting.saturDayEnd.value}>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</article>


<article>
    <div class="topic_title">
        <div class="title_mark"></div>
        <p class="topic_name">1인당 컨텐츠 최대 예약시간 설정 <span class="mini_text">(단위: 분)</span></p>
    </div>
    <div class="topic_content">
        <div class="max_minute_box">
            <div class="form_line">
                <div class="input_form">
                    <input class="input w1" type="number" max="1440" maxlength="4" bind:value={setting.reservationMaxMinute.value}>
                </div>
            </div>
        </div>
    </div>
</article>
<div class="form_line w4 stick_r">
    <div class="form_group button_group">
        <button class="success_btn submit w2" type="button" on:click={saveSetting}>저장</button>
    </div>
</div>
    

<style>
    table{
        width: 100%;
        border-collapse: separate;
        font-size: 15px;
        border-spacing: 0px 20px;
    }
    th{
        height: 25px;
    }
    td{
        text-align: center;
    }
    article{
        margin: 25px 50px;
    }
    .topic_title{
        display: flex;
        align-items: center;
    }
    .topic_name{
        font-weight: bolder;
    }
    .title_mark{
        background-color: #ffea71;
        height: 18px;
        width: 5px;
        margin-right: 10px;
    }
    .topic_content{
        width: 80%;
        margin: 0 auto;
    }
    input[type=time]{
        width: 128px;
        padding-left: 35px;
        font-size: 15px;
    }
    input[type=number]{
        text-align: center;
    }
    .mini_text{
        font-size: 12px;
    }
    .max_minute_box{
        margin: 20px 50px;
    }
    
</style>