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
  <div class="game-container text-center h-[100vh] relative w-[100vw] flex justify-center flex-col">
    <div v-if="winner" class="mt-8 flex flex-col md:w-[22vw] w-[70vw] mx-auto">
      <h2 class="text-[#4CAF50] text-3xl">Победитель:</h2>
      <img class="w-[300px] h-[450px] object-cover rounded-sm my-5 mx-0 shadow-lg" :src="winner.image" :alt="winner.name" />
      <p>{{ winner.name }}</p>
      <button class="px-6 py-3 text-lg mt-5 cursor-pointer bg-[#4CAF50] text-white border-none rounded transition-colors duration-300 hover:text-[#45a049]" @click="restartGame">Начать заново</button>
    </div>

    <div v-else-if="currentPair" class="flex justify-center md:gap-[18vw] gap-[5vw] absolute top-5 bottom-20 left-0 right-0 max-w-[75vw] my-0 mx-auto md:flex-row flex-col md:items-start items-center md:h-auto h-[80dvh]">
      <div v-for="actress in currentPair" :key="actress.id" class="cursor-pointer border-2 border-white p-2.5 transition-all md:w-[45vw] w-[60vw] md:h-full h-[38dvh] rounded-xl hover:scale-[1.05] hover:border-[#4CAF50] hover:shadow-md relative" @click="selectActress(actress)">
        <img class="w-full h-full object-cover rounded-sm" :src="actress.image" :alt="actress.name" />
        <p class="md:mt-2.5 md:0 w-full md:static absolute bottom-0 left-0 md:bg-transparent bg-gray-500 text-lg font-bold rounded-lg">{{ actress.name }}</p>
      </div>
    </div>

    <div v-else>
      <p>Загрузка...</p>
    </div>
    <div class="p-2.5 md:rounded-lg rounded-none z-10 md:relative text-white md:w-[15vw] my-0 mx-auto absolute bottom-0 left-0 w-full" v-if="!winner">
      <div class="liquidGlass-effect absolute z-0 inset-0 backdrop-blur-sm overflow-hidden isolate md:rounded-3xl rounded-none"></div>
      <div class="liquidGlass-tint z-10 absolute inset-0 bg-white/7 md:rounded-3xl rounded-none"></div>
      <div class="liquidGlass-shine absolute inset-0 z-20 overflow-hidden md:rounded-3xl rounded-none [box-shadow:inset_2px_2px_1px_0_rgb(255_255_255_/_8%),inset_-1px_-1px_1px_1px_rgb(255_255_255_/_9%)]"></div>

      <div class="z-20 relative ">
        <p class="text-white font-bold my-1">Раунд: {{ round }}</p>
        <p class="text-white font-bold my-1">Пара: {{ currentPairIndex }} из {{ totalPairsInRound }}</p>
        <p class="text-white font-bold my-1">Осталось актрис: {{ allActresses.length }}</p>
      </div>

    </div>
    <svg class="hidden">
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
  filter: url(#glass-distortion);
}
.game-container {
  font-family: "Montserrat", sans-serif;
}
</style>