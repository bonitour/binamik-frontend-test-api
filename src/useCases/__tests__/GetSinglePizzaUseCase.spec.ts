import { AppError } from '../../errors/AppError';
import { GetSinglePizzaUseCase } from '../GetSinglePizzaUseCase';

let getSinglePizza: GetSinglePizzaUseCase;

describe('List All Pizzas Use Case', () => {
  beforeAll(() => {
    getSinglePizza = new GetSinglePizzaUseCase();
  });

  it('should be able to list all Pizzas', () => {
    const testPizza = getSinglePizza.execute({ id: 'pizza_01', lang: 'en' });
    expect(testPizza).toHaveProperty('title');
  });

  it('should return an error when no pizza is found', () => {
    let functionError;

    try {
      getSinglePizza.execute({ id: 'invalid_id', lang: 'en' });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
    expect(functionError.message).toBe('Not Found');
    expect(functionError.statusCode).toBe(404);
  });
});
