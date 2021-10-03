<script>
    import DotBlue from './DotBlue.svelte';
    import DotRed from './DotRed.svelte';

    export let memberId = 0;
    export let name = '';
    export let sex = '';
    export let birth = '';
    export let myPhoneNumber = '';
    export let school = '';
    export let i = 0;
</script>
<tr>
    <td>{i}</td>
    <td>{name}</td>
    <td>
        {#if sex === 'M'}
            <DotBlue/>남
        {:else if sex === 'W'}
            <DotRed/>여
        {/if}
    </td>
    <td>{birth}</td>
    <td>{myPhoneNumber ?? '-'}</td>
    <td>{school ?? '-'}</td>
</tr>
<style>
    td{
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        text-align: center;
        padding: 8px 0;
    }
    tr td:nth-child(1){
        border-left: 1px solid #e2e2e2;
    }
    tr td:last-child{
        border-right: 1px solid #e2e2e2;
    }
</style>