import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { ThemeService } from './app.themes.manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'angular-themes-manager';

  currentTheme?: string;

  constructor(
    private themeManager: ThemeService) {
  }

  ngOnInit(): void {
    this.themeManager.theme$
      .pipe(
        tap( ([ theme, isDark ]) => this.currentTheme = theme ),
        map(([ theme, isDark ]) => ThemeService.getCssFileName([ theme, isDark ]))
      )
      .subscribe((filename) => {
      console.log(filename);
      this.themeManager.loadCssFile(filename)
    });
  }

  setTheme(themeName: string) {
    this.themeManager.setMainTheme(themeName);
  }

}
