<script>
    export let contentComponent;
</script>
<section id="content_area">
    <svelte:component this={contentComponent}/>
</section>

<style>
    #content_area{
        margin-left: 17%;
        /* border: 3px solid red; */
        width: 80%;
        margin-top: 70px;
        display: inline-block;
    }
</style>