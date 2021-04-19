import { NextApiRequest } from 'next';

import { AppError } from '../errors/AppError';

export default async (
  req: NextApiRequest,
  validMethods: string[],
): Promise<void> => {
  const { method } = req;

  return new Promise<void>((resolve, rejects) => {
    if (validMethods.indexOf(method) === -1) {
      rejects(new AppError('Method not allowed', 405));
    }

    return resolve();
  });
};
