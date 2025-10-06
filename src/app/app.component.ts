import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AltTextPipe } from './pipes/alt-text.pipe';
import { RepoUrlPipe } from './pipes/repo-url.pipe';
import { SrcUrlPipe } from './pipes/src-url.pipe';
import { DeployUrlDirective } from './directives/deploy-url.directive';
import { LanguageService } from './services/language.service';
import { AvailableLang } from './available-lang.models';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslatePipe, DeployUrlDirective, RepoUrlPipe, SrcUrlPipe, AltTextPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly languageService = inject(LanguageService);
  private readonly translate = inject(TranslateService)
  private readonly document = inject(DOCUMENT);

  private readonly destroy$ = new Subject<void>();
  readonly currentLang$ = this.languageService.currentLang$;
  readonly languages = this.languageService.languages;

  onLangChange(ev: Event) {
    const target = ev.target as HTMLSelectElement;
    const value = target.value as AvailableLang;
    this.languageService.use(value)
  }

  ngOnInit(): void {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () =>
          this.document.title = this.translate.instant('app.title')
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get age() {
    const bornDateTime = new Date('2000-10-17').getTime();
    const now = Date.now()
    const yearInMs = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor((now - bornDateTime) / yearInMs);
  }
}
