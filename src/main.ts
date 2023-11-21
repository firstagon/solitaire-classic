import Card from "./classes/card";
import { CardInterface } from "./classes/card";
import { gameType } from "./ts/gameType";
import shuffle from "./modules/shuffle";
import addEvents from "./modules/addEvents";
import "../main.css";

let cards: CardInterface[] = [];
const suits = ["h", "s", "c", "d"];
let currentGame: gameType;
let interval: ReturnType<typeof setInterval>;
let started = false;

const newGame = () => {
  const game: gameType = {
    stacks: {
      stack1: [],
      stack2: [],
      stack3: [],
      stack4: [],
      stack5: [],
      stack6: [],
      stack7: [],
    },
    decka: [],
    places: {
      c: [],
      d: [],
      h: [],
      s: [],
    },
  };
  for (let s = 0; s < suits.length; s++) {
    for (let c = 1; c < 14; c++) {
      const card = new Card(c, suits[s], c % 2 !== 0 ? "red" : "black");
      cards.push(card);
    }
  }
  const newDecka = shuffle(cards);
  cards = newDecka;
  currentGame = game;

  game.decka = newDecka;

  let maxStack = 0;
  let nextStack = 2;
  let delay = 1;
  currentGame = game;

  const interval = setInterval(fillBoard, 100);

  function fillBoard() {
    if (delay === 29) {
      clearInterval(interval);
    } else {
      delay++;
      const sortoObject = game.decka[game.decka.length - 1];
      game.decka.pop();
      maxStack++;
      if (maxStack === 8) {
        maxStack = nextStack;
        nextStack++;
      }
      if (nextStack < 9) {
        game.stacks["stack" + maxStack].push(sortoObject);
      }
    }
  }
};

newGame();

const renderBoard = () => {
  document.body.innerHTML = "";
  const board = <HTMLDivElement>document.createElement("div");
  document.body.appendChild(board);
  board.className = "board";
  board.id = "gameboard";

  const topSide = <HTMLElement>document.createElement("div");
  topSide.className = "deckaTop";
  board.appendChild(topSide);

  (function renderDecka() {
    const decka = <HTMLElement>document.createElement("div");
    decka.className = "decka";
    const deckaHolder = <HTMLElement>document.createElement("div");
    deckaHolder.className = "deckaHolder";
    decka.appendChild(deckaHolder);
    topSide.appendChild(decka);
    const last = currentGame.decka[currentGame.decka.length - 1];
    for (let card of currentGame.decka) {
      renderCard(card, deckaHolder);
    }
    last.addClass("deckaOpen");
    renderCard(last, decka);
    last.removeClass("flipped");
  })();

  (function renderPlaces() {
    const places = <HTMLElement>document.createElement("div");
    places.className = "places";
    topSide.appendChild(places);
    let index = 10;
    for (let ident in currentGame.places) {
      const place = <HTMLElement>document.createElement("div");
      place.className = `place ${ident}`;
      places.appendChild(place);
      const cards = currentGame.places[ident];
      cards.forEach((el: CardInterface) => {
        el.isFlipped = true;
        el.removeClass("deckaOpen");
        el.render(place);
        const parent = <HTMLElement>el.parent;
        parent.style.zIndex = index + 1 +'';
        (parent as any).style["margin-bottom"] = 0;
      });
    }
  })();

  (function renderStacks() {
    const stacks = <HTMLElement>document.createElement("div");
    stacks.className = "stacks";
    board.appendChild(stacks);

    for (let st in currentGame.stacks) {
      const stack = <HTMLElement>document.createElement("div");
      stack.className = st;
      stacks.appendChild(stack);

      const cards = currentGame.stacks[st];
      if (cards.length > 0) {
        cards.forEach((el: CardInterface) => {
          el.render(stack);
          el.removeClass("deckaOpen");
        });
        if (started) {
          const last = cards[cards.length - 1];
          last.isFlipped = true;
          last.removeClass("flipped");
        }
      }

      if (started) {
        document.querySelectorAll(".card").forEach((el) => {
          addEvents(el, renderBoard, currentGame);
        });
      }
    }
  })();

  if (!started && currentGame.stacks["stack7"].length >= 7) {
    clearInterval(interval);
    started = true;
    renderBoard();
  }
};

renderBoard();

function dealCards() {
  interval = setInterval(() => renderBoard(), 100);
}
dealCards();

function renderCard(card: CardInterface, decka: HTMLElement) {
  card.render(decka);
}
