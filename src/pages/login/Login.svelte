<script>
    import {doLogin} from '../../js/LoginService';
    import {replace} from 'svelte-spa-router'
    let username="";
    let password="";

    async function submitLogin(){
        if(!username){
            alert('아이디를 입력해주세요.');
            return;
        }
        if(!password){
            alert('비밀번호를 입력해주세요.');
            return;
        }

        const {code, message} = await doLogin({userId:username, password: password});

        if(code === 'SUCC'){
            replace('/')
        }else{
            alert(message);
        }
    }
</script>
<div class="v_c_wrapper">
    <div id="login_form_area">
        <div class="logo_box">
            <div class="logo_img_box">
                <img src="/images/common/logo_img.png" alt="logo_img">
            </div>
            <div  class="logo_img_box logo_name_box">
                <img src="/images/common/logo_name_b.png" alt="logo_name">
            </div>
        </div>
        <div>
            <div>
                <form>
                    <div class="form_box">
                        <img class="form_img" src="/images/common/person.png" alt="">
                        <input class="login_input input" type="text" name="username" id="username" placeholder="Username" bind:value={username} on:keydown={(e) => {e.key === 'Enter' && submitLogin()}}>
                    </div>
                    <div class="form_box">
                        <img class="form_img" src="/images/common/secret.png" alt="">
                        <input class="login_input input" type="password" name="password" id="password" placeholder="Password" bind:value={password}  on:keydown={(e) => {e.key === 'Enter' && submitLogin()}}>
                    </div>
                </form>
            </div>
            <div>
                <button id="login_btn" type="button" on:click={submitLogin}>로그인</button>
            </div>
        </div>
    </div>
</div>


<style>
#login_form_area{
  width: 372px;
  margin: 0 auto;
  top: -27px;
  position: relative;
}
.logo_box{
  display: flex;
  align-items: flex-end;
  width: 372px;
}

.logo_img_box{
  margin: 10px;
  width: 214px;
}

.logo_name_box{
  width: 100%;
}

.login_input{
  width: 300px;
  height: 28px;
  margin: 15.4px 0 10px;
  padding: 10px 10px 8px 60px;
  object-fit: contain;
  border-radius: 8px;
  border: solid 1px #707070;
  background-color: #ffffff;
  font-size: 15px;
}

#login_btn{
  background: #fff1a3;
  width: 372px;
  height: 48px;
  margin: 15.4px 0 0;
  border-radius: 8px;
  border: 0;
  color: #707070;
}

#login_btn:hover{
  background: #ffea71;
  box-shadow: 1px 1px #d9d9d9;
  font-weight: bolder;
  cursor: pointer;
}

.form_img{
  position: absolute;
  top: 33px;
  left: 25px;
  width: initial;
  height: 13px;
}

.form_box{
  position: relative;
}
</style>