import { NextApiResponse } from 'next';

import { AppError } from '../errors/AppError';

export default async (err, res: NextApiResponse): Promise<void> => {
  if (err instanceof AppError) {
    res.statusCode = err.statusCode;
    return res.json({ error: err.message });
  }

  res.statusCode = 500;
  return res.json({ error: 'Internal Server Error' });
};
