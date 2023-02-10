const model = (function () {
  class App {
    constructor() {
      this.monstersArr = [];
      this.heroesArr = [];
      this.turns = { heroTrun: true, monsterTurn: false };
      this.message = "Chose Type Of Attack";
      this._monstersContainerEl = document.querySelector(
        "#monster-cards__container"
      );
      this.heroesContainerEl = document.querySelector(
        "#heroes-cards__container"
      );
      this.messsageContainerEl = document.querySelector(".info-heading");
    }

    addNewMonster(monster) {
      this.monstersArr.push(monster);
    }
    addNewHero(hero) {
      this.heroesArr.push(hero);
    }

    findAttackingCard(data) {
      return data.find((el) => el.activeStatus === true);
    }
    findDefendingCard(data, cardIndex) {
      return data.find((el, index) => index === cardIndex);
    }
    updateDefnedingCards(data) {
      data.forEach((el) => (el.activeStatus = !el.activeStatus));
    }
    switchActiveStatus(card) {
      card.activeStatus = !card.activeStatus;
    }

    useCharAttack = function (attacker, defender) {
      this.message = `${defender.name} has been attacked by ${
        attacker.name
      } with ${attacker.weapon}, damage dealt: ${attacker.useAttack()}`;
      return defender.health - attacker.useAttack();
    };

    useCharAbility = function (attacker, defender) {
      this.message = `${defender.name} has been attacked by ${
        attacker.name
      } with ${attacker.ability}, damage dealt: ${attacker.useAbility()}`;
      console.log(this.message);
      return defender.health - attacker.useAbility();
    };
    getMessage() {
      return this.message;
    }
    setMessage(msg) {
      this.message = msg;
    }
    renderMessage() {
      this.messsageContainerEl.textContent = "";
      this.messsageContainerEl.textContent = this.getMessage();
    }
    ///rendering logic
    generateCardsData(data) {
      const html = data
        .map((el, index) => {
          const cardInactive = el.activeStatus ? " active" : " inactive";
          const cardDefeated = el.isDefeated ? "defeated" : "";
          const cardRemove = el.isDefeated ? " remove-card" : "";
          const cardName = el.name;
          const cardHp = el.health;
          const img = el.img;

          return `<div class="card ${cardInactive} ${cardRemove}" data-id="${index}">
        <h2 class="card-title">${cardName}</h2>
          <img
            src=${img}
            alt=""
          />
        <div class="health-container">
          <span class="health-status">${cardHp}</span>
        </div>
        <div class="${cardDefeated}">
          <h2>Defeated</h2>
        </div>
      </div>`;
        })
        .join("");
      return html;
    }

    renderMonsters(data) {
      this.clearMonstersContainer();
      const html = app.generateCardsData(data);
      this._monstersContainerEl.insertAdjacentHTML("beforeend", html);
    }

    renderHeroes(data) {
      this.clearHeroesContainer();
      const html = app.generateCardsData(data);
      this.heroesContainerEl.insertAdjacentHTML("beforeend", html);
    }
    clearMonstersContainer() {
      this._monstersContainerEl.innerHTML = "";
    }
    clearHeroesContainer() {
      this.heroesContainerEl.innerHTML = "";
    }
  }

  class Character {
    constructor(name, health) {
      this.name = name;
      this.health = health;
      this.activeStatus = false;
      this.isDefeated = false;
    }
  }

  class Hero extends Character {
    constructor(name, health, weapon) {
      super(name, health);
      this.weapon = weapon;
      // this.ability = ability;
    }
  }

  ////////////
  ///////////
  // hero cards

  class Warrior extends Hero {
    constructor(name, health, weapon, ability) {
      super(name, health);
      this.weapon = weapon;
      this.ability = ability;
      this.img =
        // "https://images.pexels.com/photos/339805/pexels-photo-339805.jpeg?auto=compress&cs=tinysrgb&w=1600";
        "./img/warrior-img.jpg";
      //hp 120
      // abilty second wind
    }

    useAttack() {
      return 20;
    }
    useAbility() {
      if (this.health > 100) {
        this.health = 120;
      } else {
        this.health += 20;
      }
      return 10;
    }
  }

  class Mage extends Hero {
    constructor(name, health, weapon, ability) {
      super(name, health);
      this.weapon = weapon;
      this.ability = ability;
      this.img = " ./img/mage-image.jpg";

      // hp 100
    }
    useAttack() {
      return 12;
    }
    useAbility() {
      console.log(10 + (100 - this.health) * 0.5);
      return 10 + (100 - this.health) * 0.5;
    }
  }

  ////////////
  ///////////
  // monster cards

  class Monster extends Character {
    constructor(name, health) {
      super(name, health);
    }
  }

  class Dragon extends Monster {
    constructor(name, health, weapon, ability) {
      super(name, health);
      this.weapon = weapon;
      this.ability = ability;
      this.img = "./img/lechen-img.jpg";

      //Fire Breath
      //hp 150
    }
    useAttack() {
      // 25 dmg to single card
      return 25;
    }
    useAbility() {
      //15 dmg to all cards
      return 15;
    }
  }

  class Spider extends Monster {
    constructor(name, health, weapon, ability) {
      super(name, health);
      this.weapon = weapon;
      this.ability = ability;
      this.img = "./img/warewolf-img.jpg";
      //Venomus Touch
      //hp 100
    }
    useAttack() {
      if (this.health > 95) {
        this.health = 100;
      } else {
        this.health += 5;
      }
      return 10;
    }
    useAbility(heroHp) {
      const initialDmg = heroHp - 12;
      const missingHp = heroHp - initialDmg;
      return (initialDmg - missingHp * 0.15).toFixed(2);
    }
  }

  const app = new App();
  const warrior = new Warrior("Warrior", 120, "Sword", "Second Wind");
  warrior.activeStatus = true;
  const warrior2 = new Warrior("Second Warrior", 120, "Sword", "Second Wind");
  const mage = new Mage("Mage", 100, "Spell", "Shock");
  const mage2 = new Mage("Mage2", 100, "Spell", "Shock");
  /////

  const dragon = new Dragon("Dragon", 150, "Claw Strike", "Fire Breath");
  const spider = new Spider("Spider", 100, "Sting", "Venomus Touch");
  // const spider = new Spider("Spider", 1, "Sting", "Venomus Touch");
  const spider2 = new Spider("Second Spider", 100, "Sting", "Venomus Touch");
  const dragon2 = new Dragon("Dragon", 150, "Claw Strike", "Fire Breath");

  app.addNewHero(warrior);
  app.addNewHero(warrior2);
  app.addNewHero(mage);
  app.addNewHero(mage2);

  app.addNewMonster(dragon);
  app.addNewMonster(spider);
  app.addNewMonster(spider2);
  // app.addNewMonster(dragon2);

  return {
    app,
    warrior,
    warrior2,
    mage,
    dragon,
    spider,
    spider2,
  };
})();
