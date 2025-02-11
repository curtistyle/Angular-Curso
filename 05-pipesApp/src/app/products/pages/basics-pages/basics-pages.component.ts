import { Component } from '@angular/core';
import { Panel } from 'primeng/panel';
import { Card } from 'primeng/card';
import { DatePipe, LowerCasePipe, registerLocaleData, TitleCasePipe, UpperCasePipe } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr);

@Component({
  selector: 'app-basics-pages',
  imports: [
    Panel,
    Card,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './basics-pages.component.html',
  styleUrl: './basics-pages.component.css'
})
export class BasicsPagesComponent {
  public nameLower: string = 'curtis';
  public nameUpper: string = 'Curtis';
  public fullName: string = 'cURtIs sTYle';

  public customDate: Date = new Date();
}
