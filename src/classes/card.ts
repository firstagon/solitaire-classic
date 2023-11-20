import { Node, PrivateIdentifier } from "typescript";

// type Suit = "d" | "c" | "h" | "s";
type SuitColor = "red" | "black";

export interface CardInterface {
  removeClass(arg0: string): unknown;
  readonly numb: number;
  readonly weight: number;
  readonly suit: string;
  color: SuitColor;
  isFlipped: boolean;
  cardSuit?: string;
  className?: (String | number)[];
  card?: { [key: string]: any } | null;
  classList?: DOMTokenList;
  parent?: HTMLElement;

  render(element: HTMLElement): void;
  addClass(arg: string): void;
}

// ♦ diamonds, ♣ clubs, ♥ hearts, ♠ spades

class Card implements CardInterface {
  public numb: number;
  public suit: string;
  public color: SuitColor;
  public isFlipped: boolean = false;
  public className: string[];
  public classList: DOMTokenList | undefined;
  public weight: number;
  public card: { [key: string]: any } | undefined;
  public parent?: HTMLElement | undefined;

  constructor(num: number, suit: string, color: SuitColor) {
    this.numb = num;
    this.suit = suit;
    this.className = ["card"];
    this.weight = this.getWeight(num);
    this.color = this.getColor();
  }

  render(element: HTMLElement): void {
    const board = <HTMLElement>element;
    const card = <{ [key: string]: any }>document.createElement("span");
    card.obj = this;
    this.classList = card.classList;
    this.classList?.add(...this.className);
    const suitIcon = <HTMLDivElement>document.createElement("span");
    suitIcon.innerHTML = this.getSuitIcon();
    suitIcon.classList.add("suitIcon", this.color);
    board.appendChild(card as ChildNode);

    const displays = <HTMLElement>document.createElement("span");
    displays.innerHTML = this.getSuit(this.numb).toString();
    displays.classList.add("suitWeight", this.color);
    const secondSuitIcon = <HTMLElement>suitIcon.cloneNode(true);
    secondSuitIcon.classList.add("rotated", this.color);

    // card.draggable = true;

    card.appendChild(suitIcon);
    card.appendChild(displays);
    card.appendChild(secondSuitIcon);
    if (!this.isFlipped) {
      this.classList?.add("flipped");
    }

    this.parent = board;
    this.card = card;
  }

  rerender() {
    (this.card as HTMLElement).setAttribute("style", "");
    this.parent?.appendChild(this.card as HTMLElement);
  }

  getClass(...arg: (string | number)[]) {
    const classList: string[] = [...arguments];
    classList.forEach((el) => {
      this.className.push(el);
    });
  }

  getSuit(num: number) {
    const suit: { [key: number]: string } = {
      11: "В",
      12: "Д",
      13: "K",
      1: "T",
    };
    if (num > 10) {
      return suit[num];
    } else if (num === 1) {
      return suit[num];
    } else {
      return num;
    }
  }

  addClass(arg: string): void {
    this.className?.push(arg);
  }

  removeClass(arg: string) {
    if (this.classList === undefined) {
      console.warn("removing from class list before init");
    }

    this.classList?.remove(arg);
  }

  getSuitIcon() {
    const suitsMap: { [key: string]: string } = {
      d: "♦",
      c: "♣",
      h: "♥",
      s: "♠",
    };
    return suitsMap[this.suit];
  }

  getWeight(num: string | number): number {
    // console.log(typeof num);
    if (typeof num === "string") {
      return 10;
    } else {
      return num;
    }
  }

  getColor() {
    if (this.suit === "d" || this.suit === "h") {
      return (this.color = "red");
    } else {
      return (this.color = "black");
    }
  }

  console(): void {
    console.log("cardd");
  }
}

export default Card;
