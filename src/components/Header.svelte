<script>
    import {doLogout} from '../js/service/LoginService'
</script>

<div id="header">
    <div class="top_logo_box">
        <div class="top_logo_sq">
            <img src="/images/common/logo_sq.png" alt="logo_square">
        </div>
        <div  class="top_logo_name">
            <img src="/images/common/logo_name.png" alt="logo_name">
        </div>
    </div>
    <div class="top_logout_box">
        <p class="logout_btn" on:click={doLogout}>로그아웃</p>
    </div>
</div>


<style>
#header{
    background-color: #4c4c4e;
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    z-index: 9;
}

.top_logo_box{
    display: flex;
    align-items: center;
    height: 100%;
}

.top_logo_sq{
    width: 45px;
    margin: 6px 25px;
}

.top_logo_name{
    width: 150px;
}
.top_logout_box{
    margin-left: auto;
    font-size: 11px;
    margin-right: 1%;
}
.logout_btn{
    color: white;
}
.logout_btn:hover{
    color: rgb(194, 194, 194);
    text-decoration: underline;
    cursor: pointer;
}
</style>