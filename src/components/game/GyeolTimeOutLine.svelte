<script>
import { onMount } from "svelte";
import { gyeolTime,aSecondWidth, startTimeGyeolTimeout} from "../../js/game_store";

    
    $: timeLimitWidth = aSecondWidth * $gyeolTime.timeLimit;

    
    onMount( async() => {
        startTimeGyeolTimeout();
    })

</script>
{#if $gyeolTime.isBonusTime}
    <section>
        <div id="timeout_bar">
            <div id="timeout_remain" style="width:{timeLimitWidth}%">{$gyeolTime.timeLimit}초</div>
        </div>
    </section>
{/if}

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