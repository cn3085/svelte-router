<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import SwitchButton from '../../components/common/SwitchButton.svelte'
    import page from 'page';

    const titleName = '콘텐츠 등록';
    
    let contents = {
        name : {
            value : null,
            require : true,
        },
        color : {
            value : null,
            require : true
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


    async function registMember(){
        const emptyRequiredKey = Object.keys(member).filter( key => member[key].require && !member[key].value);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 색, 예약가능여부는 필수값입니다.');
            return false;
        }

        
        try{
            const request = getAxios();
            const res = await request.post('/v1/members', {
                name: member.name.value,
                sex: member.sex.value,
                birth: member.birth.value,
                myPhoneNumber: member.myPhoneNumber.value,
                parentPhoneNumber: member.parentPhoneNumber.value,
                school: member.school.value,
                grade: member.grade.value,
                memo: member.memo.value
            });

            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
                page.replace('/member/detail/' + res.data.data.memberId);
            }
        }catch(err){
            console.log(err);
            console.log( '>>', err.message);
            console.log(err.response);
            console.log(err.response.status);
            if(err.response.status === 401){
                alertError('로그인 후 시도해주세요.');
                return;
            }
        }
    }

    function goToListPage(){
        page.show('/member');
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
                    메모
                </div>
                <div class="input_form">
                    <textarea class="input w8" cols="40" rows="40" bind:value={contents.description.value} maxlength="500"></textarea>
                </div>
            </div>
        </div>
        <div class="form_line w10">
            <div class="form_group button_group">
                <button class="success_btn submit w4" type="button" on:click={registMember}>등록</button>
            </div>
            <div class="form_group button_group list_btn stick_r" on:click={goToListPage}>
                <ListIcon width="1.8em"/>
            </div>
        </div>
    </div>
</div>
