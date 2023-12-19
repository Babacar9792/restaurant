import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import {MatListModule} from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashbordComponent,
    
    
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatListModule,
    SharedModule
  ],
  exports : [
    DashbordComponent,
    MatListModule,
   
  ]
})
export class CoreModule { }
