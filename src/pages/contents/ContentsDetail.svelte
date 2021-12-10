<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import SwitchButton from '../../components/common/SwitchButton.svelte'
    import { requiredCheck } from "../../js/util/WebUtil";
    import router from 'page'
    import { onMount } from 'svelte';
    import page from 'page';

    export let params;
    export let querystring;

    const contentsId = params.id;

    const titleName = '콘텐츠 조회';
    
    let contents = {
        name : {
            value : null,
            require : true,
        },
        color : {
            value : null,
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


    function updateContents(){
        const emptyRequiredKey = requiredCheck(contents);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 예약가능여부는 필수값입니다.');
            return false;
        }

        if(!confirm('수정하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.put('/v1/contents/' + contentsId, {
            name: contents.name.value,
            color: contents.color.value,
            description: contents.description.value,
            enableReservation: contents.enableReservation.value,
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


    function removeContents(){
        if(!confirm('정말로 콘텐츠를 삭제하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.delete('/v1/contents/' + contentsId)
        .then(res => {
            console.log(res);
            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
                page.replace('/contents')
            }
        })
        .catch(res => {
            console.error(res);
            router.replace('/login');
        })
    }


    function goToListPage(){
        page.show('/contents?' + querystring);
    }


    onMount(async () => {
        window.scrollTo(0,0);
    })


    function bindContentsData(contentsData){
        contents.name.value = contentsData.name;
        contents.color.value = contentsData.color;
        contents.description.value = contentsData.description;
        contents.enableReservation.value = contentsData.enableReservation;
    }

    onMount(async () => {
        const request = getAxios();
        request.get('/v1/contents/' + contentsId)
            .then( res => {
                if(res.status === 200 && res.data.code === 'SUCC'){
                    bindContentsData(res.data.data);
                }else{
                    alertError(5000, '해당 콘텐츠 정보를 조회할 수 없습니다.');
                }
            })
            .catch( res => {
                console.error(res);
                alertError(5000, '해당 콘텐츠 정보를 조회할 수 없습니다.');
            });

    })
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
                <button class="success_btn submit w2" type="button" on:click={updateContents}>수정</button>
            </div>
            <div class="form_group button_group">
                <button class="warn_btn submit w2" type="button" on:click={removeContents}>삭제</button>
            </div>
            <div class="form_group button_group list_btn stick_r" on:click={goToListPage}>
                <ListIcon width="1.8em"/>
            </div>
        </div>
    </div>
</div>
