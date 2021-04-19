import { NextApiRequest } from 'next';

import { defaultLanguage } from '../data/languages';
import { AppError } from '../errors/AppError';
import { isLanguageSupported } from '../utils/isLanguageSupported';

export default async (req: NextApiRequest): Promise<string> => {
  const { lang = defaultLanguage } = req.query;
  const safeLang = String(lang);

  return new Promise<string>((resolve, rejects) => {
    if (!isLanguageSupported(safeLang)) {
      rejects(new AppError('Language not supported', 400));
    }

    return resolve(safeLang);
  });
};
