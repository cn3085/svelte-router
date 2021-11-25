<script>
import { onMount } from "svelte";
import { time, aSecondWidth, updateGameTime, checkTimeout, setIntervalId } from "../../js/game_store";

    
    $: timeLimitWidth = aSecondWidth * $time.timeLimit;

    onMount( async() => {
        const intervalId = setInterval(() => {
            updateGameTime(-1);
            checkTimeout();
        }, 1000);
        setIntervalId(intervalId);
    })

</script>
<section>
    <div id="timeout_bar">
        <div id="timeout_remain" style="width:{timeLimitWidth}%">{$time.timeLimit}초</div>
    </div>
</section>

<style>
    #timeout_bar{
        width: 500px;
        height: 20px;
    }
    #timeout_remain{
        width: 100%;
        height: 100%;
        background-color: red;
    }
</style>