import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AvailableLang } from '../available-lang.models';
import { Location } from '@angular/common';
import { LANG, SUPPORTED_LANGS } from '../config/i18n.config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly _langKey = 'lang';
  private readonly _currentLang$ = new BehaviorSubject<AvailableLang>(this.loadLang())

  readonly currentLang$ = this._currentLang$.asObservable();
  readonly languages = SUPPORTED_LANGS;

  constructor(
    private readonly translate: TranslateService,
    private readonly location: Location  
  ) { }

  use(lang: AvailableLang) {
    this.translate.use(lang);
    this.saveToStorage(lang);
    this.replaceQueryLang(lang);
    this._currentLang$.next(lang);
  }

  private loadLang() {
    const path = this.location.path();
    const langFromQuery = new URLSearchParams(path).get(this._langKey) as AvailableLang;
    if (!langFromQuery) {
      return this.loadFromLocalStorage()
    }
    this.translate.use(langFromQuery);
    return langFromQuery;
  }

  private loadFromLocalStorage() {
      const saved = localStorage.getItem(this._langKey) as AvailableLang;
      const langFromLocalStorage = saved ?? LANG;
      this.translate.use(langFromLocalStorage);
      return langFromLocalStorage;
  }

  private replaceQueryLang(lang: AvailableLang) {
    this.location.replaceState('', `${this._langKey}=${lang}`);
  }

  private saveToStorage(lang: AvailableLang) {
    localStorage.setItem(this._langKey, lang);
  }
}
