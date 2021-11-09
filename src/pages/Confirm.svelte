<script>
    import { confirmData } from "../js/confirm_store";
    import { fade } from "svelte/transition";

    function onClickYes(e){
        e.stopPropagation();
        $confirmData.confirmThis();
    }
    
    function onClickNo(e){
        e.stopPropagation();
        $confirmData.isHide = true;
    }

</script>
{#if !$confirmData.isHide}
    <div id="confirm_barrier" on:click={onClickNo} transition:fade={{duration:100}}>
        <div id="confirm_area">
            <div>
                {$confirmData.message}
            </div>
            <div class="button_area">
                <div class="button" on:click={onClickYes}>{$confirmData.yes}</div>
                <div class="button" on:click={onClickNo}>{$confirmData.no}</div>
            </div>
        </div>
    </div>
{/if}

<style>
    #confirm_barrier{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    #confirm_area{
        box-sizing: border-box;
        margin: auto;
        width: 400px;
        height: 200px;
        border: 1px solid black;
        padding: 20px;
        text-align: center;
        background-color: yellowgreen;
        top: 15%;
        position: relative;
    }
    #confirm_area .button_area{
        display: flex;
        justify-content: center;
    }
</style>