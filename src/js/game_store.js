import { writable } from "svelte/store";

const NUMBER_OF_CHOOSE_CARD = 9;
let allCards = [];

export const backgroundColors = ["black", "grey", "white"];
export const colors = ["blue", "red", "yellow"];
export const shapes = ["circle", "triangle", "square"];

const REWARD_HAP = 1;
const PENALTY_HAP = 2;
const REWARD_GYEOL = 3;
const REWARD_GYEOL_TIME = 300;
const PENALTY_GYEOL = 3;

export let point = writable(10);

export let cards = writable({
  randomCards: [],
  winCards: [],
});

export function init() {
  fillAllCard();
  getNewRandomCard(allCards, NUMBER_OF_CHOOSE_CARD);
}

function fillAllCard() {
  let card = {};
  let tempCards = [];
  for (let b of backgroundColors) {
    for (let c of colors) {
      for (let s of shapes) {
        card = {
          shape: s,
          color: c,
          background: b,
          clicked: false,
        };
        tempCards.push(card);
      }
    }
  }
  allCards = tempCards;
}

const MAX_TIME = 20;
const MAX_WIDTH = 10;
export const aSecondWidth = MAX_WIDTH / MAX_TIME;

let hapList = [];

export let time = writable({
  intervalId: null,
  timeLimit: MAX_TIME,
  timeLimitWidth: 100, //aSecondWidth * timeLimit,
});

export let gyeolTime = writable({
  isBonusTime: true,
  intervalId: null,
  timeLimit: 10,
  timeLimitWidth: 100, //aSecondWidth * timeLimit,
});

let selectedCardsIndexList = [];

// game.update( (beforeGame) => {
//     let {allCards, randomCards} = beforeGame;
//     let randomCards = getRandomCard(9);
// })

export function getNewRandomCard(allCards, NUMBER_OF_CHOOSE_CARD) {
  let randomCards = [];
  let tempCards = [...allCards];

  for (let i = 0; i < NUMBER_OF_CHOOSE_CARD; i++) {
    let numberOfCards = tempCards.length;
    let randomCardIndex = Math.floor(Math.random() * numberOfCards);
    let [randomCard] = tempCards.splice(randomCardIndex, 1);
    randomCards.push(randomCard);
  }

  cards.set({ randomCards: randomCards, winCards: [] });
  setAllHab(randomCards);
}

function setAllHab(randomCards) {
  const numberOfSelectCard = 3;

  for (let i = 0; i < randomCards.length - numberOfSelectCard + 1; i++) {
    //배열 index를 위해  + 1
    for (let j = i + 1; j < randomCards.length - numberOfSelectCard + 2; j++) {
      for (
        let k = j + 1;
        k < randomCards.length - numberOfSelectCard + 3;
        k++
      ) {
        let first = randomCards[i];
        let second = randomCards[j];
        let third = randomCards[k];

        // console.log(convertToSCBTrinaryArray(first),convertToSCBTrinaryArray(second),convertToSCBTrinaryArray(third),isHap(convertToSCBTrinaryArray(first),convertToSCBTrinaryArray(second),convertToSCBTrinaryArray(third)));
        if (
          isHap(
            convertToSCBTrinaryArray(first),
            convertToSCBTrinaryArray(second),
            convertToSCBTrinaryArray(third)
          )
        ) {
          console.log(first, second, third);
          hapList.push("" + i + j + k);
        }
      }
    }
  }
  console.log(hapList);
}

function convertToSCBTrinaryArray({ shape, color, background }) {
  return [
    shapes.indexOf(shape),
    colors.indexOf(color),
    backgroundColors.indexOf(background),
  ];
}

function isHap(first, second, third) {
  let sumS = first[0] + second[0] + third[0];
  let sumC = first[1] + second[1] + third[1];
  let sumB = first[2] + second[2] + third[2];

  if (sumS % 3 === 0 && sumC % 3 === 0 && sumB % 3 === 0) {
    return true;
  } else {
    return false;
  }
}

//0. 이미 선택된 놈이면 그냥 return;
//1. 선택된 배열에 넣는다
//2. 3개가 채워졌나?
//3. 합인지 체크
// 3.1.1. 맞으면 점수 ++
// 3.1.2. 결 보너스 timeout 시작
// 3.1.3. 결 배열에서 pop
// 3.2.1. 틀리면 점수 --
//4. selected 배열 비우고 clicked 초기화

export function selectCard(i) {
  //이미 선택한 카드면 그냥 return;
  if (selectedCardsIndexList.includes(i)) {
    return false;
  }
  //clicked update, selectedCards push
  cards.update((beforeGame) => {
    let { randomCards, winCards } = beforeGame;
    let card = randomCards[i];
    card.clicked = true;
    selectedCardsIndexList.push(i);

    console.log(selectedCardsIndexList, randomCards);

    //3개째면 합 체크, clicked 초기화, selectedCards 초기화
    if (selectedCardsIndexList.length === 3) {
      //합체크
      submitHap(winCards);

      selectedCardsIndexList = [];
      let clickedInitCards = randomCards.map((c) => {
        return {
          ...c,
          clicked: false,
        };
      });
      return {
        randomCards: [...clickedInitCards],
        winCards: winCards,
      };
    } else {
      return {
        randomCards: [...randomCards],
        winCards: winCards,
      };
    }
  });
}

function submitHap(winCards) {
  const answerKey = selectedCardsIndexList.sort().join("");
  if (isHapAnswer(answerKey)) {
    winCards.push(answerKey);
    reward(REWARD_HAP);
    setGyeolBonus(true, 5);
    startTimeGyeolTimeout();
  } else {
    penalty(PENALTY_HAP);
  }
}

function isHapAnswer(answerKey) {
  return hapList.includes(answerKey);
}

export function checkTimeout() {
  time.update((before) => {
    let { timeLimit, intervalId } = before;
    if (timeLimit === 0) {
      clearInterval(intervalId);
      intervalId = null;
      alert("timeout!!!");
    }
    return {
      ...before,
      intervalId: intervalId,
    };
  });
}

export function setIntervalId(newIntervalId) {
  time.update((before) => {
    return {
      ...before,
      intervalId: newIntervalId,
    };
  });
}

export function updateGameTime(second) {
  time.update((before) => {
    let newTimeLimit = before.timeLimit + second;
    return {
      ...before,
      timeLimit: newTimeLimit,
    };
  });
}

function reward(p) {
  point.update((before) => {
    return before + p;
  });
}

function penalty(p) {
  point.update((before) => {
    return before - p;
  });
}

//결
export function checkGyeolTimeout() {
  gyeolTime.update((before) => {
    let { timeLimit, intervalId } = before;
    if (timeLimit === 0) {
      clearInterval(intervalId);
      setGyeolBonus(false, 5);
      intervalId = null;
      alert("timeout!!!");
    }
    return {
      ...before,
      intervalId: intervalId,
    };
  });
}

export function setGyeolBonus(isBonusTime, timeLimit) {
  gyeolTime.update((before) => {
    return {
      ...before,
      isBonusTime: isBonusTime,
      timeLimit: timeLimit,
    };
  });
}

export function setGyeolIntervalId(newIntervalId) {
  gyeolTime.update((before) => {
    return {
      ...before,
      intervalId: newIntervalId,
    };
  });
}

export function diminishGyeolSecond(second) {
  gyeolTime.update((before) => {
    let newTimeLimit = before.timeLimit - second;
    return {
      ...before,
      timeLimit: newTimeLimit,
    };
  });
}

export function startTimeGyeolTimeout() {
  const intervalId = setInterval(() => {
    diminishGyeolSecond(1);
    checkGyeolTimeout();
  }, 1000);
  setGyeolIntervalId(intervalId);
}

export function submitGyeol(winCards) {
  if (hapList.length === winCards.length) {
    reward(REWARD_GYEOL);
    updateGameTime(REWARD_GYEOL_TIME);
    getNewRandomCard(allCards, NUMBER_OF_CHOOSE_CARD);
  } else {
    penalty(PENALTY_GYEOL);
  }
}
