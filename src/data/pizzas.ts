import { AcceptedLanguages } from './languages';
import { ExtraElement, getExtrasByName } from './extras';

interface PizzaFlavorInfo {
  title: string;
  description: string;
}

interface PizzaEntity {
  id: string;
  info: Record<AcceptedLanguages, PizzaFlavorInfo>;
  isAvailable: boolean;
  availableExtras: string[];
  price: number;
  image: string;
}

export interface PizzaElement {
  id: string;
  title: string;
  description: string;
  isAvailable: boolean;
  availableExtras: ExtraElement[];
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  image: string;
}

const buildImageUrl = (imgId: string): string => {
  return `https://images.unsplash.com/photo-${imgId}?w=1350&q=80`;
};

const pizzas: PizzaEntity[] = [
  {
    id: 'pizza_01',
    info: {
      pt: {
        title: 'Mussarela',
        description:
          'Queijo mussarela especial, servido sobre molho de tomates cereja.',
      },
      en: {
        title: 'Mozzarella',
        description:
          'Special mozzarella cheese, served over a grape tomato sauce',
      },
    },
    isAvailable: true,
    availableExtras: ['bacon', 'stuffedEdge', 'creamCheese', 'truffledOil'],
    price: 5500,
    image: buildImageUrl('1513104890138-7c749659a591'),
  },
  {
    id: 'pizza_02',
    info: {
      pt: {
        title: 'Pepperoni',
        description:
          'Deliciosas fatias de pepperoni da casa, servidas com nossa mussarela especial',
      },
      en: {
        title: 'Pepperoni',
        description:
          'Delicious stices of our own pepperoni, served with our special mozzarella',
      },
    },
    isAvailable: true,
    availableExtras: ['bacon', 'stuffedEdge', 'creamCheese', 'garlic'],
    price: 5900,
    image: buildImageUrl('1605478371310-a9f1e96b4ff4'),
  },
  {
    id: 'pizza_03',
    info: {
      pt: {
        title: 'Rúcula',
        description:
          'Uma base de cream cheese coberta de alho poró, rúcula fresca e pasta de azeitona preta',
      },
      en: {
        title: 'Arugula',
        description:
          'A cream cheese base covered with leek, fresh agula and black olives paste',
      },
    },
    isAvailable: true,
    availableExtras: ['bacon', 'stuffedEdge', 'creamCheese', 'truffledOil'],
    price: 5200,
    image: buildImageUrl('1607290817806-e93c813ff329'),
  },
  {
    id: 'pizza_04',
    info: {
      pt: {
        title: 'Grandiosa',
        description:
          'Nossa pizza de fusão de queijos com cogumelos paris e pimenta jalapeño',
      },
      en: {
        title: 'Magnificent',
        description:
          'Our fusion of great cheeses with button mushrooms and jalapeño pepper',
      },
    },
    isAvailable: true,
    availableExtras: [
      'crispyOnion',
      'stuffedEdge',
      'blueCheese',
      'truffledOil',
    ],
    price: 5800,
    image: buildImageUrl('1589840700256-f78d6ed1ae21'),
  },
  {
    id: 'pizza_05',
    info: {
      pt: {
        title: 'Grana Padano',
        description:
          'Coberta com o delicioso queijo grana padano, pepperoni e manjericão',
      },
      en: {
        title: 'Grana Padano',
        description:
          'Covered with a delicious grana padano cheese, pepperoni and basil',
      },
    },
    isAvailable: false,
    availableExtras: ['bacon', 'stuffedEdge', 'blueCheese', 'truffledOil'],
    price: 6200,
    image: buildImageUrl('1506354666786-959d6d497f1a'),
  },
  {
    id: 'pizza_06',
    info: {
      pt: {
        title: 'Vesúvio',
        description:
          'Molho de tomate artesanal coberto com nossa deliciosa fusão de queijos importados',
      },
      en: {
        title: 'Vesuvius',
        description:
          'Our artisanal tomato sauce with our delicious fusion of special cheeses',
      },
    },
    isAvailable: true,
    availableExtras: ['bacon', 'stuffedEdge', 'truffledOil', 'garlic'],
    price: 6100,
    image: buildImageUrl('1539451652256-f485173cab9b'),
  },
  {
    id: 'pizza_07',
    info: {
      pt: {
        title: 'Havaiana',
        description:
          'Cubos de Abacaxi, coetro, presunto, e cebola com nosso molho especial',
      },
      en: {
        title: 'Hawaiian',
        description:
          'Pineapple cubes, coriander, ham and onion with our special sauce',
      },
    },
    isAvailable: true,
    availableExtras: ['bacon', 'stuffedEdge', 'creamCheese', 'garlic'],
    price: 5900,
    image: buildImageUrl('1565299624946-b28f40a0ae38'),
  },
  {
    id: 'pizza_08',
    info: {
      pt: {
        title: 'Ousada',
        description:
          'Nossa deliciosa pizza de pêras com alecrim, sal grosso e lascas de grana padano',
      },
      en: {
        title: 'Bold',
        description:
          'Our decious pizza made with pear, rosemary, kosher salt and grana padano crumbs',
      },
    },
    isAvailable: true,
    availableExtras: ['blueCheese', 'stuffedEdge', 'creamCheese', 'garlic'],
    price: 5300,
    image: buildImageUrl('1588170737136-c5f83da1321a'),
  },
];

const parsePizza = (pizza: PizzaEntity, lang: string): PizzaElement => {
  if (!pizza.info[lang]?.title) return undefined;
  return {
    id: pizza.id,
    title: pizza.info[lang].title,
    description: pizza.info[lang].description,
    availableExtras: getExtrasByName(pizza.availableExtras, lang),
    image: pizza.image,
    isAvailable: pizza.isAvailable,
    prices: {
      small: Math.floor(pizza.price * 0.75),
      medium: pizza.price,
      large: Math.floor(pizza.price * 1.5),
    },
  };
};

const getAllPizzas = (lang: string): PizzaElement[] => {
  return pizzas.map(pizza => parsePizza(pizza, lang)).filter(pizza => !!pizza);
};

const getPizzaById = (id: string, lang: string): PizzaElement | undefined => {
  const foundPizza = pizzas.find(pizza => pizza.id === id);

  if (!foundPizza) return undefined;

  return parsePizza(foundPizza, lang);
};

export { pizzas, getAllPizzas, getPizzaById };
