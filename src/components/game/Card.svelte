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
        width: 70%;
        height: 70%;
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
        border-bottom: 100px solid;
        border-left: 45px solid transparent;
        border-right: 45px solid transparent;
        color: initial;
    }
    .shape.triangle.blue{
        background-color: transparent;
        border-bottom-color: blue;
    }
    .shape.triangle.red{
        background-color: transparent;
        border-bottom-color: red;
    }
    .shape.triangle.yellow{
        background-color: transparent;
        border-bottom-color: yellow;
    }
    .shape.square{
    }

</style>


