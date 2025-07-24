'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export function I18nProvider({ children, lang }) {
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
