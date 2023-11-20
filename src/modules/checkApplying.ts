import { CardInterface } from "../classes/card";

export function acceptedStack(card1: CardInterface, card2: CardInterface) {
    let w = false;
    let c;
  
    if (card2.weight - card1.weight === 1) {
      w = true;
    }
    if (card1.color !== card2.color) {
      c = true;
    }
    return w && c;
  }
  
 export  function acceptedPlace(card1: CardInterface, card2: CardInterface) {
    let w = false;
    let c, s;
  
    if (card1.weight - card2.weight === 1) {
      w = true;
    }
    if (card1.color === card2.color) {
      c = true;
    }
  
    if (card1.suit === card2.suit) {
      s = true;
    }
    return w && c && s;
  }
  