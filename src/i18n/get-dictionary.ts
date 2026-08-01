import 'server-only';
import type { Locale } from '@/types';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ta: () => import('./dictionaries/ta.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};
