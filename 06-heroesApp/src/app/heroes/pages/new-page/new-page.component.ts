import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

import { MatDividerModule } from "@angular/material/divider"
import { MatCardModule, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule, MatOption } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-new-page',
  imports: [
    MatDividerModule,
    MatCardModule,
    MatCardContent,
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatOption,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    NgFor
  ],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {
  public publishers = [
    { id: 'DC Comics', desc: 'Dc - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];
}
