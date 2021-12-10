<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import { getRandomColor } from "../../js/util/WebUtil";
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import { requiredCheck } from "../../js/util/WebUtil";
    import SwitchButton from '../../components/common/SwitchButton.svelte'
    import page from 'page';

    const titleName = '콘텐츠 등록';
    
    let contents = {
        name : {
            value : null,
            require : true,
        },
        color : {
            value : getRandomColor(),
            require : false
        },
        description : {
            value : null,
            require : false
        },
        enableReservation : {
            value : 'true',
            require : true
        }
    }


    async function registContents(){
        const emptyRequiredKey = requiredCheck(contents);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 예약가능여부는 필수값입니다.');
            return false;
        }
        
        try{
            const request = getAxios();
            const res = await request.post('/v1/contents', {
                name: contents.name.value,
                color: contents.color.value,
                description: contents.description.value,
                enableReservation: contents.enableReservation.value,
            });

            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
                page.replace('/contents/detail/' + res.data.data.contentsId);
            }
        }catch(err){
            console.log(err);
            if(err.response?.status === 401){
                alertError('로그인 후 시도해주세요.');
                return;
            }
        }
    }

    function goToListPage(){
        page.show('/contents');
    }
</script>
<ContentTitle {titleName}/>
<div id="content_body">
    <div class="form_content">
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    이름<span class="necessary">*</span>
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="50" bind:value={contents.name.value} placeholder="이름을 입력하세요.">
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    예약 사용 여부<span class="necessary">*</span>
                </div>
                <div class="input_form">
                    <label for="sex-type-m">
                        <SwitchButton bind:checked={contents.enableReservation.value}/>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    색 지정
                </div>
                <div class="input_form">
                    <input class="input" type="color" bind:value={contents.color.value}>
                </div>
            </div>
        </div>

        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    메모
                </div>
                <div class="input_form">
                    <textarea class="input w8" cols="40" rows="40" bind:value={contents.description.value} maxlength="500"></textarea>
                </div>
            </div>
        </div>
        <div class="form_line w10">
            <div class="form_group button_group">
                <button class="success_btn submit w4" type="button" on:click={registContents}>등록</button>
            </div>
            <div class="form_group button_group list_btn stick_r" on:click={goToListPage}>
                <ListIcon width="1.8em"/>
            </div>
        </div>
    </div>
</div>
