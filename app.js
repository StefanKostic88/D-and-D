"use strict";

(function (data) {
  let { app, warrior, warrior2, mage, dragon, spider, spider2 } = data;
  console.log();
  // const messsage = document.querySelector(".info-heading");
  const monstersContainerEl = document.querySelector(
    "#monster-cards__container"
  );
  const heroesContainerEl = document.querySelector("#heroes-cards__container");

  app.heroesArr.forEach((el, index) => {
    el.id = index;
  });
  app.monstersArr.forEach((el, index) => {
    el.id = index;
  });
  app.renderMessage();
  app.renderMonsters(app.monstersArr);
  app.renderHeroes(app.heroesArr);

  const btnContainer = document.querySelector(".btn-container");

  let heroIndex = 0;
  let monsterIndex = 0;
  // let maxHeroIndex = 2;
  let maxHeroIndex = 3;
  let maxMonsetrIndex = 2;
  let heroArrayLength = app.heroesArr.length;
  let curHerroArraylength;
  let deletionINdex;

  btnContainer.addEventListener("click", function (e) {
    if (!chekIfvalid(e)) return;
    console.log(app.heroesArr.length, "Array length");

    const typeOfAttack = e.target.dataset.attack;

    if (app.turns.heroTrun) {
      const attackingCard = app.findAttackingCard(app.heroesArr);
      app.switchActiveStatus(attackingCard);
      app.renderHeroes(app.heroesArr);
      app.updateDefnedingCards(app.monstersArr);
      app.renderMonsters(app.monstersArr);
      app.setMessage("Chose Card To Attack");
      app.renderMessage();

      const pickCard = function (e) {
        if (!e.target.closest(".card")) return;
        const defendingCardIndex = +e.target.closest(".card").dataset.id;
        const defendingCard = app.findDefendingCard(
          app.monstersArr,
          defendingCardIndex
        );
        if (typeOfAttack === "attack") {
          defendingCard.health = app.useCharAttack(
            attackingCard,
            defendingCard
          );
        }
        if (typeOfAttack === "special ability") {
          defendingCard.health = app.useCharAbility(
            attackingCard,
            defendingCard
          );
        }
        app.updateDefnedingCards(app.monstersArr);
        app.renderMonsters(app.monstersArr);
        app.renderMessage();

        /////////////////

        setTimeout(() => {
          app.setMessage("Chose Type Of Attack");
          app.renderMessage();
          if (monsterIndex > maxMonsetrIndex) {
            monsterIndex = 0;
          }

          app.switchActiveStatus(app.monstersArr[monsterIndex]);
          monsterIndex++;

          app.renderMonsters(app.monstersArr);
        }, 3500);

        app.turns.heroTrun = !app.turns.heroTrun;
        app.turns.monsterTurn = !app.turns.monsterTurn;

        monstersContainerEl.removeEventListener("click", pickCard);
      };
      monstersContainerEl.addEventListener("click", pickCard);
    }
    if (app.turns.monsterTurn) {
      const attackingCard = app.findAttackingCard(app.monstersArr);

      app.switchActiveStatus(attackingCard);
      app.renderMonsters(app.monstersArr);
      app.updateDefnedingCards(app.heroesArr);
      app.renderHeroes(app.heroesArr);
      app.setMessage("Chose Card To Attack");
      app.renderMessage();

      const pickCardSecond = function (e) {
        if (!e.target.closest(".card")) return;

        const defendingCardIndex = +e.target.closest(".card").dataset.id;
        console.log(defendingCardIndex);

        const defendingCard = app.findDefendingCard(
          app.heroesArr,
          defendingCardIndex
        );

        if (typeOfAttack === "attack") {
          defendingCard.health = app.useCharAttack(
            attackingCard,
            defendingCard
          );
        }
        if (typeOfAttack === "special ability") {
          defendingCard.health = app.useCharAbility(
            attackingCard,
            defendingCard
          );
        }

        if (defendingCard.health <= 0) {
          console.log("Defeated Card");
          defendingCard.health = 0;
          defendingCard.isDefeated = true;
          maxHeroIndex--;

          app.heroesArr.find((el, index) => {
            if (el.id === defendingCard.id) {
              deletionINdex = index;
            }
          });

          app.setMessage(`${defendingCard.name} Defeated`);
          app.renderMessage();
          app.renderHeroes(app.heroesArr);

          setTimeout(() => {
            app.heroesArr.splice(deletionINdex, 1);
            app.renderHeroes(app.heroesArr);
          }, 3000);
        }

        app.updateDefnedingCards(app.heroesArr);
        app.renderHeroes(app.heroesArr);
        app.renderMessage();
        setTimeout(() => {
          app.setMessage("Chose Type Of Attack");
          app.renderMessage();
          3;

          // if (deletionINdex > heroIndex) {
          //   heroIndex = deletionINdex - 1;
          // }

          // heroIndex++;
          // if (deletionINdex < heroIndex) {
          //   heroIndex = 0;
          // }

          // ako karta nije obrisana uradi ovo
          console.log();
          if (!deletionINdex) {
            heroIndex++;
            if (heroIndex > maxHeroIndex) {
              heroIndex = 0;
            }
          } else {
            heroIndex = getCorrectIndex(heroIndex, deletionINdex, maxHeroIndex);
          }

          // curHerroArraylength = app.heroesArr.length;
          console.log(heroIndex, "HETRO index");
          app.switchActiveStatus(app.heroesArr[heroIndex]);
          app.renderHeroes(app.heroesArr);
        }, 3500);

        app.turns.heroTrun = !app.turns.heroTrun;
        app.turns.monsterTurn = !app.turns.monsterTurn;
        heroesContainerEl.removeEventListener("click", pickCardSecond);
      };

      heroesContainerEl.addEventListener("click", pickCardSecond);
    }
  });

  const getCorrectIndex = function (curIndex, deltedIndex, maxIndex) {
    let resIndex = curIndex;
    console.log(curIndex, deltedIndex, maxIndex, "FUNC");
    if (deltedIndex > curIndex) {
      resIndex = deltedIndex - 2;
    }
    console.log(resIndex);
    if (curIndex >= maxIndex) {
      resIndex = 0;
    }

    resIndex++;
    if (deltedIndex > maxIndex && resIndex === 0) {
      resIndex = 0;
    }
    if (deltedIndex === maxIndex) {
      resIndex = 1;
    }
    if (deltedIndex < resIndex || curIndex > maxIndex) {
      resIndex = 0;
    }

    return resIndex;
  };
})(model);

// const calcPercent = (curVal, decVal) => (curVal - decVal) / curVal;
// const newHealthBar = calcPercentsLeft(100, 10);
// console.log(newHealthBar);

// let root = document.documentElement;
// console.log(root);
// // root.style.setProperty("--health-bar", "10%");
// console.log();
// let elee = document.querySelectorAll(".card")[1];
// elee.children[2].children[0].style.setProperty("width", "20%");

//valid click

const chekIfvalid = (click) => {
  const valid =
    click.target.dataset.attack === "attack" ||
    click.target.dataset.attack === "special ability";
  return valid;
};
