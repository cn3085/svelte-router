<script>
    import page from 'page';
    import {doLogout} from '../js/service/LoginService'
    import { onMount } from 'svelte';

    function goHome(){
        page.show('/');
    }

	let time = new Date();

    let noonDiff = 0
    let noonName = ''
    $: if(time.getHours() > 12 ){
        noonDiff = 12;
        noonName = '오후';
    }else{
        noonDiff = 0;
        noonName = '오전';
    }
    
	$: hours = (time.getHours() - noonDiff + '').padStart(2, '0');
	$: minutes = (time.getMinutes() + '').padStart(2, '0');
	$: seconds = (time.getSeconds() + '').padStart(2, '0');

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div id="header">
    <div class="top_logo_box">
        <div class="top_logo_sq" on:click={goHome}>
            <img src="/images/common/logo_sq.png" alt="logo_square">
        </div>
        <div  class="top_logo_name" on:click={goHome}>
            <img src="/images/common/logo_name.png" alt="logo_name">
        </div>
    </div>
    <div class="top_logout_box">
        <!-- <p class="logout_btn" on:click={doLogout}>로그아웃</p> -->
    </div>
    <div class="top_time_box">
        {noonName} {hours}:{minutes}:{seconds}
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
    cursor: pointer;
}

.top_logo_name{
    width: 150px;
    cursor: pointer;
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
.top_time_box{
    color: rgb(255, 255, 255);
    font-size: 25px;
    line-height: 61.21px;
    vertical-align: middle;
    padding-right: 20px;
}

</style>