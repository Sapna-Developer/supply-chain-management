import { GlobalService } from './global.service';

import { SharedMaterialModule } from './../shared/material/shared-material-module';
import { EventsService } from './angular-events.service';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { AlertCallsService } from './../auth/alert-calls.service';
import { CustomerService } from './customer.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [MatSnackBarModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
    CustomerService,
    AlertCallsService,
    EventsService,
    SharedMaterialModule,
    GlobalService,
  ],
})
export class ServicesModule {}
