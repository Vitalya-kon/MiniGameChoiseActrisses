import { defineStore } from 'pinia'
interface Person {
    id: number;
    name: string;
    image: string;
  }

export const useAppConfigStore = defineStore('appConfigStore', {
  state: () => ({
    Persons: [
      {
        actresses: [
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
        ],
        actors: [
            { id: 1, name: 'Дженсен Эклс', image: '/images/Actors/дженсен_эклс.jpg' },
            { id: 2, name: 'Бред Питт', image: '/images/Actors/Brad_pitt.jpg' },
            { id: 3, name: 'Бредли Купер', image: '/images/Actors/bradley_cooper.jpg' },
            { id: 4, name: 'Брюс Уилис', image: '/images/Actors/bruce_willis.jpg' },
            { id: 5, name: 'Ченнинг Татум', image: '/images/Actors/channing_tatum.jpg' },
            { id: 6, name: 'Дуэйн Джонсон', image: '/images/Actors/dueyn_jonson.jpg' },
            { id: 7, name: 'Джордж Клуни', image: '/images/Actors/dzorsh_kluni.jpg' },
            { id: 8, name: 'Хит Леджер', image: '/images/Actors/heath_legder.jpg' },
            { id: 9, name: 'Хоакин Феникс', image: '/images/Actors/hoakin_phenix.jpg' },
            { id: 10, name: 'Джейк Джелинхолл', image: '/images/Actors/jake_gyllenhaal.jpg' },
            { id: 11, name: 'Джеймс Франко', image: '/images/Actors/james_franco.jpg' },
            { id: 12, name: 'Джаред Лето', image: '/images/Actors/jared_leto.jpg' },
            { id: 13, name: 'Джонни Депп', image: '/images/Actors/jonny_depp.jpg' },
            { id: 14, name: 'Кевин Костнер', image: '/images/Actors/kevin_kostner.jpg' },
            { id: 15, name: 'Леонардо Ди Каприо', image: '/images/Actors/leo_dicaprio.jpg' },
            { id: 16, name: 'Метт Деймон', image: '/images/Actors/matt_damon.webp' },
            { id: 17, name: 'Метью Макконахи', image: '/images/Actors/matthew_McConaughey.jpg' },
            { id: 18, name: 'Мелл Гибсон', image: '/images/Actors/mel_gibson.jpg' },
            { id: 19, name: 'Микки Рурк', image: '/images/Actors/mikki_rurck.jpg' },
            { id: 20, name: 'Роберт Дауни Младший', image: '/images/Actors/rob_dauni_jr.jpg' },
            { id: 21, name: 'Райан Рейнолдс', image: '/images/Actors/ryan_reynolds.jpg' },
            { id: 22, name: 'Том Круз', image: '/images/Actors/tom_cruz.jpg' },
            { id: 23, name: 'Том Хэнкс', image: '/images/Actors/tom_hanks.jpg' },
            { id: 24, name: 'Уилл Смитт', image: '/images/Actors/will_smith.jpg' },
        ],
      },
    ],
  }),
  actions: {
  },
})
