import { getPizzaById, PizzaElement } from '../data/pizzas';
import { AppError } from '../errors/AppError';

interface IReq {
  id: string;
  lang: string;
}

class GetSinglePizzaUseCase {
  execute({ id, lang }: IReq): PizzaElement {
    const foundPizza = getPizzaById(id, lang);

    if (!foundPizza) {
      throw new AppError('Not Found', 404);
    }

    return foundPizza;
  }
}

export { GetSinglePizzaUseCase };
