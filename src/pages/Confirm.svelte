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
    <div on:click={onClickNo} transition:fade={{duration:100}}>
        <div id="confirm_barrier"></div>
        <div id="confirm_area">
            <div>
                {$confirmData.message}
            </div>
            <div class="button_area">
                <div class="button yes" on:click={onClickYes}>{$confirmData.yes}</div>
                <div class="button no" on:click={onClickNo}>{$confirmData.no}</div>
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
        background-color: #a8a8a8;
        opacity: .5;
    }
    #confirm_area{
        box-sizing: border-box;
        margin: auto;
        width: 400px;
        height: 200px;
        padding: 20px;
        text-align: center;
        background-color: yellowgreen;
        top: 15%;
        position: relative;
        border-radius: 10px;
        background-color: #fff;
    }
    #confirm_area .button_area{
        display: flex;
        justify-content: space-evenly;
    }
    .button_area .button{
        box-sizing: border-box;
        min-width: 120px;
        height: 38px;
        padding: 6px 29px 7px 26px;
        border-radius: 10px;
        cursor: pointer;
    }
    .button_area .button.yes{
        background-color: #ffea71;
    }
    .button_area .button.no{
        border: solid 1px #ffea71;
        background-color: #fff;
    }
</style>