(function (data) {
  let { app, warrior, warrior2, mage, dragon, spider, spider2 } = data;
  console.log();
  const messsage = document.querySelector(".info-heading");
  const monstersContainerEl = document.querySelector(
    "#monster-cards__container"
  );
  const heroesContainerEl = document.querySelector("#heroes-cards__container");
  app.renderMessage();
  app.renderMonsters(app.monstersArr);
  app.renderHeroes(app.heroesArr);

  const btnContainer = document.querySelector(".btn-container");

  let heroIndex = 0;
  let monsterIndex = 0;
  let maxIndex = 2;

  btnContainer.addEventListener("click", function (e) {
    if (!chekIfvalid(e)) return;

    const typeOfAttack = e.target.dataset.attack;

    if (app.turns.heroTrun) {
      const attackingCard = app.findAttackingCard(app.heroesArr);

      // app.switchActiveStatus(attackingCard);
      // app.renderHeroes(app.heroesArr);
      // app.updateDefnedingCards(app.monstersArr);
      // app.renderMonsters(app.monstersArr);
      // app.setMessage("Chose Card To Attack");
      // app.renderMessage();

      // messsage.textContent = "Chose Card To Attack";
      renderAndUpdate(attackingCard, app.heroesArr, app.monstersArr);

      const pickCard = function (e) {
        if (!e.target.closest(".card")) return;
        const defendingCardIndex = +e.target.closest(".card").dataset.id;

        const defendingCard = app.findDefendingCard(
          app.monstersArr,
          defendingCardIndex
        );

        getTypeOfAttack(typeOfAttack);

        // if (typeOfAttack === "attack") {
        //   defendingCard.health = app.useCharAttack(
        //     attackingCard,
        //     defendingCard
        //   );
        // }
        // if (typeOfAttack === "special ability") {
        //   defendingCard.health = app.useCharAbility(
        //     attackingCard,
        //     defendingCard
        //   );
        // }
        app.updateDefnedingCards(app.monstersArr);
        app.renderMonsters(app.monstersArr);

        messsage.textContent = app.getMessage();
        setTimeout(() => {
          app.setMessage("Chose Type Of Attack");
          app.renderMessage();
          3;
          if (monsterIndex > 2) {
            monsterIndex = 0;
          }
          app.switchActiveStatus(app.monstersArr[monsterIndex]);
          monsterIndex++;

          app.renderMonsters(app.monstersArr);
        }, 3500);

        //
        app.turns.heroTrun = !app.turns.heroTrun;
        app.turns.monsterTurn = !app.turns.monsterTurn;
        monstersContainerEl.removeEventListener("click", pickCard);
      };
      monstersContainerEl.addEventListener("click", pickCard);

      // return;
    }
    if (app.turns.monsterTurn) {
      // console.log("MOnster Turn");
      const attackingCard = app.findAttackingCard(app.monstersArr);
      // console.log(attackingCard);
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
        console.log(defendingCard);
        if (defendingCard.health <= 0) {
          console.log("Defeated Card");

          defendingCard.health = 0;
          defendingCard.isDefeated = true;
          messsage.textContent = "Monster Defeated";
          if (defendingCard.isDefeated) maxIndex--;
          setTimeout(() => {
            let newNesto = app.heroesArr.splice(1, 1);
            app.renderHeroes(app.heroesArr);
            console.log(newNesto);
          }, 3000);
          app.renderHeroes(app.heroesArr);
          // return;
        }

        app.updateDefnedingCards(app.heroesArr);
        app.renderHeroes(app.heroesArr);
        messsage.textContent = app.getMessage();
        setTimeout(() => {
          app.setMessage("Chose Type Of Attack");
          app.renderMessage();
          3;
          // heroIndex

          heroIndex++;

          if (heroIndex > maxIndex) {
            heroIndex = 0;
          }
          console.log(maxIndex, "Max Index");
          console.log(heroIndex, "hero index");
          app.switchActiveStatus(app.heroesArr[heroIndex]);
          app.renderHeroes(app.heroesArr);
          app.turns.heroTrun = !app.turns.heroTrun;
          app.turns.monsterTurn = !app.turns.monsterTurn;
        }, 3500);

        // app.turns.heroTrun = !app.turns.heroTrun;
        // app.turns.monsterTurn = !app.turns.monsterTurn;
        heroesContainerEl.removeEventListener("click", pickCardSecond);
      };

      heroesContainerEl.addEventListener("click", pickCardSecond);
    }
  });

  const renderAndUpdate = function (card, heroArr, monstersArr) {
    app.switchActiveStatus(card);
    app.renderHeroes(heroArr);
    app.updateDefnedingCards(monstersArr);
    app.renderMonsters(monstersArr);
    app.setMessage("Chose Card To Attack");
    app.renderMessage();
  };

  const getTypeOfAttack = function (type) {
    if (type === "attack") {
      defendingCard.health = app.useCharAttack(attackingCard, defendingCard);
    }
    if (type === "special ability") {
      defendingCard.health = app.useCharAbility(attackingCard, defendingCard);
    }
  };
})(model);

// get index
