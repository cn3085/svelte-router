<script>
    import Card from '../../components/game/Card.svelte'
    import TimeOutLine from '../../components/game/TimeOutLine.svelte'
    import { game, getNewRandomCard, backgroundColors, colors, shapes } from "../../js/game_store";

    let allCards = [];
    const NUMBER_OF_CHOOSE_CARD = 9;

    init();
    
    function init(){
        fillAllCard();
        getNewRandomCard(allCards, NUMBER_OF_CHOOSE_CARD);
    }


    function fillAllCard(){
        let card = {};
        let tempCards = [];
        for(let b of backgroundColors){
            for(let c of colors){
                for(let s of shapes){
                    card = {
                        shape : s,
                        color : c,
                        background : b,
                        clicked : false
                    }
                    tempCards.push(card);
                }
            }
        }
        allCards = tempCards;
    }

</script>
<section>
    <TimeOutLine/>
    <div id="card_area">
        {#each $game.randomCards as card, i}
            <Card id={i} shape={card.shape} color={card.color} background={card.background} clicked={card.clicked}/>
        {/each}
    </div>
    
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