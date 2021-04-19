import { NextApiRequest, NextApiResponse } from 'next';

import ensureLanguageIsSupported from '../../../../middlewares/ensureLanguageIsSupported';
import ensureMethodIsValid from '../../../../middlewares/ensureMethodIsValid';
import errorHandler from '../../../../middlewares/errorHandler';
import { ListAllPizzasUseCase } from '../../../../useCases/ListAllPizzasUseCase';

const listAllPizzas = new ListAllPizzasUseCase();

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    await ensureMethodIsValid(req, ['GET']);
    const reqLanguage = await ensureLanguageIsSupported(req);

    const pizzas = listAllPizzas.execute({ lang: reqLanguage });

    res.statusCode = 200;
    return res.json(pizzas);
  } catch (err) {
    return errorHandler(err, res);
  }
};
