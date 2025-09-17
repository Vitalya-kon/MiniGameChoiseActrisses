<script setup lang="ts">
import { ref, onMounted, watch, computed  } from 'vue';
import { useRoute } from 'vue-router';
import { useAppConfigStore } from '@/stores/app_config'

const route = useRoute()
console.log(route.query.who)
console.log(route.query.count)

interface Person {
  id: number;
  name: string;
  image: string;
}

const appConfig = useAppConfigStore()

const personsList = ref<Person[]>([]);

const updatePersonsList = () => {
  const who = route.query.who;
  const count = parseInt(route.query.count as string) || 8; // Получаем количество карточек

  if (!who) return;
  // Получаем первый элемент массива appConfig.Actors
  const personsData = appConfig.Persons[0];
  // Выбираем список в зависимости от значения who
  let fullList: Person[] = [];
  if (typeof who === 'string') {
    fullList = personsData[who as keyof typeof personsData] || [];
  }

  // Случайным образом выбираем указанное количество карточек
  const shuffled = [...fullList].sort(() => Math.random() - 0.5);
  personsList.value = shuffled.slice(0, count);
};

const allPersons = ref<Person[]>([]);
const currentPair = ref<Person[] | null>(null);
const winner = ref<Person | null>(null);
const round = ref(1);
const currentPairIndex = ref(0);
const totalPairsInRound = ref(0);
const imagesPreloaded = ref(false); // Флаг предзагрузки изображений

// Предзагрузка изображений
const preloadImages = () => {
  updatePersonsList();
  const promises = personsList.value.map(person => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = person.image;
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  Promise.all(promises)
    .then(() => {
      imagesPreloaded.value = true;
    })
    .catch(error => {
      console.error('Ошибка загрузки изображений:', error);
      imagesPreloaded.value = true; // Все равно продолжаем игру
    });
};

// Актрисы, которые уже были показаны в текущем раунде
const shownInCurrentRound = ref<Set<number>>(new Set());

// Вычисляем общее количество пар в раунде
const calculateTotalPairs = () => {
  return Math.floor(allPersons.value.length / 2);
};

// Инициализация игры
const initializeGame = () => {
  updatePersonsList();
  allPersons.value = [...personsList.value];
  winner.value = null;
  round.value = 1;
  currentPairIndex.value = 0;
  shownInCurrentRound.value = new Set();
  totalPairsInRound.value = calculateTotalPairs();
  if (imagesPreloaded.value) {
    nextRound();
  }
};

// Выбор следующей пары
const nextRound = () => {
  if (allPersons.value.length === 1) {
    winner.value = allPersons.value[0];
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
  const availablePersons = allPersons.value.filter(
    person => !shownInCurrentRound.value.has(person.id)
  );

  // Если доступных актрис меньше 2, сбрасываем отслеживание показанных
  if (availablePersons.length < 2) {
    shownInCurrentRound.value = new Set();
    nextRound();
    return;
  }

  // Перемешиваем доступных актрис
  const shuffled = [...availablePersons].sort(() => Math.random() - 0.5);

  // Выбираем первых двух актрис
  currentPair.value = [shuffled[0], shuffled[1]];

  // Помечаем их как показанные в этом раунде
  shownInCurrentRound.value.add(shuffled[0].id);
  shownInCurrentRound.value.add(shuffled[1].id);

  currentPairIndex.value++;
};

// Обработка выбора пользователя
const selectPerson = (selected: Person) => {
  // Удаляем невыбранную актрису
  const notSelected = currentPair.value!.find(a => a.id !== selected.id);
  allPersons.value = allPersons.value.filter(a => a.id !== notSelected!.id);

  nextRound();
};

// Вычисляемое свойство для текста раунда
const roundTitle = computed(() => {
  return round.value === totalRounds.value ? 'ФИНАЛ' : `${round.value} РАУНД`;
});

// Вычисляем общее количество раундов
const totalRounds = computed(() => {
  return Math.ceil(Math.log2(personsList.value.length));
});

// Флаг для принудительного перезапуска анимации
const animationKey = ref(0);

// Перезапуск игры
const restartGame = () => {
  initializeGame();
};

// Запуск игры при монтировании компонента
onMounted(() => {
  preloadImages();
});

// Запускаем игру после предзагрузки изображений
watch(imagesPreloaded, (preloaded) => {
  if (preloaded) {
    initializeGame();
  }
});

// Watcher для отслеживания изменения раунда
watch(round, (newRound, oldRound) => {
  // Принудительно обновляем ключ анимации при смене раунда
  animationKey.value++;
  
  // Дополнительная логика при смене раунда
  console.log(`Раунд изменен с ${oldRound} на ${newRound}`);
});
</script>

<template>
  <div
    class="game-container text-center h-[100vh] relative w-[100vw] flex justify-center flex-col bg-[linear-gradient(180deg,#4a0194_0%,#992fc4_50%,#e75af4_100%)] bg-cover">
    <div v-if="winner" class="mt-8 flex flex-col md:w-[22vw] w-[70vw] mx-auto">
      <h2 class="text-[#4CAF50] text-3xl">Победитель:</h2>
      <img class="w-[300px] h-[450px] object-cover rounded-sm my-5 mx-0 shadow-lg" :src="winner.image"
        :alt="winner.name" />
      <p>{{ winner.name }}</p>
      <button
        class="px-6 py-3 text-lg mt-5 cursor-pointer bg-[#4CAF50] text-white border-none rounded transition-colors duration-300 hover:text-[#45a049]"
        @click="restartGame">Начать заново</button>
      <router-link to="/">На главную</router-link>
    </div>

    <div v-else-if="currentPair"
      class="flex justify-center md:gap-[18vw] gap-[5vw] absolute top-5 bottom-20 left-0 right-0 max-w-[75vw] my-0 mx-auto md:flex-row flex-col md:items-start items-center md:h-auto h-[80dvh]">
      <div v-for="person in currentPair" :key="person.id"
        class="cursor-pointer border-2 border-white p-2.5 transition-all md:w-[45vw] w-[60vw] md:h-full h-[38dvh] rounded-xl hover:scale-[1.05] hover:border-[#4CAF50] hover:shadow-md relative"
        @click="selectPerson(person)">
        <img class="w-full h-full object-cover rounded-sm" :src="person.image" :alt="person.name" />
        <div class="md:mt-2.5 md:0 absolute md:bg-transparent bg-gray-500 text-lg font-bold rounded-lg w-max bottom-8 left-[50%] px-16 py-2 transform -translate-x-1/2 translate-y-0">
            <div class="liquidGlass-effect"></div>
            <div class="liquidGlass-tint"></div>
            <div class="liquidGlass-shine"></div>
          <span class="relative z-50">{{ person.name }}</span>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Загрузка...</p>
    </div>
    <div
      class="p-2.5 md:rounded-lg rounded-none z-10 md:relative text-white md:w-[15vw] my-0 mx-auto absolute bottom-0 left-0 w-full"
      v-if="!winner">
      <div class="wrapper_raund z-50 h-[5rem]" :key="round">
        <svg class="z-50">
          <text x="50%" y="50%" dy=".35em" text-anchor="middle">
            {{ roundTitle }}
          </text>
        </svg>
      </div>
      <div class="z-20 relative ">
        <p class="text-white font-bold my-1">Пара: {{ currentPairIndex }} из {{ totalPairsInRound }}</p>
        <p class="text-white font-bold my-1">Осталось актрис: {{ allPersons.length }}</p>
        <router-link to="/">На главную</router-link>
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
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

.liquidGlass-effect {
  filter: url(#glass-distortion);
}

.wrapper_raund {
  display: inline-block;
}

.wrapper_raund svg {
  font-family: "Russo One", sans-serif;
  width: 100%;
  height: 100%;
}

.wrapper_raund svg text {
  animation: stroke 4s alternate;
  animation-iteration-count: 1;
  stroke-width: 0;
  stroke: #fff;
  font-size: 2.5rem;
  fill: #fff;
}

@keyframes stroke {
  0% {
    fill: rgba(255, 255, 255, 0);
    stroke: rgba(255, 255, 255, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 2;
  }

  70% {
    fill: rgba(255, 255, 255, 0);
    stroke: rgba(255, 255, 255, 1);
  }

  80% {
    fill: rgba(255, 255, 255, 0);
    stroke: rgba(255, 255, 255, 1);
    stroke-width: 3;
  }

  100% {
    fill: rgba(255, 255, 255, 1);
    stroke: rgba(255, 255, 255, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

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
  background: rgb(37 34 34 / 42%);
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
</style>