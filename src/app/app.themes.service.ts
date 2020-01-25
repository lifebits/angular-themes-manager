import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private sourceMainTheme: BehaviorSubject<string> = new BehaviorSubject('theme-default');
  private sourceIsDarkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  theme$: Observable<[string, boolean]> = combineLatest(this.sourceMainTheme, this.sourceIsDarkMode);

  private _renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  private head?: HTMLElement = document.head;
  private themeLinks: HTMLElement[] = [];

  static getCssFileName([ mainTheme, darkMode ]): string {
    const cssExt = '.css';
    return darkMode ? mainTheme + '-dark' + cssExt : mainTheme + cssExt;
  }

  constructor(
    private rendererFactory: RendererFactory2){
  }

  setMainTheme(themeName: string): void {
    this.sourceMainTheme.next(themeName);
    this.clearUnusedTheme();
  }

  getActiveThemes(): Observable<[ string, string ]> {
    return this.theme$.pipe(
      map(([ mainTheme, darkMode ]) => [ mainTheme, (darkMode) ? 'isDark' : 'noDark' ])
    );
  }

  loadCssFile(filename: string): Promise<void> {
    return new Promise(resolve => {
      const linkEl: HTMLElement = this._renderer.createElement('link');
      this._renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this._renderer.setAttribute(linkEl, 'type', 'text/css');
      this._renderer.setAttribute(linkEl, 'href', filename);
      this._renderer.setAttribute(linkEl, 'onload', 'loadCss()');
      this._renderer.appendChild(this.head, linkEl);
      this.themeLinks = [ ...this.themeLinks, linkEl ];
    })
  }

  private clearUnusedTheme(): void {
    if (this.themeLinks.length === 2) {
      this._renderer.removeChild(this.head, this.themeLinks.shift());
    }
  }

}
