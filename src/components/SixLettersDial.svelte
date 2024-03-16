<script lang="ts">
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let wordObj: any;
  export let shuffledWord: string;

  const dispatch = createEventDispatcher();

  const handleClick = (w: string, id: string) => {
    dispatch("letterClicked", { w, id });
  };

  const handleReset = () => {
    dispatch("resetClicked");
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="relative h-60 lg:w-72 w-full mx-auto mt-20 select-none"
  transition:slide
>
  <button
    on:click={handleReset}
    class="absolute top-[45%] left-[45%] rounded-full text-xl font-extrabold p-0 pl-[5px] pr-[3px]"
    >⟳</button
  >
  <div
    on:click={() => handleClick(shuffledWord[0], "0")}
    class="absolute top-0 left-1/4 text-6xl font-extrabold cursor-pointer transition-all ease-in-out duration-300"
    class:text-gray-400={!wordObj[shuffledWord[0] + "_" + "0"].tapped}
  >
    {shuffledWord[0]}
  </div>

  <div
    on:click={() => handleClick(shuffledWord[1], "1")}
    class="absolute top-0 right-1/4 text-6xl font-extrabold cursor-pointer transition-all ease-in-out duration-300"
    class:text-gray-400={!wordObj[shuffledWord[1] + "_" + "1"].tapped}
  >
    {shuffledWord[1]}
  </div>

  <div
    on:click={() => handleClick(shuffledWord[2], "2")}
    class="absolute top-24 left-0 text-6xl font-extrabold cursor-pointer transition-all ease-in-out duration-300"
    class:text-gray-400={!wordObj[shuffledWord[2] + "_" + "2"].tapped}
  >
    {shuffledWord[2]}
  </div>

  <div
    on:click={() => handleClick(shuffledWord[3], "3")}
    class="absolute top-24 right-0 text-6xl font-extrabold cursor-pointer transition-all ease-in-out duration-300"
    class:text-gray-400={!wordObj[shuffledWord[3] + "_" + "3"].tapped}
  >
    {shuffledWord[3]}
  </div>

  <div
    on:click={() => handleClick(shuffledWord[4], "4")}
    class="absolute bottom-0 left-1/4 text-6xl font-extrabold cursor-pointer transition-all ease-in-out duration-300"
    class:text-gray-400={!wordObj[shuffledWord[4] + "_" + "4"].tapped}
  >
    {shuffledWord[4]}
  </div>

  <div
    on:click={() => handleClick(shuffledWord[5], "5")}
    class="absolute bottom-0 right-1/4 text-6xl font-extrabold cursor-pointer transition-all ease-in-out duration-300"
    class:text-gray-400={!wordObj[shuffledWord[5] + "_" + "5"].tapped}
  >
    {shuffledWord[5]}
  </div>
</div>
