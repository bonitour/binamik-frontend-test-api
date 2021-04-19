import { AcceptedLanguages, acceptedLanguagesList } from '../data/languages';

export const isLanguageSupported = (lang: string): boolean => {
  return acceptedLanguagesList.indexOf(lang as AcceptedLanguages) >= 0;
};
