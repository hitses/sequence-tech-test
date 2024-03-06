import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { defaultLanguage, languages } from '@config/languages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  translate = inject(TranslateService);

  languages = signal<string[]>(languages);
  defaultLanguage = signal<string>(defaultLanguage);
  translation = signal(
    this.translate.getBrowserLang() || this.defaultLanguage()
  );

  ngOnInit(): void {
    this.translate.addLangs(this.languages());
    this.translate.use(this.translation());
  }
}
