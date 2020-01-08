import { Component, OnInit } from '@angular/core';

import { ThemesService } from '../app.themes.service';

@Component({
  selector: 'app-simply',
  templateUrl: './simply.component.html',
  styleUrls: ['./simply.component.scss']
})
export class SimplyComponent implements OnInit {

  mainThemes$ = this.themesManager.getActiveThemes();

  constructor(
    private themesManager: ThemesService) {
  }

  ngOnInit() {}

}
