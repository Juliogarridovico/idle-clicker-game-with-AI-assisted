<template>
  <div @click="increment " id="app" class="">
    <div>
    
    <div @click="modalIsVisible = false" class = "modal" v-if="modalIsVisible">
    <div class="modal-content">
      <div class="lore">
            <p>
              Caeron Smith, un mago que ha dedicado toda su vida a la práctica
              de la magia y ha alcanzado un gran poder y habilidad mágica.
            </p>
            <p>
              Sin embargo, a pesar de todo su poder, Caeron se siente
              insatisfecho y está buscando algo más.
            </p>
            <p>
              Un día, mientras exploraba una antiguo y polvorienta biblioteca un
              antiguo libro de hechizos en su torre de estudio, encuentra una
              página mágica que habla de un poder más allá de la magia.
            </p>
            <p>
              Intrigado, Caeron comienza a practicar hechizos con la página y
              descubre que cada vez que lo hace, se siente más poderoso y más
              vivo.
            </p>
            <p>
              Mientras sigue practicando hechizos, Caeron se da cuenta de que
              está desbloqueando nuevos niveles de poder mágico y que está más
              cerca de alcanzar la verdadera fuente de poder que ha estado
              buscando toda su vida.
            </p>
          </div>
    </div>
      
    </div>
  </div>
    <div class="container">
      <h1 v-bind:style="animationClick" class="title">Mago Cliker</h1>
      <div class="game">
        <button class="Mago magical-element">
          <img src="./assets/mago-sin-fondo.png" alt="Mago" class="Mago-img" />
          <span class="count">{{ count.toFixed(2) }}</span>
        </button>

        <div class="upgrades">
          <div v-for="upgrade in upgrades" :key="upgrade.id" class="upgrade">
            <button @click="buyUpgrade(upgrade)">
              <!-- <img :src="upgrade.img" alt="Upgrade" class="upgrade-img"> -->
              <span class="upgrade-line">
                <span class="upgrade-name">{{ upgrade.name }}</span>
                <span class="upgrade-cost"
                  >Nivel: {{ upgrade.level }} // coste:{{
                    upgrade.cost.toFixed(3)
                  }}
                </span>
              </span>
              <span class="upgrade-line">
                <span class="upgrade-description">{{
                  upgrade.description
                }}</span>
              </span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "./supabase";
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      modalIsVisible: false,
      count: 0,
      animationClick: "animation: shake 0.8s ;",
      animationControl: 0,
      clickManual: 0,
      timers: [
        {
          name: "insertToDB",
          valor: 30000,
        },
        {
          name: "refresh",
          valor: 1000,
        },
      ],
      upgrades: [
        {
          id: 1,
          name: "Un libro de hechizos más avanzado",
          description:
            "comprar un libro de hechizos que le enseñe hechizos más poderosos y le permita acceder a niveles más altos de poder mágico.",
          cost: 10,
          increment: 0,
          level: 1,
        },
        {
          id: 2,
          name: "Una varita mágica más poderosa",
          description:
            "varita mágica que le dé una mayor capacidad para lanzar hechizos y le permita controlar la magia de manera más precisa.",
          cost: 100,
          increment: 0,
          level: 1,
        },
        {
          id: 3,
          name: "Un amuleto mágico",
          description:
            "amuleto mágico que le proteja de los hechizos malvados y le permita resistir mejor a los ataques mágicos.",
          cost: 1000,
          increment: 0,
          level: 1,
        },
        {
          id: 3,
          name: "Una capa mágica",
          description:
            " capa mágica que le permita volar y teletransportarse a diferentes lugares.",
          cost: 10000,
          increment: 0,
          level: 1,
        },
        {
          id: 3,
          name: "Un laboratorio mágico",
          description:
            " laboratorio mágico equipado con todo tipo de herramientas y equipos para investigar y experimentar con la magia.",
          cost: 100000,
          increment: 0,
          level: 1,
        },
      ],
    };
  },
  methods: {
    openModel(){
      this.modalIsVisible = true
    },
    async increment() {
      
      this.count++;
      this.clickManual++;
      if (this.animationControl === 0) {
        this.animationControl = 1;
        this.animationClick = "animation: shake 0.1s ;";
      } else {
        this.animationControl = 0;
        this.animationClick = "animation: stop 0.1s ;";
      }
    },

    startAutomaticUpgrade() {
      let incrementUpdate = 0;
      setInterval(() => {
        
        this.upgrades.forEach((upgrade) => {
          this.count = this.count + upgrade.increment;
        });
      }, this.timers[1].valor);
    },
    getUpgradeCost(baseCost, level) {
      return baseCost * (1 + level * 0.1);
    },
    getUpgradeIncrement(cost, level, increment) {
      return (cost + increment * level) * 0.001;
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
        this.upgrades[arrayPosition].increment = this.getUpgradeIncrement(
          this.upgrades[arrayPosition].cost,
          this.upgrades[arrayPosition].level,
          this.upgrades[arrayPosition].increment
        );
      }
    },

    awaitTimeInsertDB() {
      let actualclick;
      let insertValue;
      setInterval(() => {
        let insertValue = this.clickManual - actualclick;

        actualclick = this.clickManual;

        this.insertClicks(insertValue);
      }, this.timers[0].valor);
    },

    async insertClicks(insertValue) {
      const currentTime = Date.now();
      console.log(insertValue);
      console.log(currentTime);

      if (insertValue > 1 && insertValue < 210) {
        console.log("inserto");
        const { data, error } = await supabase
          .from("click")
          .insert([{ click: insertValue, UUID: this.storageUUID() }]);
          console.log(error)
      } else {
        console.log("nada que insertar");
      }
    },
    generateUUID() {
      let d = new Date().getTime();
      let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    storageUUID() {
      let uuid = localStorage.getItem("uuid");
      if ("uuid" in localStorage || uuid.length === 36 ) {
        console.log("La clave 'uuid' existe en el almacenamiento local");
      } else {
        localStorage.setItem("uuid", this.generateUUID());
        console.log("La clave 'uuid' no existe en el almacenamiento local");
      }
      return uuid;    
    },
  },
  mounted() {
    this.startAutomaticUpgrade();
    this.awaitTimeInsertDB();
    this.openModel();
    console.log(this.storageUUID());
    
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

* {
  box-sizing: border-box;
  user-select: none;
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
  background: linear-gradient(to right, #ff0099, #6600ff);
  text-shadow: 0px 0px 10px #6600ff;
  transition: transform 0.5s ease-in-out;
  color: white;
  font-size: 2em;
  text-align: center;
}

.title:hover {
  transform: rotate(360deg);
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

.Mago {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s ease-in-out;
}

.Mago:hover {
  transform: scale(1.1);
}

.Mago-img {
  height: 48px;
  width: 48px;
}
.magical-element {
  background: linear-gradient(to right, #ff0099, #6600ff);
  box-shadow: 0px 0px 10px #6600ff;
  text-shadow: 0px 0px 10px #6600ff;
  transition: transform 0.5s ease-in-out;
}

.magical-element:hover {
  transform: rotate(360deg);
}

/* mejora de los botons  */
.upgrade button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background: linear-gradient(to right, #6600ff, #9900cc);
  box-shadow: 0px 0px 10px #9900cc;
  border-radius: 50%;
  border: 2px solid #9900cc;
  color: white;

  border-radius: 8px;
  cursor: pointer;
  font-size: 16px; /* Tipografía atractiva */
  font-weight: 700;
  transition: all 0.2s ease-in-out; /* Animaciones y transiciones suaves */
  padding: 8px 16px;
  margin: 10px 0;
  width: 100%;
}

.upgrade-line {
  display: flex;
  flex-wrap: wrap;
}
.upgrade-name {
  display: flex;
  flex: 60%;
  font-size: 20px;
  font-weight: 700;
  margin-right: 8px;
  text-align: justify;
}

.upgrade-cost {
  display: flex;
  flex: 30%;
  font-size: 16px;
  color: #7f8c8d;
}
.upgrade-description {
  font-size: 16px;
  color: #000;
  margin: 10px 0px;
  text-align: justify;
}

.upgrade button:hover {
  transform: scale(1.1); /* Animación suave al pasar el mouse */
}

.upgrade-img {
  height: 32px;
  width: 32px;
  margin-right: 8px;
}
/* transition */
.fade-out {
  transition: transform 10.5s ease-in-out, opacity 0.5s ease-in-out;
  transform: translateY(-100%);
  opacity: 0;
}

.lore {
  text-align: justify;
}

@keyframes shake {
  10%,
  90% {
    transform: translateY(-2px);
  }

  20%,
  80% {
    transform: translateY(2px);
  }

  30%,
  50%,
  70% {
    transform: translateY(-4px);
  }

  40%,
  60% {
    transform: translateY(4px);
  }
}

/* modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
}
</style>



