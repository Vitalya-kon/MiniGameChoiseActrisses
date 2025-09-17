<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Состояния меню
const showMenu = ref(true);
const selectedCategory = ref(null);
const selectedCardCount = ref(8);
const availableCardCounts = [8, 12, 24];

// Выбор категории
const selectCategory = (category) => {
    selectedCategory.value = category;
};

// Вычисляем количество раундов для выбранного количества карточек
const getRoundCount = (cardCount) => {
    let count = 0;
    let remaining = cardCount;
    while (remaining > 1) {
        remaining = Math.floor(remaining / 2);
        count++;
    }
    return count;
};
</script>
<template>
    <!-- Меню выбора режима -->
    <transition name="fade" mode="out-in">
        <div
            class="w-full h-full flex justify-center items-center bg-[linear-gradient(180deg,#4a0194_0%,#992fc4_50%,#e75af4_100%)] bg-cover">
            <div v-if="showMenu"
                class="flex flex-col items-center justify-center text-center w-full max-w-[800px] p-8 rounded-2xl bg-[rgba(255,255,255,0.1)] backdrop-blur-lg shadow-2xl shadow-black/30">
                <h1 class="menu-title">Выберите режим игры</h1>

                <transition name="slide" mode="out-in">
                    <div class="mt-10" v-if="!selectedCategory" key="category">
                        <h2 class="menu-subtitle ">Кто будет участвовать?</h2>
                        <div class="flex gap-12 mt-4">
                            <div class="cursor-pointer flex flex-col items-center justify-center gap-2"
                                :class="{ selected: selectedCategory === 'actresses' }"
                                @click="selectCategory('actresses')">
                                <div class="w-32 h-48 overflow-hidden rounded-xl">
                                    <img class="w-full h-full rounded-xl object-cover transition-all hover:scale-110 hover:bg-gray-800 hover:opacity-70"
                                        src="/images/megan_fox.webp" alt="actresses" />
                                </div>
                                <h3>Актрисы</h3>
                            </div>
                            <div class="cursor-pointer flex flex-col items-center justify-center gap-2"
                                :class="{ selected: selectedCategory === 'actors' }" @click="selectCategory('actors')">
                                <div class="w-32 h-48 overflow-hidden rounded-xl">
                                    <img class="w-full h-full rounded-xl object-cover transition-all hover:scale-110 hover:bg-gray-800 hover:opacity-70"
                                        src="/images/Actors/channing_tatum.jpg" alt="actors" />
                                </div>
                                <h3>Актеры</h3>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10" v-else key="count">
                        <h2 class="menu-subtitle">Выберите количество карточек</h2>
                        <div class="mt-4 mb-6 flex flex-col gap-4">
                            <label v-for="count in availableCardCounts" :key="count"
                                class="border border-white rounded-lg cursor-pointer p-4 transition-all duration-200"
                                :class="{
                                    'bg-green-500 border-green-500 text-white': selectedCardCount === count,
                                    'hover:bg-white/10': selectedCardCount !== count
                                }">
                                <div class="flex items-center">
                                    <input type="radio" :value="count" v-model="selectedCardCount" class="hidden" />
                                    <div class="flex-1">
                                        <h3 class="font-semibold">{{ count }} карточек</h3>
                                        <p class="text-sm opacity-80">{{ getRoundCount(count) }} раундов</p>
                                    </div>
                                    <div class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                                        :class="{ 'bg-white': selectedCardCount === count }">
                                        <div v-if="selectedCardCount === count"
                                            class="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="flex justify-between gap-4 items-center">
                            <button class="bg-gray-700 text-white font-bold block py-3 px-5 rounded-xl cursor-pointer"
                                @click="selectedCategory = null">Назад</button>
                            <RouterLink
                                class="bg-green-700 text-white font-bold block py-3 px-5 rounded-xl cursor-pointer"
                                :to="{ name: 'Game', query: { who: selectedCategory, count: selectedCardCount } }">
                                Начать игру</RouterLink>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

    </transition>
</template>

<style scoped>
/* Стили компонента */
</style>