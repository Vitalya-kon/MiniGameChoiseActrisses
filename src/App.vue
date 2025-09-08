<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Actress {
  id: number;
  name: string;
  image: string;
}

// Исходные данные
const initialActresses = ref<Actress[]>([
  { id: 1, name: 'Анджелина Джолли', image: '/images/angelina_golly.webp' },
  { id: 2, name: 'Анна Де Армас', image: '/images/anna_de_armas.jpeg' },
  { id: 3, name: 'Кемерон Диаз', image: '/images/cameron_diaz.jpg' },
  { id: 4, name: 'Кетрин Зета Джонс', image: '/images/catrin_z_jhons.jpg' },
  { id: 5, name: 'Дакота Джонсон', image: '/images/Dakota_Johnson.jpg' },
  { id: 6, name: 'Эмбер Херд', image: '/images/ember_heard.jpg' },
  { id: 7, name: 'Эмилия Кларк', image: '/images/emiliya_klark.webp' },
  { id: 8, name: 'Эмма Стоун', image: '/images/emma_stome.jpeg' },
  { id: 9, name: 'Энн Хетевей', image: '/images/enn_hetway.jpg' },
  { id: 10, name: 'Галь Гадот', image: '/images/gal_gadot.jpg' },
  { id: 11, name: 'Хенде Эрчел', image: '/images/hande_erchel.webp' },
  { id: 12, name: 'Дженифер Энистон', image: '/images/jenifer_eniston.jpg' },
  { id: 13, name: 'Дженифер Лоуренс', image: '/images/jenifer_lowrens.png' },
  { id: 14, name: 'Кира Найтли', image: '/images/Keira_Knightley.jpg' },
  { id: 15, name: 'Марго Робби', image: '/images/margo_robbi.jpg' },
  { id: 16, name: 'Меган Фокс', image: '/images/megan_fox.webp' },
  { id: 17, name: 'Мила Кунис', image: '/images/mila_kunis.webp' },
  { id: 18, name: 'Моника Белуччи', image: '/images/monikabelucci.jpg' },
  { id: 19, name: 'Натали Портман', image: '/images/natali_portman.jpg' },
  { id: 20, name: 'Нина Добрев', image: '/images/nina_dobrev.jpg' },
  { id: 21, name: 'Пенелопа Круз', image: '/images/penelopa_cruz.jpg' },
  { id: 22, name: 'Скарлетт Йохансен', image: '/images/Scarlett_Johansson.jpg' },
  { id: 23, name: 'Селена Гомес', image: '/images/selena_gomes.jpg' },
  { id: 24, name: 'Зендея', image: '/images/zendeya.webp' },
]);

const allActresses = ref<Actress[]>([]);
const currentPair = ref<Actress[] | null>(null);
const winner = ref<Actress | null>(null);
const round = ref(1);
const currentPairIndex = ref(0);
const totalPairsInRound = ref(0);

// Актрисы, которые уже были показаны в текущем раунде
const shownInCurrentRound = ref<Set<number>>(new Set());

// Вычисляем общее количество пар в раунде
const calculateTotalPairs = () => {
  return round.value === 1 ? 12 : Math.floor(allActresses.value.length / 2);
};

// Инициализация игры
const initializeGame = () => {
  allActresses.value = [...initialActresses.value];
  winner.value = null;
  round.value = 1;
  currentPairIndex.value = 0;
  shownInCurrentRound.value = new Set();
  totalPairsInRound.value = calculateTotalPairs();
  nextRound();
};

// Выбор следующей пары
const nextRound = () => {
  if (allActresses.value.length === 1) {
    winner.value = allActresses.value[0];
    return;
  }

  // Если все пары в раунде пройдены, переходим к следующему раунду
  if (currentPairIndex.value >= totalPairsInRound.value) {
    round.value++;
    currentPairIndex.value = 0;
    shownInCurrentRound.value = new Set();
    totalPairsInRound.value = calculateTotalPairs();
  }

  // Получаем актрис, которые еще не были показаны в этом раунде
  const availableActresses = allActresses.value.filter(
    actress => !shownInCurrentRound.value.has(actress.id)
  );

  // Если доступных актрис меньше 2, сбрасываем отслеживание показанных
  if (availableActresses.length < 2) {
    shownInCurrentRound.value = new Set();
    nextRound();
    return;
  }

  // Перемешиваем доступных актрис
  const shuffled = [...availableActresses].sort(() => Math.random() - 0.5);

  // Выбираем первых двух актрис
  currentPair.value = [shuffled[0], shuffled[1]];

  // Помечаем их как показанные в этом раунде
  shownInCurrentRound.value.add(shuffled[0].id);
  shownInCurrentRound.value.add(shuffled[1].id);

  currentPairIndex.value++;
};

// Обработка выбора пользователя
const selectActress = (selected: Actress) => {
  // Удаляем невыбранную актрису
  const notSelected = currentPair.value!.find(a => a.id !== selected.id);
  allActresses.value = allActresses.value.filter(a => a.id !== notSelected!.id);

  nextRound();
};

// Перезапуск игры
const restartGame = () => {
  initializeGame();
};

// Запуск игры при монтировании компонента
onMounted(() => {
  initializeGame();
});
</script>

<template>
  <div class="game-container">
    <div v-if="winner" class="winner">
      <h2>Победитель:</h2>
      <img :src="winner.image" :alt="winner.name" />
      <p>{{ winner.name }}</p>
      <button @click="restartGame">Начать заново</button>
    </div>

    <div v-else-if="currentPair" class="cards-container">
      <div v-for="actress in currentPair" :key="actress.id" class="card" @click="selectActress(actress)">
        <img :src="actress.image" :alt="actress.name" />
        <p>{{ actress.name }}</p>
      </div>
    </div>

    <div v-else>
      <p>Загрузка...</p>
    </div>
    <div class="game-info" v-if="!winner">
      <div class="liquidGlass-effect"></div>
      <div class="liquidGlass-tint"></div>
      <div class="liquidGlass-shine"></div>

      <div style="z-index: 2;position: relative;">
        <p>Раунд: {{ round }}</p>
        <p>Пара: {{ currentPairIndex }} из {{ totalPairsInRound }}</p>
        <p>Осталось актрис: {{ allActresses.length }}</p>
      </div>

    </div>
    <svg style="display: none">
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
        <!-- Seeds: 14, 17,  -->

        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>

        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

        <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100"
          lighting-color="white" result="specLight">
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>

        <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />

        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
.liquidGlass-effect {
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(3px);
  filter: url(#glass-distortion);
  overflow: hidden;
  isolation: isolate;
  border-radius: 1.5rem;
}

.liquidGlass-tint {
  z-index: 1;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 7%);
  border-radius: 1.5rem;
}

.liquidGlass-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  box-shadow: inset 2px 2px 1px 0 rgb(255 255 255 / 8%), inset -1px -1px 1px 1px rgb(255 255 255 / 9%);
  border-radius: 1.5rem;
}

.game-container {
  font-family: "Montserrat", sans-serif;
  /* max-width: 800px;
  margin: 0 auto; */
  text-align: center;
  /* padding: 20px; */
  height: 100vh;
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;;
  flex-direction: column;
}

.game-info {
  /* margin-top: 20px; */
  padding: 10px;
  border-radius: 8px;
  z-index: 1;
  position: relative;
  bottom: 0vh;
  /* background: #f97fffd9; */
  color: #fff;
  width: 15vw;
  margin: 0 auto;
}

.game-info p {
  margin: 5px 0;
  font-weight: bold;
  color: #fff;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 18vw;
  position: absolute;
  top: 20px;
  bottom: 70px;
  left: 0;
  right: 0;
  max-width: 75vw;
  margin: 0 auto;
}

.card {
  cursor: pointer;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease;
  width: 45vw;
}

.card:hover {
  transform: scale(1.05);
  border-color: #4CAF50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.card p {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

.winner {
  margin-top: 30px;
}

.winner img {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.winner h2 {
  color: #4CAF50;
  font-size: 28px;
}

button {
  padding: 12px 24px;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

@media screen {}
</style>