import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { CommandeComponent } from './components/commande/commande.component';
import { SharedModule } from '../shared/shared.module';
import { IntituleCommandePipe } from './pipes/intitule-commande.pipe';
import { DetailComponent } from './components/commande/detail/detail.component';
import { MonthYearDatePipe } from './pipes/month-year-date.pipe';


@NgModule({
  declarations: [
    CommandeComponent,
    IntituleCommandePipe,
    DetailComponent,
    MonthYearDatePipe
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    SharedModule
  ]
})
export class CommandeModule { }
