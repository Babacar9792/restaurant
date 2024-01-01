import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatExpansionModule,
    SharedModule
  ]
})
export class MenuModule { }
