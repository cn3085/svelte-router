<script>
    import Login from "../pages/login/Login.svelte";
    import TimeTable from "../pages/timetable/TimeTable.svelte";
    import Header from "./Header.svelte";
    import Nav from "./Nav.svelte";
    import ConfirmTest from "../pages/ConfirmTest.svelte";
    import Game from "../pages/game/Game.svelte";
    export let contentComponent;
    export let params;
    export let querystring;
</script>

{#if contentComponent === Login}
    <Login></Login>
{:else if contentComponent === TimeTable}
    <Header />
    <TimeTable/>
{:else if contentComponent === Game}
    <Game/>
{:else if contentComponent === ConfirmTest}
    <!-- <Header /> -->
    <ConfirmTest/>
{:else}
    <Header />
    <Nav/>
    <section id="content_area">
        <svelte:component this={contentComponent} {params} {querystring}/>
    </section>
{/if}

<style>
    #content_area{
        margin-left: 17%;
        width: 80%;
        margin-top: 70px;
        display: inline-block;
    }
</style>