<script>
    import { selectCard } from "../../js/game_store";
    export let id = -1;
    export let shape = 'circle';
    export let color = 'red';
    export let background = 'black';
    export let clicked = false;
</script>
<div class='card {background}' class:clicked on:click={() => selectCard(id)}>
    <div class='shape {shape} {color}'>{clicked}
    </div>
</div>
<style>
    .card{
        box-sizing: border-box;
        border: 1px solid black;
        width: 30%;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card.clicked{
        border: 5px solid purple;
    }
    .card:hover{
        opacity: 70%;
        cursor: pointer;
    }
    .card.black{
        background-color: black;
    }
    .card.grey{
        background-color: grey;
    }
    .card.white{
        background-color: white;
    }
    .shape{
        box-sizing: border-box;
        width: 120px;
        height: 120px;
        border: 1px solid black;
    }
    .shape.blue{
        background-color: blue;
    }
    .shape.red{
        background-color: red;
    }
    .shape.yellow{
        background-color: yellow;
    }
    .shape.circle{
        border-radius: 100%;
    }
    .shape.triangle{
        width: 0px;
        height: 0px;
        border-bottom: 120px solid transparent;
        border-left: 65px solid;
        border-right: 65px solid;
        color: initial;
    }
    .shape.square{
    }

</style>


