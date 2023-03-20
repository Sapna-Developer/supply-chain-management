import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AvailablestoackComponent } from './availablestoack/availablestoack.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material-module';
import { SinglematerialstockComponent } from './singlematerialstock/singlematerialstock.component';
import { InventoryReportsComponent } from './inventory-reports/inventory-reports.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { GssreportsComponent } from './gssreports/gssreports.component';
import { PrreportsComponent } from './prreports/prreports.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PoreportsComponent } from './poreports/poreports.component';
import { TransitreportsComponent } from './transitreports/transitreports.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [

  {
    path: 'ir',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Inventory Reports',
      permission: {
        only: ['SUPER_ADMIN', 'INVENTORY_REPORTS'],
        redirectTo: '/ui/403',
      },
    },
    component: InventoryReportsComponent,
  },
  {
    path: 'gss_reports',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gss Reports',
      permission: {
        only: ['SUPER_ADMIN', 'GSS_REPORTS'],
        redirectTo: '/ui/403',
      },
    },
    component: GssreportsComponent,
  },
  {
    path: 'prreports',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'PR Reports',
      permission: {
        only: ['SUPER_ADMIN', 'PR_REPORTS'],
        redirectTo: '/ui/403',
      },
    },
    component: PrreportsComponent
  },
  {
    path: 'poreports',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'PO Reports',
      permission: {
        only: ['SUPER_ADMIN', 'PO_REPORTS'],
        redirectTo: '/ui/403',
      },
    },
    component: PoreportsComponent
  },
 
  {
    path: 'transitreports',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Transit Reports',
      permission: {
        only: ['SUPER_ADMIN'],
        redirectTo: '/ui/403',
      },
    },
    component: TransitreportsComponent
  },
];

@NgModule({
  declarations: [
    AvailablestoackComponent,
    SinglematerialstockComponent,
    InventoryReportsComponent,
    GssreportsComponent,
    PrreportsComponent,
    PoreportsComponent,
    TransitreportsComponent
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
    MatTabsModule,
    MatCheckboxModule, 
  ]
})
export class ReportsModule { }
