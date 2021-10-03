<script>
    import IconGoFirst from "./IconGoFirst.svelte";
    import IconGoBefore from "./IconGoBefore.svelte";
    import IconGoAfter from "./IconGoAfter.svelte";
    import IconGoLast from "./IconGoLast.svelte";
    import { pageable } from "../../../js/page_store";

    // export let number = 0;
    // export let totalPages = 1;
    // export let first = false;
    // export let last = false;
    export let getList;

    async function goPage(clickedPage){
        // $pageable.showNumber = clickedPage;
        await getList(clickedPage - 1);
    }

</script>
<div id="page_navigation_area">
    <div id="page_before_area">
        {#if $pageable.firstPageNum !== 1}
            <div class="page_nav_btn svg_wrapper">
                    <IconGoFirst/>
            </div>
            <div class="page_nav_btn svg_wrapper">
                    <IconGoBefore/>
            </div>
        {/if}
    </div>
    <div id="page_numbers_area">
        {#each $pageable.pageNumbers as p}
            <div class="page_number" class:selected={$pageable.showNumber === p} on:click={() => goPage(p)}>
                <p> {p} </p>
            </div>
        {/each}
    </div>
    <div id="page_after_area">
        {#if $pageable.pageNumbers.slice(-1) === $pageable.totalPages}
            <div class="page_nav_btn svg_wrapper">
                <IconGoAfter/>
            </div>
            <div class="page_nav_btn svg_wrapper">
                <IconGoLast/>
            </div>
        {/if}
    </div>
</div>


<style>
    
    #page_navigation_area{
        display: flex;
        justify-content: center;
    }
    #page_before_area{
        display: flex;   
    }
    #page_after_area{
        display: flex;   
    }
    #page_numbers_area{
        display: flex;
    }
    .page_number{
        margin: 0 6px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .svg_wrapper{
        display: flex;
        align-items: center;
    }
    .page_nav_btn{
        cursor: pointer;
        margin: 0 3px;
    }

    .page_number.selected{
        background-color: #ffea71;
        font-weight: bolder;
    }
    .page_number>p:hover{
        cursor: pointer;
        font-weight: bolder;
    }
</style>