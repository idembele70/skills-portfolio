import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AltTextPipe } from './pipes/alt-text.pipe';
import { RepoUrlPipe } from './pipes/repo-url.pipe';
import { SrcUrlPipe } from './pipes/src-url.pipe';
import { DeployUrlDirective } from './directives/deploy-url.directive';
import { LanguageService } from './services/language.service';
import { AvailableLang } from './available-lang.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslatePipe, DeployUrlDirective, RepoUrlPipe, SrcUrlPipe, AltTextPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly languageService = inject(LanguageService);

  readonly currentLang$ = this.languageService.currentLang$;
  readonly languages = this.languageService.languages;

  onLangChange(ev: Event) {
    const target = ev.target as HTMLSelectElement;
    const value = target.value as AvailableLang;
    this.languageService.use(value)
  }

  title = 'skills-portfolio';

  get age() {
    const bornDateTime = new Date('2000-10-17').getTime();
    const now = Date.now()
    const yearInMs = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor((now - bornDateTime) / yearInMs);
  }
}
