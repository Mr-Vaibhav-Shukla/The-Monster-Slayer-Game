function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      c: 0,
      winner: null,
      logMessage: [],
    };
  },
  computed: {
    monsterBarWidth() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarWidth() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.c % 3 !== 0;
    },
  },
  watch: {
    playerHealth() {
      if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (this.playerHealth <= 0) {
        this.winner = "monster";
        this.playerHealth = 0;
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (this.monsterHealth <= 0) {
        this.winner = "player";
        this.monsterHealth = 0;
      }
    },
  },
  methods: {
    startNewGame() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.c = 0),
        (this.winner = null),
        (this.logMessage = []);
    },
    attackMonster() {
      this.c += 1;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.log('player','attack',attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.log('monster','attack',attackValue);
    },

    specialAttack() {
      this.c += 1;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.log('player','special-attack',attackValue);
    },

    healPlayer() {
      this.c += 1;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.log('player','heal',healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
      this.log('player','surrendered',null);
    },
    log(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
