import { filterObjKeys } from 'unch/lib';
import { getAllPizzas, PizzaElement } from '../data/pizzas';
import { AppError } from '../errors/AppError';

interface IReq {
  lang: string;
}

class ListAllPizzasUseCase {
  execute({ lang }: IReq): Partial<PizzaElement[]> {
    const pizzas = getAllPizzas(lang);

    const pizzasBaseInfo = pizzas.map(pizza =>
      filterObjKeys(pizza, [
        'id',
        'title',
        'description',
        'isAvailable',
        'prices',
        'image',
      ]),
    );

    if (pizzasBaseInfo.length === 0) {
      throw new AppError('No Pizzas were found', 404);
    }

    return pizzasBaseInfo;
  }
}

export { ListAllPizzasUseCase };
