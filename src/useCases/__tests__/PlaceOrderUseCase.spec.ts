import { AppError } from '../../errors/AppError';
import { PlaceOrderUseCase } from '../PlaceOrderUseCase';

let placeOrder: PlaceOrderUseCase;

describe('Place Order Use Case', () => {
  beforeAll(() => {
    placeOrder = new PlaceOrderUseCase({});
  });

  it('should be able to place a new order', () => {
    const testOrder = placeOrder.execute({
      pizzaId: 'pizza_01',
      extras: ['extra_02'],
      size: 'medium',
    });

    expect(testOrder.confirmed).toBe(true);
    expect(testOrder).toHaveProperty('readyIn');
    expect(testOrder.readyIn).toBeLessThan(60);
    expect(testOrder.readyIn).toBeGreaterThan(20);
  });

  it('should not be able to place an order for a non existing pizza', async () => {
    let functionError;

    try {
      placeOrder.execute({
        pizzaId: 'never_created_pizza',
        extras: [],
        size: 'medium',
      });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
    expect(functionError.message).toBe('Pizza does not exist');
    expect(functionError.statusCode).toBe(400);
  });

  it('should not be able to place an order for an invalid pizza size', () => {
    let functionError;

    try {
      placeOrder.execute({
        pizzaId: 'pizza_01',
        extras: [],
        size: 'invalid_size',
      });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
    expect(functionError.message).toBe('Invalid Pizza Size');
    expect(functionError.statusCode).toBe(400);
  });

  it('should not be able to place an order with an invalid extra', () => {
    let functionError;

    try {
      placeOrder.execute({
        pizzaId: 'pizza_01',
        extras: ['invalid_extra'],
        size: 'medium',
      });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
    expect(functionError.message).toBe('Invalid Pizza Extras');
    expect(functionError.statusCode).toBe(400);
  });

  it('should not be able to place an order with an extra that the pizza does not have', () => {
    let functionError;

    try {
      placeOrder.execute({
        pizzaId: 'pizza_01',
        extras: ['extra_01'],
        size: 'medium',
      });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
    expect(functionError.message).toBe('Invalid Pizza Extras');
    expect(functionError.statusCode).toBe(400);
  });

  it('should be able to create a custom place order function with a different size set', () => {
    const customPlaceOrder = new PlaceOrderUseCase({
      allowedSizes: ['large'],
    });

    expect(
      customPlaceOrder.execute({
        pizzaId: 'pizza_01',
        extras: [],
        size: 'large',
      }),
    ).toHaveProperty('confirmed');

    let functionError;

    try {
      customPlaceOrder.execute({
        pizzaId: 'pizza_01',
        extras: [],
        size: 'medium',
      });
    } catch (err) {
      functionError = err;
    }

    expect(functionError).toBeInstanceOf(AppError);
  });
});
