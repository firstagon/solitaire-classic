function getFromTo(fromEl: HTMLElement, toEl: HTMLElement, currentGame: any) {
  let from, to;
  if (fromEl.className.indexOf("place") > -1) {
    from = currentGame.places[fromEl.className.split(" ")[1]];
  } else if (fromEl.className === "decka") {
    from = currentGame.decka;
  } else {
    const stackNo = "stack" + fromEl.className.split("")[5];
    from = currentGame.stacks[stackNo];
  }
  if (toEl.className.indexOf("place") > -1) {
    to = currentGame.places[toEl.className.split(" ")[1]];
  } else if (toEl.className === "decka") {
    to = currentGame.decka;
  } else if (
    toEl.className.indexOf("card") > -1 ||
    toEl.className.indexOf("suitIcon") > -1 ||
    toEl.className.indexOf("suitWeight") > -1
  ) {
    let index = <HTMLElement>toEl.closest("div");

    to = currentGame.stacks[index.className];
  } else if (toEl.className.indexOf("flipped") > -1) {
    let index = <HTMLElement>toEl.parentElement?.parentElement?.parentElement;
    to = currentGame.stacks[index.className];
  } else {
    const stackNo = "stack" + toEl.className.split("")[5];
    to = currentGame.stacks[stackNo];
  }

  return [from, to];
}

export default getFromTo;
