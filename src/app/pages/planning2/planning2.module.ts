import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Purchaserequest2Component } from './purchaserequest2/purchaserequest2.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxPrintElementModule } from 'ngx-print-element';
import { MatButtonModule } from '@angular/material/button';
import { Printpurchaserequest2Component } from './printpurchaserequest2/printpurchaserequest2.component';
import { Goodsissuerequest2Component } from './goodsissuerequest2/goodsissuerequest2.component';
import { Printoutgatepassrgp2Component } from '../inventory2/printoutgatepassrgp2/printoutgatepassrgp2.component';
import { Printgoodsissuerequest2Component } from './printgoodsissuerequest2/printgoodsissuerequest2.component';


const routes: Routes = [
  {
    path: 'purchaserequest2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Purchase Request',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Purchaserequest2Component,
    
  },
  {
    path: 'printpurchaserequest2', component: Purchaserequest2Component,
    
  },
  {
    path: 'goodsissuerequest2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Issue Request',
      permission: {
        only: ['SUPER_ADMIN','GOODS_ISSUE_REQUEST_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: Goodsissuerequest2Component,
    
  },
  {
    path: 'printoutgatepassrgp2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Out Gate PassRGP',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: Printoutgatepassrgp2Component,
    
  },
  {
    path: 'printgoodsissuerequest2',
    component: Printgoodsissuerequest2Component,
    
  }
]
@NgModule({
  declarations: [
    Purchaserequest2Component,
    Printpurchaserequest2Component,
    Goodsissuerequest2Component,
    Printgoodsissuerequest2Component,
   
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
    MatButtonModule
  ]
})
export class Planning2Module { }
