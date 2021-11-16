<script>
import { onMount } from "svelte";
import config from "../../js/config";

let socket = null;



onMount( async () => {
    socket = new WebSocket(config.socketURL);

    socket.onopen = function(e){
        console.log('socket open.', e);	
    }

    socket.onmessage = function(e){
        console.log('socket message', e);
    }

    socket.onclose = function(e){
        if(e.wasClean){
            console.log('socket close. ', e.code, e.reason);
        }else{
            console.error('socker close on error. ', e);
        }
    }

    socket.onerror = function(e){
        console.error(e);
    }
});
</script>
