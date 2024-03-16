import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API = "AIzaSyAwO3sta_PspCOsuzBlEi8DloZ6A2XUstQ";

const genAI = new GoogleGenerativeAI(GEMINI_API);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const randomWords = [
  "Energy",
  "Beauty",
  "Piece",
  "Enjoy",
  "Level",
  "Exist",
  "Happy",
  "Heart",
  "Drama",
  "Dress",
  "Earth",
  "Seven",
  "Elite",
  "Diamond",
];

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getDefinition = async (word: string) => {
  const prompt = `Give a discription or definition of this word '${word}' within around 50 words.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

export const getHint = async (word: string) => {
  const prompt = `Give a hint about this word '${word}' within 10 words without mentioning it.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

export const getWords = async (
  wordsCount: number,
  customLetterCount: boolean,
  lettersCount: number,
  customRarity: boolean,
  wordsRarity: string,
  customTopic: boolean,
  customTopicPrompt: string
) => {
  let prompt = "";
  if (customTopic) {
    if (customTopicPrompt === "") {
      prompt = `Give ${wordsCount} words on random topics containing from 3 to 8 letters.`;
    } else {
      prompt = `Give ${wordsCount} words on ${customTopicPrompt} containing from 3 to 8 letters.`;
    }
  } else {
    if (customLetterCount) {
      if (customRarity) {
        prompt = `Give ${wordsCount} ${wordsRarity} words containing only ${lettersCount} letters. Letter count is a hard rule.`;
      } else {
        prompt = `Give ${wordsCount} words containing only ${lettersCount} letters. Letter count is a hard rule.`;
        console.log(lettersCount);
      }
    } else {
      if (customRarity) {
        prompt = `Give ${wordsCount} ${wordsRarity} words containing 3 to 8 letters.`;
      } else {
        prompt = `Give ${wordsCount} words containing 5 to 8 letters.`;
      }
    }
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const textArr = text.split("\n");
  const filteredTextArr = textArr.map((el) => {
    let element = el.split(" ")[1];
    if (element.length <= 8) return element;
    else {
      return randomWords[getRandomIntInclusive(0, randomWords.length)];
    }
  });

  return filteredTextArr;
};
