import { defaultLanguage } from '../data/languages';
import { getPizzaById } from '../data/pizzas';
import { AppError } from '../errors/AppError';
import { getRandomIntInclusive } from '../utils/getRandomInt';

interface IConstructorReq {
  allowedSizes?: string[];
}

interface IReq {
  pizzaId: string;
  size: string;
  extras: string[];
}

interface IRes {
  confirmed: boolean;
  readyIn: number;
}

class PlaceOrderUseCase {
  private allowedSizes: string[];

  constructor({
    allowedSizes = ['small', 'medium', 'large'],
  }: IConstructorReq) {
    this.allowedSizes = allowedSizes;
  }

  execute({ pizzaId, size, extras }: IReq): IRes {
    const foundPizza = getPizzaById(String(pizzaId), defaultLanguage);

    if (!foundPizza) {
      throw new AppError('Pizza does not exist');
    }

    if (this.allowedSizes.indexOf(size) === -1) {
      throw new AppError('Invalid Pizza Size');
    }

    const currentPizzaExtras = foundPizza.availableExtras.map(
      extra => extra.id,
    );
    const isExtrasValid =
      Array.isArray(extras) &&
      extras.every(extraId => {
        return currentPizzaExtras.indexOf(extraId) >= 0;
      });
    if (!isExtrasValid) {
      throw new AppError('Invalid Pizza Extras');
    }

    return {
      confirmed: true,
      readyIn: getRandomIntInclusive(25, 50),
    };
  }
}

export { PlaceOrderUseCase };
