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
    export let movePage;

    async function goPage(clickedPage){
        // $pageable.showNumber = clickedPage;
        await movePage(clickedPage - 1);
    }

    
    
    
    

</script>
<div id="page_navigation_area">
    <div id="page_before_area">
        {#if $pageable.totalPages > 10 && $pageable.number > 9}
            <div class="page_nav_btn svg_wrapper" on:click={() => goPage(0)}>
                    <IconGoFirst/>
            </div>
            <div class="page_nav_btn svg_wrapper" on:click={() => goPage($pageable.pageNumbers.slice(0,1) - 1)}>
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
        {#if $pageable.totalPages > 10 && $pageable.pageNumbers.slice(-1) != $pageable.totalPages}
            <div class="page_nav_btn svg_wrapper" on:click={() => goPage(Number($pageable.pageNumbers.slice(-1)) + 1)}>
                <IconGoAfter/>
            </div>
            <div class="page_nav_btn svg_wrapper" on:click={() => goPage($pageable.totalPages)}>
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