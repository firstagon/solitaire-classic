import getFromTo from "./getFromTo";
import { acceptedPlace, acceptedStack } from "./checkApplying";

let activeCards: any = [];

function addEvents(card: any, renderBoard: Function, currentGame: any) {
  activeCards = [];

  (card as HTMLElement).onmousedown = function (e: MouseEvent) {
    if (activeCards.length > 0) {
      return;
    }
    document.documentElement.style.cursor = "none";
    if (
      (e.target as HTMLElement).className.indexOf("suitWeight") > -1 ||
      (e.target as HTMLElement).className.indexOf("suitIcon") > -1
    ) {
    }
    startDrag(e);
  };
  window.onmousemove = function (e: any) {
    const lastPosX = e.clientX;
    const lastPosY = e.clientY;
    moveDrag(e, lastPosX, lastPosY);
  };

  window.onmouseup = function (e: MouseEvent) {
    document.documentElement.style.cursor = "auto";
    const lastPosX = e.pageX;
    const lastPosY = e.pageY;
    stopDrag(e, lastPosX, lastPosY);
  };

  function startDrag(e: MouseEvent) {
    const parent = (e.currentTarget as HTMLElement).parentNode as HTMLElement;

    if (parent.className.indexOf("deckaHolder") > -1) {
      let last = currentGame.decka.pop();
      currentGame.decka.unshift(last);
      renderBoard();
      return;
    }

    const arrayOfClasses = [...(e.target as HTMLElement).classList];

    if (!arrayOfClasses.includes("card")) {
      activeCards.push((e.target as HTMLElement).parentNode);
      let grabAllCards = activeCards[0].nextElementSibling;
      while (grabAllCards !== null) {
        activeCards.push(grabAllCards);
        grabAllCards = grabAllCards.nextElementSibling;
      }
    } else if ((e.target as HTMLElement).className.indexOf("deckaHolder") > -1) {
      if ((e.target as HTMLElement).nextElementSibling) {
        const last = currentGame.decka[currentGame.decka.length - 1];
      }
    }
  }

  function moveDrag(e: MouseEvent, lastPosX: number, lastPosY: number) {
    if (activeCards.length > 0) {
      let left = lastPosX - 50;
      let top = lastPosY + 105;
      if (activeCards[0].className.indexOf("deckaOpen") > -1) {
        top = lastPosY + 20;
      } else if (activeCards[0].className.indexOf("place") > -1) {
        top = lastPosY + 2;
      }
      let zIndex = 20;
      for (let active = 0; active < activeCards.length; active++) {
        activeCards[active].style.position = "fixed";
        activeCards[active].style.zIndex = zIndex;
        activeCards[active].style.left = left + "px";
        activeCards[active].style.top = top + "px";
        activeCards[active].style["margin-bottom"] = "0";
        top = top + 20;
        zIndex = zIndex + 100;
      }
    }
  }

  function stopDrag(e: MouseEvent, lastPosX: number, lastPosY: number) {
    let accepter = <HTMLElement>(e.target as HTMLElement).closest("div");

    if (activeCards.length > 0) {
      const fromEl = activeCards[0].obj.parent;
      const [from, to] = getFromTo(fromEl, accepter, currentGame);

      if (
        accepter === undefined ||
        (accepter as HTMLElement).className.indexOf("board") > -1 ||
        (accepter as HTMLElement).className.indexOf("deckaTop") > -1 ||
        (accepter as HTMLElement).className.indexOf("stacks") > -1 ||
        (accepter as HTMLElement).className.indexOf("places") > -1 ||
        (accepter as HTMLElement).className.indexOf("decka") > -1 ||
        accepter.className.indexOf(fromEl.className) > -1
      ) {
        activeCards.forEach((el: any) => {
          el.obj.rerender();
        });
        activeCards = [];
        return;
      }

      if (accepter.className.indexOf("stack") > -1) {
        let accepted;
        if (to.length <= 0 && accepter.className.indexOf("stack") > -1) {
          if (activeCards[0].obj.weight >= 13) {
            accepted = true;
          }
        } else {
          accepted = acceptedStack(activeCards[0].obj, to[to.length - 1]);
        }
        if (accepted) {
          let items;
          if (from.length <= 1) {
            items = [from.pop()];
          } else {
            items = from.splice(from.indexOf(activeCards[0].obj), from.length - 1);
          }
          to.push(...items);
          renderBoard();
        }
      }

      if (accepter.className.indexOf("place") > -1) {
        let accepted;
        if (to.length <= 0) {
          if (activeCards[0].obj.weight === 1) {
            accepted = true;
          }
        } else {
          accepted = acceptedPlace(activeCards[0].obj, to[to.length - 1]);
        }

        if (accepted) {
          let items;
          if (from.length <= 1) {
            items = [from.pop()];
          } else {
            items = from.splice(from.indexOf(activeCards[0].obj), from.length - 1);
          }
          to.push(...items);
          renderBoard();
        }
      }
    }
  }
}

export default addEvents;
