<script>
    import IconGoFirst from "./IconGoFirst.svelte";
    import IconGoBefore from "./IconGoBefore.svelte";
    import IconGoAfter from "./IconGoAfter.svelte";
    import IconGoLast from "./IconGoLast.svelte";
</script>
<div id="page_navigation_area">
    <div id="page_before_area">
        <div class="page_nav_btn svg_wrapper">
            <IconGoFirst/>
        </div>
        <div class="page_nav_btn svg_wrapper">
            <IconGoBefore/>
        </div>
    </div>
    <div id="page_numbers_area">
        <div class="page_number"><a href=""> 1 </a> </div>
        <div class="page_number"><a href=""> 2 </a> </div>
        <div class="page_number"><a href=""> 3 </a> </div>
        <div class="page_number"><a href=""> 4 </a> </div>
        <div class="page_number"><a href=""> 5 </a> </div>
        <div class="page_number"><a href=""> 6 </a> </div>
        <div class="page_number"><a href=""> 7 </a> </div>
        <div class="page_number"><a href=""> 8 </a> </div>
        <div class="page_number"><a href=""> 9 </a> </div>
        <div class="page_number selected"><a href=""> 10 </a> </div>
    </div>
    <div id="page_after_area">
        <div class="page_nav_btn svg_wrapper">
            <IconGoAfter/>
        </div>
        <div class="page_nav_btn svg_wrapper">
            <IconGoLast/>
        </div>
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
</style>