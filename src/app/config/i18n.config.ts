import { provideTranslateService } from "@ngx-translate/core";
import { AvailableLang } from "../available-lang.models";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

export const FALLBACK_LANG: AvailableLang = 'en_us';
export const LANG: AvailableLang = 'fr_fr';
export const SUPPORTED_LANGS: AvailableLang[] = ['en_us', 'fr_fr'];

export const TranslateServiceProvider = provideTranslateService({
  loader: provideTranslateHttpLoader({
    prefix: 'assets/i18n/',
    suffix: '.json',
  }),
  fallbackLang: FALLBACK_LANG,
  lang: LANG,
})