import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { ThemesService } from './app.themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular-themes-manager';

  currentTheme?: string;

  constructor(
    private themesManager: ThemesService) {
  }

  ngOnInit(): void {
    this.themesManager.theme$
      .pipe(
        tap( ([ theme, isDark ]) => this.currentTheme = theme ),
        map(([ theme, isDark ]) => ThemesService.getCssFileName([ theme, isDark ]))
      )
      .subscribe((filename) => {
      this.themesManager.loadCssFile(filename)
    });
  }

  setTheme(themeName: string) {
    this.themesManager.setMainTheme(themeName);
  }

}
