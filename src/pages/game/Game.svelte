<script>
    import Card from '../../components/game/Card.svelte'
    import GyeolTimeOutLine from '../../components/game/GyeolTimeOutLine.svelte';
    import TimeOutLine from '../../components/game/TimeOutLine.svelte'
    import { cards, point, init, submitGyeol } from "../../js/game_store";

    init();    

</script>
<section>
    <TimeOutLine/>
    <GyeolTimeOutLine/>
    <div>
        {$point}
    </div>
    <div id="card_area">
        {#each $cards.randomCards as card, i}
            <Card id={i} shape={card.shape} color={card.color} background={card.background} clicked={card.clicked}/>
        {/each}
    </div>
    <button on:click={() => submitGyeol($cards.winCards)}>결</button>
    
</section>

<style>
    #card_area{
        width: 450px;
        height: 450px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>