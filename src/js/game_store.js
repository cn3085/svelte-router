import { writable } from "svelte/store";

export let game = writable({
  randomCards: [],
});

export const backgroundColors = ["black", "grey", "white"];
export const colors = ["blue", "red", "yellow"];
export const shapes = ["circle", "triangle", "square"];

let selectedCardsIndexSet = new Set();

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

  game.set({ randomCards: randomCards });
  setAllHab(randomCards);
}

function setAllHab(randomCards) {
  const numberOfSelectCard = 3;
  let hapList = [];

  for (let i = 0; i < randomCards.length - numberOfSelectCard + 1; i++) {
    //배열 index를 위해  + 1
    for (let j = i + 1; j < randomCards.length - numberOfSelectCard + 2; j++) {
      //어쩌고저쩌고
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
          const hap = new Set([first, second, third]);
          hapList.push(hap);
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
  if (selectedCardsIndexSet.has(i)) {
    return false;
  }
  //clicked update, selectedCards push
  game.update((beforeGame) => {
    let { randomCards } = beforeGame;
    let card = randomCards[i];
    card.clicked = true;
    selectedCardsIndexSet.add(i);

    console.log(selectedCardsIndexSet, randomCards);

    //3개째면 합 체크, clicked 초기화, selectedCards 초기화
    if (selectedCardsIndexSet.size === 3) {
      //합체크
      selectedCardsIndexSet.clear();
      let clickedInitCards = randomCards.map((c) => {
        return {
          ...c,
          clicked: false,
        };
      });
      return {
        randomCards: [...clickedInitCards],
      };
    } else {
      return {
        randomCards: [...randomCards],
      };
    }
  });
}
