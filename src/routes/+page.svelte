<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { getWords } from "../api/api";
  import Game from "../components/Game.svelte";

  let wordsCount = 10;
  let lettersCount = 5;
  let customLetterCount = false;
  let customRarity = false;
  let wordsRarity = "Uncommon";
  let customTopic = false;
  let customTopicPrompt = "";
  let loading = false;
  let words: any;
  let start = false;

  const generateWords = async () => {
    loading = true;
    try {
      words = await getWords(
        wordsCount,
        customLetterCount,
        lettersCount,
        customRarity,
        wordsRarity,
        customTopic,
        customTopicPrompt
      );
      start = true;
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  };
</script>

<div class="">
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class="flex px-5 mt-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h4
      on:click={() => window.location.reload()}
      class="cursor-pointer text-3xl select-none"
    >
      Vocabul
    </h4>
    <h4 class="text-3xl font {start ? '' : 'animate-bounce'}">a</h4>
  </div>
  {#if start}
    <Game {words} />
  {:else}
    <div
      class="flex lg:flex-row flex-col lg:gap-16 lg:px-10 lg:mt-16 px-4"
      transition:fade
    >
      <div class="lg:w-2/5 lg:ml-10 lg:px-0">
        <h1 class="text-5xl lg:text-6xl">
          It will take less than 5 minutes to learn 5 new words!
        </h1>
        <h4 class="-mt-6 text-xl lg:text-2xl px-0.5">
          Expand Your Lexicon: A Quick Vocabulary Boost with Five New Words in
          Under Five Minutes. Elevate Your Language Skills Effortlessly!
        </h4>
      </div>
      <div
        class="lg:px-8 lg:py-5 px-0.5 py-4 flex-1 border-gray-700 mb-6 mt-5 lg:mt-0"
      >
        <div class="form-group">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="text-xl font-semibold">You wanna learn:</label>
          <input
            bind:value={wordsCount}
            class="input-block"
            type="range"
            name="percentage"
            id="percentage"
            min="5"
            max="20"
            oninput="output.value = this.value + ' words';"
          />
          <output id="output" class="text-md font-semibold">10 words</output>
        </div>
        {#if !customTopic}
          <div class="flex lg:flex-row flex-col" transition:slide>
            <div class="flex">
              <div class="text-xl font-semibold mt-5">Letter Count:</div>
              <div class="form-group ml-2">
                <label for="paperSwitch1" class="paper-switch-tile">
                  <input
                    id="paperSwitch1"
                    name="paperSwitch1"
                    type="checkbox"
                    bind:checked={customLetterCount}
                  />
                  <div class="paper-switch-tile-card border">
                    <div
                      class="paper-switch-tile-card-front border background-warning"
                    >
                      Random
                    </div>
                    <div
                      class="paper-switch-tile-card-back border background-secondary"
                    >
                      Custom
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {#if customLetterCount}
              <div class="form-group flex-1 lg:mt-2 -mt-10">
                <input
                  bind:value={lettersCount}
                  class="input-block"
                  type="range"
                  name="percentage"
                  id="percentage"
                  min="3"
                  max="8"
                  oninput="output2.value = this.value + ' letters max';"
                />
                <output id="output2" class="text-md font-semibold"
                  >5 letters max</output
                >
              </div>
            {/if}
          </div>

          <div
            class="flex lg:flex-row flex-col {customRarity
              ? 'mb-8 lg:mb-0'
              : ''} -mt-8 {customLetterCount ? 'mt-0 lg:-mt-8' : ''}"
            transition:slide
          >
            <div class="flex jus">
              <div class="text-xl font-semibold mt-5">Words' Rarity:</div>
              <div class="form-group ml-2">
                <label for="paperSwitch2" class="paper-switch-tile">
                  <input
                    id="paperSwitch2"
                    name="paperSwitch2"
                    type="checkbox"
                    bind:checked={customRarity}
                  />
                  <div class="paper-switch-tile-card border">
                    <div
                      class="paper-switch-tile-card-front border background-warning"
                    >
                      Random
                    </div>
                    <div
                      class="paper-switch-tile-card-back border background-secondary"
                    >
                      Custom
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {#if customRarity}
              <div
                class="flex justify-start lg:gap-x-2 flex-1 lg:-mt-12 -mt-10"
              >
                <button
                  on:click={() => (wordsRarity = "Common")}
                  class="btn-small font-bold ml-0"
                  class:btn-secondary={wordsRarity === "Common"}>Common</button
                >
                <button
                  on:click={() => (wordsRarity = "Uncommon")}
                  class="btn-small font-bold lg:ml-0 -ml-24"
                  class:btn-secondary={wordsRarity === "Uncommon"}
                  >Uncommon</button
                >
                <button
                  on:click={() => (wordsRarity = "Rare")}
                  class="btn-small font-bold lg:ml-0 -ml-24"
                  class:btn-secondary={wordsRarity === "Rare"}>Rare</button
                >
              </div>
            {/if}
          </div>
        {/if}

        <div
          class="flex lg:flex-row flex-col{customTopic ? '' : ' -mt-8'}"
          transition:slide
        >
          <div class="flex">
            <div class="text-xl font-semibold mt-5">Topic:</div>
            <div class="form-group ml-2">
              <label for="paperSwitch3" class="paper-switch-tile">
                <input
                  id="paperSwitch3"
                  name="paperSwitch3"
                  type="checkbox"
                  bind:checked={customTopic}
                />
                <div class="paper-switch-tile-card border">
                  <div
                    class="paper-switch-tile-card-front border background-warning"
                  >
                    Random
                  </div>
                  <div
                    class="paper-switch-tile-card-back border background-secondary"
                  >
                    Custom
                  </div>
                </div>
              </label>
            </div>
          </div>
          {#if customTopic}
            <div class="form-group flex-1 -mt-8 lg:-mt-0">
              <label for="large-input">Input Topic:</label>
              <textarea
                id="large-input"
                class="w-full"
                bind:value={customTopicPrompt}
                placeholder="You can write anything. From Shakespear's Hamlet to Naruto."
              ></textarea>
            </div>
          {/if}
        </div>

        <div class="flex justify-end {customTopic ? '' : ' -mt-8'}">
          <button
            class:disabled={loading}
            class:animate-bounce={loading}
            on:click={generateWords}
            class="font-bold"
          >
            Let's Play
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
