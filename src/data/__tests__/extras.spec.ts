import { extras, getExtrasByName } from '../extras';
import { acceptedLanguagesList } from '../languages';

describe('Extras Mock Data', () => {
  it('should have only unique ids', () => {
    const extrasIds = extras.map(ext => ext.id);

    const uniqueExtrasIds = [...new Set(extrasIds)];

    expect(extrasIds.length).toBe(uniqueExtrasIds.length);
  });

  it('should have ids following the template "extra_xx"', () => {
    const extrasIds = extras.map(ext => ext.id);

    expect(extrasIds.every(id => id.startsWith('extra_'))).toBe(true);
  });

  it('should have only unique names', () => {
    const extrasNames = extras.map(ext => ext.name);

    const uniqueExtrasNames = [...new Set(extrasNames)];

    expect(extrasNames.length).toBe(uniqueExtrasNames.length);
  });

  it('should have at least 4 extras in list', () => {
    expect(extras.length).toBeGreaterThanOrEqual(4);
  });

  it('should have only prices between 100 cents and 999 cents', () => {
    const extrasPrices = extras.map(ext => ext.price);

    expect(extrasPrices.every(price => price > 99 && price < 1000)).toBe(true);
  });

  it('should only have integer prices', () => {
    const extrasPrices = extras.map(ext => ext.price);

    expect(extrasPrices.every(price => Number.isInteger(price))).toBe(true);
  });

  it('should have labels in every api available language', () => {
    const allLanguagesHaveAllLabels = extras.every(extra => {
      return acceptedLanguagesList.every(lang => {
        if (
          extra.label[lang] &&
          extra.label[lang].trim().toLocaleLowerCase() !== 'todo'
        ) {
          return true;
        }

        console.error(`Extra: ${extra.id} does not have label in "${lang}"`);
        return false;
      });
    });

    expect(allLanguagesHaveAllLabels).toBe(true);
  });

  it('should be able to list extras by name', () => {
    const extra1 = extras[0];
    const extra2 = extras[extras.length - 1];

    const extrasList = getExtrasByName(
      [extra1.name, extra2.name],
      acceptedLanguagesList[0],
    );

    expect(extrasList.length).toBe(2);
    expect(extrasList[0]?.id).toBe(extra1.id);
    expect(extrasList[1]?.id).toBe(extra2.id);
  });

  it('should be able to list extras parsed by language', () => {
    const extra1 = extras[0];
    const extra2 = extras[extras.length - 1];

    const lang = acceptedLanguagesList[0];

    const extrasList = getExtrasByName([extra1.name, extra2.name], lang);

    expect(extrasList.length).toBe(2);
    expect(extrasList[0]?.label).toBe(extra1.label[lang]);
    expect(extrasList[1]?.label).toBe(extra2.label[lang]);
  });
});
