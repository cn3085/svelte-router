<script>
import Login from "../pages/login/Login.svelte";

    import Header from "./Header.svelte";
    import Nav from "./Nav.svelte";
    
    export let contentComponent;
    export let params;
    export let querystring;

    if(contentComponent === Login){
        console.log('yes');
    }
</script>

{#if contentComponent === Login}
    <Login></Login>
{:else}
    <Header />
    <Nav />
    <section id="content_area">
        <svelte:component this={contentComponent} {params} {querystring}/>
    </section>
{/if}

<style>
    #content_area{
        margin-left: 17%;
        /* border: 3px solid red; */
        width: 80%;
        margin-top: 70px;
        display: inline-block;
    }
</style>