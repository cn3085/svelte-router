<script>
    import DotRed from '../../components/member/DotRed.svelte'
    import DotBlue from '../../components/member/DotBlue.svelte'

    export let members = [];
</script>
<div class="members_baloon">
    {#each members as m}
        <div class="member">
            {#if m.sex === 'M'}
                <DotBlue/>
            {:else}
                <DotRed/>
            {/if}
            <div>{m.name}</div>
            <div class="birth">({m.birth})</div>
        </div>
    {/each}
</div>
<style>
    .members_baloon{
        box-sizing: border-box;
        width: 130px;
        position: absolute;
        top: -25px;
        left: calc(100% * 1/2);
        border-radius: 5px;
    }

    .members_baloon .member{
        display: flex;
        align-items: center;
    }

    .member .birth{
        font-size: 10px;
    }
    :global(.time_registed .members_baloon) {
        display: none;
    }
    :global(.time_registed:hover .members_baloon) {
        display: block;
        box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.2);
        background-color: rgba(255,255,255,0.3);
        backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
        -webkit-backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
    }
</style>