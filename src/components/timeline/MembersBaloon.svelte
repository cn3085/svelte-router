<script>
    import DotRed from '../../components/member/DotRed.svelte'
    import DotBlue from '../../components/member/DotBlue.svelte'

    export let members = [];

    let showMembers = members.slice(0, 6);
</script>
<div class="members_baloon">
    {#each showMembers as m}
        <div class="member">
            <div class="name">
                {#if m.sex === 'M'}
                    <DotBlue/>
                {:else}
                    <DotRed/>
                {/if}
                {m.name}
            </div>
            <div class="birth">({m.birth})</div>
        </div>
    {/each}
    {#if members.length > 6}
        <div class="etc">등 {members.length} 명</div>
    {/if}
</div>
<style>
    .members_baloon{
        box-sizing: border-box;
        width: 130px;
        position: absolute;
        padding: 0 10px;
        top: -25px;
        left: calc(100% * 2/3);
        border-radius: 5px;
        font-size: 13px;
    }

    .members_baloon .member{
        display: flex;
        align-items: center;
    }

    .member .birth{
        font-size: 10px;
        font-weight: normal;
    }
    .member .name{
        text-align: left;
        width: 55%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 auto;
    }
    .members_baloon .etc{
        font-style: italic;
        font-size: 10px;
        font-weight: normal;
        text-align: right;
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