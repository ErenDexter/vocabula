<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { getDefinition, getHint } from "../api/api";
  import SixLettersDial from "./SixLettersDial.svelte";
  import ThreeLettersDial from "./ThreeLettersDial.svelte";
  import FourLettersDial from "./FourLettersDial.svelte";
  import FiveLettersDial from "./FiveLettersDial.svelte";
  import SevenLettersDail from "./SevenLettersDail.svelte";
  import EightLettersDials from "./EightLettersDials.svelte";
  import { toJpeg, toPng } from "html-to-image";

  export let words: any;

  let currentWordCount = 0;
  let currentWord = words[currentWordCount].toUpperCase();
  let guessedWord = "_".repeat(currentWord.length).split("");
  let shuffledWord = shuffleString(currentWord);
  let wordObj: any = {};
  let description = "";
  let count = 0;
  let correct = false;
  let wrong = false;
  let error = false;
  let loading = false;
  let showNext = false;
  let loadingHint = false;
  let hintShowed = false;
  let hintText = "";
  let hintCount = 0;
  let resetCount = 0;
  let finish = false;
  let showFinish = false;

  $: if (count === currentWord.length) {
    if (currentWord === guessedWord.join("")) {
      correct = true;
      hintShowed = false;
      laodDescription(currentWord);
    } else wrong = true;
  }

  $: if (currentWordCount === words.length - 1) {
    finish = true;
  }
  shuffledWord.split("").forEach((letter, i) => {
    wordObj[letter + "_" + i] = { value: letter, tapped: false };
  });

  const laodDescription = async (w: string) => {
    loading = true;
    try {
      description = await getDefinition(w);
    } catch (error) {
      console.log(error);
      error = true;
    } finally {
      loading = false;
      showNext = true;
    }
  };

  const handleClick = (letter: string, id: string) => {
    if (wordObj[letter + "_" + id].tapped === true) return;
    for (let i = 0; i < currentWord.length; i++) {
      if (guessedWord[i] === "_") {
        guessedWord[i] = letter;
        count++;
        break;
      }
    }
    wordObj[letter + "_" + id].tapped = true;
  };

  const handleReset = () => {
    shuffledWord.split("").forEach((letter, i) => {
      wordObj[letter + "_" + i] = { value: letter, tapped: false };
    });
    guessedWord = "_".repeat(currentWord.length).split("");
    count = 0;
    wrong = false;
    resetCount++;
  };

  const handleNext = () => {
    currentWordCount++;
    currentWord = words[currentWordCount].toUpperCase();
    guessedWord = "_".repeat(currentWord.length).split("");
    shuffledWord = shuffleString(currentWord);
    wordObj = {};
    description = "";
    count = 0;
    correct = false;
    wrong = false;
    error = false;
    loading = false;
    showNext = false;

    shuffledWord.split("").forEach((letter, i) => {
      wordObj[letter + "_" + i] = { value: letter, tapped: false };
    });
  };

  const showHint = async () => {
    loadingHint = true;
    try {
      hintText = await getHint(currentWord);
      hintShowed = true;
      hintCount++;
    } catch (error) {
      console.log(error);
      error = true;
    } finally {
      loadingHint = false;
    }
  };

  function shuffleString(str: string) {
    const characters = str.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join("");
  }

  function downloadImage() {
    toJpeg(document.getElementById("vocab") as HTMLElement).then(
      function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      }
    );
  }
</script>

{#if showFinish}
  <div class="flex justify-center mt-20">
    <div class="flex flex-col gap-3 items-center">
      <h2 class="text-4xl lg:text-6xl">Congratulations!</h2>
      <div class="flex gap-2">
        <div
          class="flex flex-col items-center gap-2 p-3 border-gray-700 border-2"
        >
          <h4>Resets Used</h4>
          <h3>{resetCount}</h3>
        </div>
        <div
          class="flex flex-col items-center gap-2 p-3 border-gray-700 border-2"
        >
          <h4>Hints Used</h4>
          <h3>{hintCount}</h3>
        </div>
      </div>
      <button on:click={() => window.location.reload()} class="mt-10"
        >Play Again</button
      >
    </div>
  </div>
{:else}
  <div class="lg:px-10 px-4">
    <div class="flex justify-center text-gray-500 mt-6 lg:mt-0">
      {currentWordCount + 1}/{words.length}
    </div>
    <div
      class="flex justify-center gap-x-4 mt-8"
      class:animate-bounce={loading}
    >
      {#each guessedWord as letter}
        {#if letter === "_"}
          <div
            class="text-4xl font-bold border-gray-700 border-b-4 text-transparent"
          >
            {letter}
          </div>
        {:else}
          <div
            class="text-4xl font-bold border-gray-700 border-b-4 transition-all ease-in-out duration-300"
            class:border-green-500={correct}
            class:border-red-500={wrong}
            in:slide
          >
            {letter}
          </div>
        {/if}
      {/each}
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="px-0">
      {#if correct && !loading && !error}
        <div class="flex justify-center mt-10 bg-white" in:slide>
          <div
            class="border-gray-700 border-2 lg:px-6 lg:py-3 px-3.5 py-3 lg:w-1/2 w-full"
          >
            <div class="flex flex-col gap-3">
              <h4
                class="lg:text-2xl text-xl font-bold underline underline-offset-2"
              >
                {currentWord}
              </h4>
              <p class="lg:text-lg text-base">
                {description}
              </p>
            </div>
          </div>
        </div>
      {:else if error}
        <div class="flex justify-center mt-20" in:slide>
          <div
            class="border-gray-700 border-2 lg:px-6 lg:py-3 px-2.5 py-1.5 lg:w-1/3 w-full"
          >
            <div class="flex flex-col gap-3">
              <h4 class="text-2xl font-bold underline underline-offset-2">
                Error
              </h4>
              <p class="text-lg">Something went wrong</p>
            </div>
          </div>
        </div>
      {:else if currentWord.length === 3}
        <div class="px-6">
          <ThreeLettersDial
            on:letterClicked={(event) =>
              handleClick(event.detail.w, event.detail.id)}
            {wordObj}
            {shuffledWord}
          />
        </div>
      {:else if currentWord.length === 4}
        <div class="px-6">
          <FourLettersDial
            on:resetClicked={handleReset}
            on:letterClicked={(event) =>
              handleClick(event.detail.w, event.detail.id)}
            {wordObj}
            {shuffledWord}
          />
        </div>
      {:else if currentWord.length === 5}
        <div class="px-6">
          <FiveLettersDial
            on:resetClicked={handleReset}
            on:letterClicked={(event) =>
              handleClick(event.detail.w, event.detail.id)}
            {wordObj}
            {shuffledWord}
          />
        </div>
      {:else if currentWord.length === 6}
        <div class="px-6">
          <SixLettersDial
            on:resetClicked={handleReset}
            on:letterClicked={(event) =>
              handleClick(event.detail.w, event.detail.id)}
            {wordObj}
            {shuffledWord}
          />
        </div>
      {:else if currentWord.length === 7}
        <div class="px-6">
          <SevenLettersDail
            on:resetClicked={handleReset}
            on:letterClicked={(event) =>
              handleClick(event.detail.w, event.detail.id)}
            {wordObj}
            {shuffledWord}
          />
        </div>
      {:else if currentWord.length === 8}
        <div class="px-6">
          <EightLettersDials
            on:resetClicked={handleReset}
            on:letterClicked={(event) =>
              handleClick(event.detail.w, event.detail.id)}
            {wordObj}
            {shuffledWord}
          />
        </div>
      {/if}
    </div>

    {#if showNext}
      {#if finish}
        <div class="flex justify-center gap-2 mt-6 mb-10">
          <!-- <button on:click={downloadImage} class="btn-outline">Share</button> -->
          <button on:click={() => (showFinish = true)} class="btn-outline"
            >Finish</button
          >
        </div>
      {:else}
        <div class="flex justify-center gap-2 mt-6 mb-10">
          <!-- <button on:click={downloadImage} class="btn-outline">Share</button> -->
          <button on:click={handleNext} class="btn-outline">{"Next >"}</button>
        </div>
      {/if}
    {/if}
    {#if !correct && !hintShowed}
      <div class="flex justify-center mt-8 lg:mt-6 mb-10">
        <button
          class:disabled={loadingHint}
          class:animate-bounce={loadingHint}
          on:click={showHint}
          class="btn-outline">Show Hint</button
        >
      </div>
    {:else if hintShowed}
      <div class="flex justify-center mt-4 mb-10" in:slide>
        <div
          class="border-gray-700 border-2 lg:px-6 lg:py-3 px-2.5 py-1.5 lg:w-1/2 w-full"
        >
          <div class="flex items-start lg:items-center gap-1.5">
            <h4
              class="lg:text-xl text-lg font-bold underline underline-offset-2"
            >
              HINT:
            </h4>
            <p class="lg:text-lg text-sm">
              {hintText}
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
