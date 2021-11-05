<script>
	import {onMount, onDestroy, afterUpdate} from 'svelte';
	
	export let purpose = 0;
    export let speed = 1000;
	let intervalId;
	$ : i = 0;
	
	function countUp(){
        i++;
	}
	
	onMount( async () => {
		intervalId = setInterval(() => countUp(), speed);
	})
	
	onDestroy( async () => {
		clearInterval(intervalId);
	})
	
	afterUpdate( async () => {
		if(i >= purpose){
			clearInterval(intervalId);	
		}
	})
</script>


{i}