<script>
    import {getAxios} from '../../js/service/AuthAxios'
    import {alertError, alertSuccess} from '../../js/toast_store'
    import ContentTitle from '../../components/common/ContentTitle.svelte'
    import ListIcon from '../../components/common/icon/ListIcon.svelte'
    import router from 'page'
    import { onMount } from 'svelte';
    import page from 'page';
    import ErrorIcon from '../../components/common/icon/ErrorIcon.svelte';
    import SuccessIcon from '../../components/common/icon/SuccessIcon.svelte';

    export let params;
    export let querystring;

    const memberId = params.id;

    const titleName = '회원 조회';

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


    function updateMember(){
        const emptyRequiredKey = Object.keys(member).filter( key => member[key].require && !member[key].value);
        
        if(emptyRequiredKey.length > 0){
            alertError(5000, '이름, 성별, 생년월일은 필수값입니다.');
            return false;
        }

        if(!confirm('회원 정보를 수정하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.put('/v1/members/' + memberId, {
            name: member.name.value,
            sex: member.sex.value,
            birth: member.birth.value,
            myPhoneNumber: member.myPhoneNumber.value,
            parentsPhoneNumber: member.parentsPhoneNumber.value,
            address: member.address.value,
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


    function removeMember(){
        if(!confirm('정말로 회원 정보를 삭제하시겠습니까?')){
            return false;
        }

        const request = getAxios();

        request.delete('/v1/members/' + memberId)
        .then(res => {
            console.log(res);
            if(res.status === 200 && res.data.code === 'SUCC'){
                alertSuccess(3000, res.data.message);
                page.replace('/member')
            }
        })
        .catch(res => {
            console.error(res);
            router.replace('/login');
        })
    }


    function goToListPage(){
        page.show('/member?' + querystring);
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
                // isMyPhoneNumberDuplicate = true;
                // alertError(3000, '이미 등록된 연락처입니다.');
            }else if(res.status === 200 && res.data.code === 'SUCC'){
                // isMyPhoneNumberDuplicate = false;
            }
        })
        .catch(res => {
            console.error(res);
        })
    }

    onMount(async () => {
        window.scrollTo(0,0);
    })


    function bindMemberData(memberData){
        member.name.value = memberData.name;
        member.birth.value = memberData.birth;
        member.grade.value = memberData.grade;
        member.memo.value = memberData.memo;
        member.myPhoneNumber.value = memberData.myPhoneNumber;
        member.parentsPhoneNumber.value = memberData.parentsPhoneNumber;
        member.address.value = memberData.address;
        member.school.value = memberData.school;
        member.sex.value = memberData.sex;
    }

    function onKeyupMyPhoneNumber(e){
        member.myPhoneNumber.value = fitPhoneNumberAsRegex(e.target.value);
        // duplicatePhoneCheck();
    }

    function onKeyupParentPhoneNumber(e){
        member.parentsPhoneNumber.value = fitPhoneNumberAsRegex(e.target.value);
    }

    function fitPhoneNumberAsRegex(phoneString){
        return phoneString.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
    }

    onMount(async () => {
        const request = getAxios();
        request.get('/v1/members/' + memberId)
            .then( res => {
                if(res.status === 200 && res.data.code === 'SUCC'){
                    console.log(res.data.data);
                    bindMemberData(res.data.data);
                }else{
                    alertError(5000, '해당 회원의 정보를 조회할 수 없습니다.');
                }
            })
            .catch( res => {
                console.error(res);
                alertError(5000, '해당 회원의 정보를 조회할 수 없습니다.');
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
                <button class="success_btn submit w2" type="button" on:click={updateMember}>회원 수정</button>
            </div>
            <div class="form_group button_group">
                <button class="warn_btn submit w2" type="button" on:click={removeMember}>회원 삭제</button>
            </div>
            <div class="form_group button_group list_btn stick_r" on:click={goToListPage}>
                <ListIcon width="1.8em"/>
            </div>
        </div>
    </div>
</div>
