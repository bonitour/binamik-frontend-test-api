import { NextApiRequest, NextApiResponse } from 'next';
import ensureMethodIsValid from '../../../../middlewares/ensureMethodIsValid';
import errorHandler from '../../../../middlewares/errorHandler';
import { PlaceOrderUseCase } from '../../../../useCases/PlaceOrderUseCase';

const placeOrder = new PlaceOrderUseCase({});

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { pizzaId, size, extras, _notes } = req.body;

  try {
    await ensureMethodIsValid(req, ['POST']);
    const order = placeOrder.execute({ pizzaId, size, extras });

    res.statusCode = 201;
    return res.json(order);
  } catch (err) {
    return errorHandler(err, res);
  }
};
