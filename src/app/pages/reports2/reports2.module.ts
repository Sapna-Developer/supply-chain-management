import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";
import { NgxPrintElementModule } from "ngx-print-element";
import { AuthGuard } from "src/app/auth/auth.guard";
import { UserRolesAuthGuard } from "src/app/auth/user-roles-auth.guard";
import { Inventoryreports2Component } from "./inventoryreports2/inventoryreports2.component";
import { SharedMaterialModule } from 'src/app/shared/material/shared-material-module';
import { Fuelreports2Component } from './fuelreports2/fuelreports2.component';
import { Gssreports2Component } from './gssreports2/gssreports2.component';

const routes: Routes = [
  {
    path: 'inventoryreports2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Inventory Reports',
      permission: {
        only: ['SUPER_ADMIN','INVENTORY_REPORTS_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: Inventoryreports2Component,
    
  },
  {
    path: 'fuelreports2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Fuel Reports',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Fuelreports2Component,
    
  },
  {
    path: 'gssreports2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'GSS Reports',
      permission: {
        only: ['SUPER_ADMIN','GSS_REPORTS_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: Gssreports2Component,
    
  },
]

@NgModule({
  declarations: [
    Inventoryreports2Component,
    Fuelreports2Component,
    Gssreports2Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintElementModule,
    MatButtonModule,
    SharedMaterialModule
  ]
})
export class Reports2Module { }
