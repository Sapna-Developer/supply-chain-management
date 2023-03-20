import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Goodsissue2Component } from './goodsissue2/goodsissue2.component';
import { Printgoodsissue2Component } from './printgoodsissue2/printgoodsissue2.component';
import { Goodreturn2Component } from './goodreturn2/goodreturn2.component';
import { Printgoodreturn2Component } from './printgoodreturn2/printgoodreturn2.component';
import { Goodsreceipt2Component } from './goodsreceipt2/goodsreceipt2.component';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material-module';
import { Printgoodsreceipt2Component } from './printgoodsreceipt2/printgoodsreceipt2.component';
import { Qualitycheck2Component } from './qualitycheck2/qualitycheck2.component';
import { Outgatepassrgp2Component } from './outgatepassrgp2/outgatepassrgp2.component';
import { Printoutgatepassrgp2Component } from './printoutgatepassrgp2/printoutgatepassrgp2.component';
import { Printoutgatepassrgp2nrgpComponent } from './printoutgatepassrgp2nrgp/printoutgatepassrgp2nrgp.component';
import { Dmr2Component } from './dmr2/dmr2.component';
import { Nrgp2Component } from './nrgp2/nrgp2.component';

const routes: Routes = [
  {
    path: 'dmr2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Daily Material Receipt',
      permission: {
        only: ['SUPER_ADMIN','DAILY_MATERIAL_RECEIPT_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: Dmr2Component,
    
  },
  {
    path: 'goodsissue2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Issue',
      permission: {
        only: ['SUPER_ADMIN','GOODS_ISSUE_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: Goodsissue2Component,
    
  },
  {path: 'printgoodsissue2',component:Printgoodsissue2Component},
  {
    path: 'goodreturn2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Goods Return',
      permission: {
        only: ['SUPER_ADMIN','GOODS_RETURN_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: Goodreturn2Component,
    
  },
{path:'printgoodreturn2',component:Printgoodreturn2Component},
{
  path: 'goodsreceipt2',
  canActivate: [AuthGuard, UserRolesAuthGuard],
  data: {
    title: 'Goods Receipt',
    permission: {
      only: ['SUPER_ADMIN','GOODS_RECEIPT_V2'],
      redirectTo: '/ui/403',
    },
  },
  component: Goodsreceipt2Component,
  
},
{path: 'printgoodsreceipt2',component:Printgoodsreceipt2Component},
{
  path: 'qualitycheck2',
  canActivate: [AuthGuard, UserRolesAuthGuard],
  data: {
    title: 'Quality Check',
    permission: {
      only: ['SUPER_ADMIN','QUALITY_CHECK_V2'],
      redirectTo: '/ui/403',
    },
  },
  component: Qualitycheck2Component,
},
{
  path: 'outgatepassrgp2',
  canActivate: [AuthGuard, UserRolesAuthGuard],
  data: {
    title: 'OutGatePass RGP',
    permission: {
      only: ['SUPER_ADMIN','OUT_GATE_PASS_RGP_V2'],
      redirectTo: '/ui/403',
    },
  },
  component: Outgatepassrgp2Component,
  
},
{path:'printoutgatepassrgp2',component:Printoutgatepassrgp2Component},
{path:'printoutgatepassrgp2nrgp',component:Printoutgatepassrgp2nrgpComponent},
{
  path:'nrgp2',
  canActivate: [AuthGuard, UserRolesAuthGuard],
  data: {
    title: 'OutGatePass NRGP',
    permission: {
      only: ['SUPER_ADMIN','OUT_GATE_PASS_NRGP_V2'],
      redirectTo: '/ui/403',
    },
  },
  component:Nrgp2Component}


]

@NgModule({
  declarations: [
    Goodsissue2Component,
    Printgoodsissue2Component,
    Goodreturn2Component,
    Printgoodreturn2Component,
    Goodsreceipt2Component,
    Printgoodsreceipt2Component,
    Qualitycheck2Component,
    Outgatepassrgp2Component,
    Printoutgatepassrgp2Component,
    Printoutgatepassrgp2nrgpComponent,
    Dmr2Component,
    Nrgp2Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    SharedMaterialModule,
    NgxPrintElementModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})

export class Inventory2Module { }
