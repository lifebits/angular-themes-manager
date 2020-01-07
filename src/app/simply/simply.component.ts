import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ThemeService } from '../app.themes.manager';

@Component({
  selector: 'app-simply',
  templateUrl: './simply.component.html',
  styleUrls: ['./simply.component.scss']
})
export class SimplyComponent implements OnInit {

  mainTheme$ = this.themeManager.theme$.pipe(
    tap(value => console.log(value))
  );

  constructor(
    private themeManager: ThemeService) {
  }

  ngOnInit() {}

}
