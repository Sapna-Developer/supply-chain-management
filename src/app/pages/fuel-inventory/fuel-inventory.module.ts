import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPrintElementModule } from "ngx-print-element";
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FuelIssueComponent } from './fuel-issue/fuel-issue.component';
import { VendorBunkRequestComponent } from './vendor-bunk-request/vendor-bunk-request.component';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { BunkconfirmComponent } from './bunkconfirm/bunkconfirm.component';
import { FuelissuerequestComponent } from './fuelissuerequest/fuelissuerequest.component';
import { FuereceiptnoteComponent } from './fuereceiptnote/fuereceiptnote.component';
import { PrintBunkReqComponent } from './print-bunk-req/print-bunk-req.component';
// ///////////////////////////////////////////////////



const routes: Routes = [
  { path: 'fuel-issue', component: FuelIssueComponent },
  { path: 'vendor-bunk-request', component: VendorBunkRequestComponent },
   {path:'fuelreceiptnoe',component:FuereceiptnoteComponent},
  { path: "bunk-confirmation", component: BunkconfirmComponent },
  { path: "fuel-issue-request", component: FuelissuerequestComponent },
  {path:"print-bunk-req",component:PrintBunkReqComponent}
]
@NgModule({
  declarations: [
    FuelIssueComponent,
    VendorBunkRequestComponent,
    BunkconfirmComponent,
    FuelissuerequestComponent,
    FuereceiptnoteComponent,
    PrintBunkReqComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPrintElementModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatButtonModule

  ]
})
export class FuelInventoryModule { }
