import th from './th.json';
import en from './en.json';

export type Locale = 'th' | 'en';

export const dictionaries = {
  th,
  en,
};

export function getDictionary(lang: Locale) {
  return dictionaries[lang] || dictionaries.th;
}
