<script>
    import { confirm } from "../js/confirm_store";
    let a = '크크';
    let b = '바보';
    function test(){
        confirm('진짜 하실겁니까?', () => console.log(a, b + ' !!!'));
    }
</script>
<div>
    <label class="radio_label" for="yes">
        <input id="yes" name="yesOrNo" type="radio">yes
    </label>
    <label class="radio_label" for="no">
        <input id="no" name="yesOrNo" type="radio">no
    </label>
</div>
<div on:click={test}>
    버튼
</div>
<style>
input[type="radio"],
input[type="radio"]:before,
input[type="radio"]:after {
  box-sizing: border-box;
}

.radio_label {
  font-family: system-ui, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.radio_label + .radio_label {
  margin-top: 1em;
}

.radio_label:focus-within {
  color: rgb(0, 0, 0);
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: white;
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em rgb(115, 115, 116);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

/* input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
} */
</style>