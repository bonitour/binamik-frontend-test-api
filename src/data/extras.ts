import { AcceptedLanguages } from './languages';

interface ExtraEntity {
  id: string;
  name: string;
  price: number;
  label: Record<AcceptedLanguages, string>;
}

export interface ExtraElement {
  id: string;
  price: number;
  label: string;
}

const extras: ExtraEntity[] = [
  {
    id: 'extra_01',
    name: 'garlic',
    price: 200,
    label: {
      pt: 'Alho Crocante',
      en: 'Fried Garlic',
    },
  },
  {
    id: 'extra_02',
    name: 'bacon',
    price: 350,
    label: {
      pt: 'Bacon',
      en: 'Bacon',
    },
  },
  {
    id: 'extra_03',
    name: 'stuffedEdge',
    price: 800,
    label: {
      pt: 'Borda Recheada',
      en: 'Stuffed Edge',
    },
  },
  {
    id: 'extra_04',
    name: 'blueCheese',
    price: 500,
    label: {
      pt: 'Gorgonzola',
      en: 'Bluecheese',
    },
  },
  {
    id: 'extra_05',
    name: 'creamCheese',
    price: 500,
    label: {
      pt: 'Cream Cheese',
      en: 'Cream Cheese',
    },
  },
  {
    id: 'extra_06',
    name: 'truffledOil',
    price: 700,
    label: {
      pt: 'Azeite Trufado',
      en: 'Truffled Oil',
    },
  },
  {
    id: 'extra_07',
    name: 'crispyOnion',
    price: 400,
    label: {
      pt: 'Cebola Crispy',
      en: 'Crispy Onion',
    },
  },
];

const getExtrasByName = (
  extrasList: string[],
  lang: string,
): ExtraElement[] => {
  const selectedExtras = extras.filter(
    extra => extrasList.indexOf(extra.name) >= 0,
  );

  return selectedExtras.map(extra => ({
    id: extra.id,
    price: extra.price,
    label: extra.label[lang],
  }));
};

export { extras, getExtrasByName };
