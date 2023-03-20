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
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { Fuelreceiptnote2Component } from './fuelreceiptnote2/fuelreceiptnote2.component';
import { Bunkconfirmations2Component } from './bunkconfirmations2/bunkconfirmations2.component';
import { Fuelissuerequest2Component } from './fuelissuerequest2/fuelissuerequest2.component';
import { Vendorbank2Component } from './vendorbank2/vendorbank2.component';
import { PrintvendorbunkrequestComponent } from './printvendorbunkrequest/printvendorbunkrequest.component';
import { Fuelissue2Component } from './fuelissue2/fuelissue2.component';

const routes: Routes = [
  {
    path: 'fuelreceiptnote2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Fuel Receipt Note',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Fuelreceiptnote2Component,
  },
  {
    path: 'bunkconfirmations2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Bunk Confirmation',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Bunkconfirmations2Component,
  },
  {
    path: 'fuelissuerequest2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Fuel Issue Request',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Fuelissuerequest2Component,
  },
  {
    path: 'vendorbank2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Vendor Bunk',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Vendorbank2Component,
  },
  {path:'printvendorbunkrequest',component:PrintvendorbunkrequestComponent},
  {
    path: 'fuelissue2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Fuel Issue',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Fuelissue2Component,
  }
];
@NgModule({
  declarations: [
    Fuelreceiptnote2Component,
    Bunkconfirmations2Component,
    Fuelissuerequest2Component,
    Vendorbank2Component,
    PrintvendorbunkrequestComponent,
    Fuelissue2Component
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
export class Fuelinventory2Module { }
