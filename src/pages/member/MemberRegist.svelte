<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ErrorIcon from '../../components/common/icon/ErrorIcon.svelte'
    import SuccessIcon from '../../components/common/icon/SuccessIcon.svelte'
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import router from 'page'
    import page from 'page';

    const titleName = '회원 등록';

    let isNameDuplicate = undefined;
    let isMyPhoneNumberDuplicate = undefined;
    
    let member = {
        name : {
            value : null,
            require : true,
        },
        sex : {
            value : 'M',
            require : true
        },
        birth : {
            value : null,
            require : true
        },
        myPhoneNumber : {
            value : null,
            require : false
        },
        parentsPhoneNumber : {
            value : null,
            require : false
        },
        address : {
            value : null,
            require : false
        },
        school : {
            value : null,
            require : false
        },
        grade : {
            value : '1',
            require : false
        },
        memo : {
            value : null,
            require : false
        },
    }


    async function registMember(){
        const emptyRequiredKey = Object.keys(member).filter( key => member[key].require && !member[key].value);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 성별, 생년월일은 필수값입니다.');
            return false;
        }

        
        try{
            const request = getAxios();
            const res = await request.post('/v1/members', {
                name: member.name.value,
                sex: member.sex.value,
                birth: member.birth.value,
                myPhoneNumber: member.myPhoneNumber.value,
                parentsPhoneNumber: member.parentsPhoneNumber.value,
                address: member.address.value,
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
            if(err.response?.status === 401){
                alertError('로그인 후 시도해주세요.');
                return;
            }
        }
    }

    function goToListPage(){
        page.show('/member');
    }

    function onKeyupMyPhoneNumber(e){
        member.myPhoneNumber.value = fitPhoneNumberAsRegex(e.target.value);
        duplicatePhoneCheck();
    }

    function onKeyupParentPhoneNumber(e){
        member.parentsPhoneNumber.value = fitPhoneNumberAsRegex(e.target.value);
    }

    function duplicatePhoneCheck(){

        let myPhoneNumberValue = member.myPhoneNumber.value;

        if(myPhoneNumberValue === ''){
            isMyPhoneNumberDuplicate = undefined;
            return;
        }
        const request = getAxios();
        request.post('/v1/members/duplicate-phone?myPhoneNumber=' + member.myPhoneNumber.value)
        .then(res => {
            if(res.status === 200 && res.data.code === 'FAIL'){
                isMyPhoneNumberDuplicate = true;
                alertError(3000, '이미 등록된 연락처입니다.');
            }else if(res.status === 200 && res.data.code === 'SUCC'){
                isMyPhoneNumberDuplicate = false;
            }
        })
        .catch(res => {
            console.error(res);
        })
    }

    function duplicateNameCheck(){
        let nameValue = member.name.value;
        console.log(nameValue);

        if(nameValue === ''){
            isNameDuplicate = undefined;
            return;
        }
        const request = getAxios();
        request.post('/v1/members/duplicate-name?name=' + nameValue)
        .then(res => {
            if(res.status === 200 && res.data.code === 'FAIL'){
                isNameDuplicate = true;
                alertError(3000, '이미 등록된 이름입니다.');
            }else if(res.status === 200 && res.data.code === 'SUCC'){
                isNameDuplicate = false;
            }
        })
        .catch(res => {
            console.error(res);
        })
    }

    function fitPhoneNumberAsRegex(phoneString){
        return phoneString.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
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
                    <input class="input w4" type="text" maxlength="15" on:keyup={duplicateNameCheck} bind:value={member.name.value} placeholder="이름을 입력하세요.">
                    <div style="display: inline-block; position: absolute; right: 22px; top: 10px;">
                        {#if isNameDuplicate === true}
                            <ErrorIcon/>
                        {:else if isNameDuplicate === false}
                            <SuccessIcon/>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    성별<span class="necessary">*</span>
                </div>
                <div class="input_form">
                    <label for="sex-type-m">
                        남<input class="input w1" id="sex-type-m" type="radio" name="sexType" value="M" bind:group={member.sex.value}>
                    </label>
                    <label for="sex-type-w">
                        여<input class="input w1" id="sex-type-w" type="radio" name="sexType" value="W" bind:group={member.sex.value}>
                    </label>
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    생년월일<span class="necessary">*</span>
                </div>
                <div class="input_form">
                    <input class="input w4" type="date" max="9999-12-31"  bind:value={member.birth.value}>
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    학교
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="15" bind:value={member.school.value} placeholder="학교명을 입력하세요.">
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    학년
                </div>
                <div class="input_form">
                    <select class="input w2" bind:value={member.grade.value}>
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    본인 연락처
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="15" on:keyup={onKeyupMyPhoneNumber} bind:value={member.myPhoneNumber.value} placeholder="본인 연락처를 입력하세요.">
                    <div style="display: inline-block; position: absolute; right: 22px; top: 10px;">
                        {#if isMyPhoneNumberDuplicate === true}
                            <ErrorIcon/>
                        {:else if isMyPhoneNumberDuplicate === false}
                            <SuccessIcon/>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    보호자 연락처
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="15" on:keyup={onKeyupParentPhoneNumber} bind:value={member.parentsPhoneNumber.value} placeholder="보호자 연락처를 입력하세요.">
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    주소
                </div>
                <div class="input_form">
                    <input class="input w8" type="text" maxlength="100" bind:value={member.address.value} placeholder="주소를 입력하세요.">
                </div>
            </div>
        </div>
        <div class="form_line">
            <div class="form_group">
                <div class="form_name">
                    메모
                </div>
                <div class="input_form">
                    <textarea class="input w8" cols="40" rows="40" bind:value={member.memo.value} maxlength="500"></textarea>
                </div>
            </div>
        </div>
        <div class="form_line w10">
            <div class="form_group button_group">
                <button class="success_btn submit w4" type="button" on:click={registMember}>회원등록</button>
            </div>
            <div class="form_group button_group list_btn stick_r" on:click={goToListPage}>
                <ListIcon width="1.8em"/>
            </div>
        </div>
    </div>
</div>
