<script>
import { onMount } from "svelte";


    let timeoutId;
    let timeLimit = 60;
    width;

    onMount( async() => {

    })
</script>
<section>
    <div id="timeout_bar">
        <div id="timeout_remain"></div>
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