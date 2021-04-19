import { AppError } from '../../errors/AppError';
import { ListAllPizzasUseCase } from '../ListAllPizzasUseCase';

let listAllPizzas: ListAllPizzasUseCase;

describe('List All Pizzas Use Case', () => {
  beforeAll(() => {
    listAllPizzas = new ListAllPizzasUseCase();
  });

  it('should be able to list all Pizzas', () => {
    const testList = listAllPizzas.execute({ lang: 'en' });

    expect(testList.length).toBeGreaterThan(1);
    expect(testList[0]).toHaveProperty('title');
  });

  it('should be able to parse all listed Pizzas', () => {
    const testList = listAllPizzas.execute({ lang: 'en' });
    expect(testList[0]).not.toHaveProperty('availableExtras');
  });

  it('should return an error when no pizza is found', () => {
    let functionError;

    try {
      listAllPizzas.execute({ lang: 'non_existing_language' });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
    expect(functionError.message).toBe('No Pizzas were found');
    expect(functionError.statusCode).toBe(404);
  });
});
