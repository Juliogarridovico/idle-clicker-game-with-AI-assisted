<template>
  <div @click="increment" id="app">
    <div class="container">
      <h1 class="title">Cookie Cliker</h1>
      <div class="game">
        <button class="cookie" @click="increment">
          <img src="cookie.png" alt="Cookie" class="cookie-img" />
          <span class="count">{{ count.toFixed(2) }}</span>
        </button>
        <div class="upgrades">
          <div v-for="upgrade in upgrades" :key="upgrade.id" class="upgrade">
            <button @click="buyUpgrade(upgrade)">
              <!-- <img :src="upgrade.img" alt="Upgrade" class="upgrade-img"> -->
              <span class="upgrade-name">{{ upgrade.name }}</span>
              <span class="upgrade-cost"
                >Nivel: {{ upgrade.level }} // coste:{{
                  upgrade.cost.toFixed(3)
                }}
                cookies</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      count: 0,
      upgrades: [
        { id: 1, name: "Mejora 1", cost: 10, increment: 0, level: 1 },
        { id: 2, name: "Mejora 2", cost: 100, increment: 0, level: 1 },
        { id: 3, name: "Mejora 3", cost: 1000, increment: 0, level: 1 },
        
      ],
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    startAutomaticUpgrade() {
      let incrementUpdate = 0;
      setInterval(() => {
        // this.increment();
        this.upgrades.forEach((upgrade) => {
         this.count =  this.count + upgrade.increment
          
        });
      }, 500);
    },
    getUpgradeCost(baseCost, level) {
      return baseCost * (1 + level * 0.1);
    },
    getUpgradeIncrement(cost, level, increment){
      return (cost + (increment * level))*0.0010;
    },
    buyUpgrade(upgrade) {
      let arrayPosition;
      arrayPosition = upgrade.id - 1;
       
      if (this.count >= upgrade.cost) {
        this.count -= upgrade.cost;
        this.upgrades[arrayPosition].multiplier *= upgrade.multiplier;
        this.upgrades[arrayPosition].cost = this.getUpgradeCost(
          this.upgrades[arrayPosition].cost,
          this.upgrades[arrayPosition].level
        );
        this.upgrades[arrayPosition].level++;
        this.upgrades[arrayPosition].increment = this.getUpgradeIncrement(this.upgrades[arrayPosition].cost, this.upgrades[arrayPosition].level, this.upgrades[arrayPosition].increment)
        
      }
    },
  },
  mounted() {
    this.startAutomaticUpgrade();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ecf0f1;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 768px;
  padding: 32px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  color: #2c3e50;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
  max-width: 512px;
}

.cookie {
  display: flex;
  align-items: center;
  background-color: #f1c40f;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s ease-in-out;
}

.cookie:hover {
  transform: scale(1.1);
}

.cookie-img {
  height: 48px;
  width: 48px;
}

/* mejora de los boton🇪🇪  */
.upgrade button {
  display: flex;
  align-items: center;
  background-color: #2ecc71; /* Color de fondo atractivo */
  border: 2px solid #27ae60; /* Borde atractivo */
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px; /* Tipografía atractiva */
  font-weight: 700;
  transition: all 0.2s ease-in-out; /* Animaciones y transiciones suaves */
  padding: 8px 16px;
  margin: 10px 0;
}

.upgrade button:hover {
  transform: scale(1.1); /* Animación suave al pasar el mouse */
}

.upgrade-img {
  height: 32px;
  width: 32px;
  margin-right: 8px;
}

.upgrade-name {
  font-size: 20px;
  font-weight: 700;
  margin-right: 8px;
}

.upgrade-cost {
  font-size: 16px;
  color: #7f8c8d;
}
</style>
