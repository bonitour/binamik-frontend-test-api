import { pizzas, getAllPizzas, getPizzaById } from '../pizzas';
import { acceptedLanguagesList } from '../languages';

describe('Pizzas Mock Data', () => {
  it('should have only unique ids', () => {
    const pizzasIds = pizzas.map(pizza => pizza.id);

    const uniquePizzasIds = [...new Set(pizzasIds)];

    expect(pizzasIds.length).toBe(uniquePizzasIds.length);
  });

  it('should have ids following the template "pizza_xx"', () => {
    expect(pizzas.every(pizza => pizza.id.startsWith('pizza_'))).toBe(true);
  });

  it('should have at least 7 pizzas in list', () => {
    expect(pizzas.length).toBeGreaterThanOrEqual(7);
  });

  it('should have only prices between 1000 cents and 9999 cents', () => {
    expect(
      pizzas.every(pizza => pizza.price > 999 && pizza.price < 10000),
    ).toBe(true);
  });

  it('should only have integer prices', () => {
    expect(pizzas.every(pizza => Number.isInteger(pizza.price))).toBe(true);
  });

  it('should have title and description in every api available language', () => {
    const allLanguagesHaveAllInfo = pizzas.every(pizza => {
      return acceptedLanguagesList.every(lang => {
        if (
          !pizza.info[lang]?.title ||
          pizza.info[lang].title.trim().toLocaleLowerCase() === 'todo'
        ) {
          console.error(`Pizza: ${pizza.id} does not have title in "${lang}"`);
          return false;
        }

        if (
          !pizza.info[lang]?.description ||
          pizza.info[lang].description.trim().toLocaleLowerCase() === 'todo'
        ) {
          console.error(
            `Pizza: ${pizza.id} does not have description in "${lang}"`,
          );
          return false;
        }

        return true;
      });
    });

    expect(allLanguagesHaveAllInfo).toBe(true);
  });

  it('should have exctly 4 extras per pizza', () => {
    expect(pizzas.every(pizza => pizza.availableExtras.length === 4)).toBe(
      true,
    );
  });

  it('should not have an invalid extra', () => {
    expect(
      pizzas.every(pizza => {
        const parsedPizza = getPizzaById(pizza.id, acceptedLanguagesList[0]);

        return (
          pizza.availableExtras.length === parsedPizza.availableExtras.length
        );
      }),
    ).toBe(true);
  });

  it('should be able to get pizzas by id', () => {
    const pizza = getPizzaById(pizzas[0].id, acceptedLanguagesList[0]);

    expect(pizza).toHaveProperty('title');
  });

  it('should be able to list all pizzas parsed by language', () => {
    const lang = acceptedLanguagesList[0];

    const allPizzas = getAllPizzas(lang);

    expect(allPizzas.length).toBe(pizzas.length);

    expect(allPizzas[0]).toHaveProperty('id');
    expect(allPizzas[0]).toHaveProperty('title');
    expect(allPizzas[0]).toHaveProperty('description');
    expect(allPizzas[0]).toHaveProperty('availableExtras');
    expect(allPizzas[0]).toHaveProperty('image');
    expect(allPizzas[0]).toHaveProperty('isAvailable');
    expect(allPizzas[0]).toHaveProperty('prices');

    expect(allPizzas[0].title).toBe(pizzas[0].info[lang].title);
    expect(allPizzas[0].description).toBe(pizzas[0].info[lang].description);
  });
});
