import { NextApiRequest, NextApiResponse } from 'next';

import ensureLanguageIsSupported from '../../../../middlewares/ensureLanguageIsSupported';
import ensureMethodIsValid from '../../../../middlewares/ensureMethodIsValid';
import errorHandler from '../../../../middlewares/errorHandler';

import { GetSinglePizzaUseCase } from '../../../../useCases/GetSinglePizzaUseCase';

const getSinglePizza = new GetSinglePizzaUseCase();

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query;

  try {
    await ensureMethodIsValid(req, ['GET']);
    const reqLanguage = await ensureLanguageIsSupported(req);

    const pizza = getSinglePizza.execute({ id: String(id), lang: reqLanguage });

    res.statusCode = 200;
    return res.json(pizza);
  } catch (err) {
    return errorHandler(err, res);
  }
};
