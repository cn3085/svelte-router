<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ErrorIcon from '../../components/ErrorIcon.svelte'
    import router from 'page'

    const titleName = '회원 등록';

    let myPhoneNumberDuplicate = undefined;
    
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
        parentPhoneNumber : {
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


    function registMember(){
        const emptyRequiredKey = Object.keys(member).filter( key => member[key].require && !member[key].value);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 성별, 생년월일은 필수값입니다.');
            return false;
        }

        const request = getAxios();

        request.post('/v1/members', {
            name: member.name.value,
            sex: member.sex.value,
            birth: member.birth.value,
            myPhoneNumber: member.myPhoneNumber.value,
            parentPhoneNumber: member.parentPhoneNumber.value,
            school: member.school.value,
            grade: member.grade.value,
            memo: member.memo.value
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


    function duplicateCheck(){
        const request = getAxios();
        request.post('/v1/members/duplicate-phone?myPhoneNumber=' + member.myPhoneNumber.value)
        .then(res => {
            if(res.status === 200 && res.data.code === 'FAIL'){
                alertError(3000, '이미 등록된 연락처입니다.');
            }
        })
        .catch(res => {
            console.error(res);
        })
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
                    <input class="input w4" type="text" maxlength="15" bind:value={member.name.value} placeholder="이름을 입력하세요.">
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
                    연락처
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="15" on:keyup={duplicateCheck} bind:value={member.myPhoneNumber.value} placeholder="‘-’ 구분없이 입력하세요">
                    <div>
                        <ErrorIcon/>
                    </div>
                </div>
            </div>
            <div class="form_group">
                <div class="form_name">
                    연락처2
                </div>
                <div class="input_form">
                    <input class="input w4" type="text" maxlength="15" bind:value={member.parentPhoneNumber.value} placeholder="‘-’ 구분없이 입력하세요">
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
        <div class="form_line">
            <div class="form_group button_group">
                <button class="success_btn submit w4" type="button" on:click={registMember}>회원등록</button>
            </div>
        </div>
    </div>
</div>
