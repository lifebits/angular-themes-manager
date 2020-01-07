import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

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

    console.log('HEAD', this.head);
  }

  setMainTheme(themeName: string): void {
    this.sourceMainTheme.next(themeName);
    if (this.themeLinks.length === 2) {
      this._renderer.removeChild(this.head, this.themeLinks.shift());
    }
  }

  loadCssFile(filename: string): Promise<void> {
    return new Promise(resolve => {
      const linkEl: HTMLElement = this._renderer.createElement('link');
      this._renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this._renderer.setAttribute(linkEl, 'type', 'text/css');
      this._renderer.setAttribute(linkEl, 'href', filename);
      this._renderer.setProperty(linkEl, 'onload', resolve);
      this._renderer.appendChild(this.head, linkEl);
      this.themeLinks = [ ...this.themeLinks, linkEl ];
    })
  }

}
