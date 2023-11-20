import { CardInterface } from "../classes/card";

export type gameType = {
  stacks: {
    [key: string]: CardInterface[];
  };
  decka: CardInterface[];
  places: {
    [key: string]: CardInterface[];
  };
};
