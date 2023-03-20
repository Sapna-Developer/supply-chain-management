import { UserRolesAuthGuard } from './../../auth/user-roles-auth.guard';
import { AuthGuard } from './../../auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { ComponentsModule } from './../../components/components.module';
import { SharedMaterialModule } from './../../shared/material/shared-material-module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialLayoutComponent } from './material-layout/material-layout.component';
import { IndentsComponent } from './components/indents/indents.component';
import { VendorComponent } from 'src/app/material/vendor/vendor.component';
import { ContractorsComponent } from 'src/app/material/contractors/contractors.component';
import { CompanysComponent } from 'src/app/material/companys/companys.component';
import { TaxComponent } from 'src/app/material/tax/tax.component';
import { FinancialyearComponent } from 'src/app/material/financialyear/financialyear.component';
import { ServicemasterComponent } from './servicemaster/servicemaster.component';
import { VehiclemasterComponent } from './vehiclemaster/vehiclemaster.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Material Layout',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_MATERIAL'],
        redirectTo: '/ui/403',
      },
    },
    component: MaterialLayoutComponent,
  },
  {
    path: 'vendor',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Material',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_VENDORS'],
        redirectTo: '/ui/403',
      },
    },
    component: VendorComponent
  },
  {
    path: 'contractors',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Contractors',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_CONTRACTORS'],
        redirectTo: '/ui/403',
      },
    },
    component: ContractorsComponent
  },
  {
    path: 'companys',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Companys',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_COMPANIES'],
        redirectTo: '/ui/403',
      },
    },
    component: CompanysComponent
  },
  {
    path: 'tax',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Tax List',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_MATERIAL'],
        redirectTo: '/ui/403',
      },
    },
    component: TaxComponent
  },
  {
    path: 'financeyear',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Financial Year',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_FINANCIAL_YEAR'],
        redirectTo: '/ui/403',
      },
    },
    component: FinancialyearComponent
  },
  {
    path: 'servicemaster',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Service Master',
      permission: {
        only: ['SUPER_ADMIN', 'SERVICE_MASTER'],
        redirectTo: '/ui/403',
      },
    },
    component: ServicemasterComponent
  },
  {
    path: 'vehiclemaster',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Vehicle Master',
      permission: {
        only: ['SUPER_ADMIN', 'VEHICLE_MASTER'],
        redirectTo: '/ui/403',
      },
    },
    component: VehiclemasterComponent
  }

];

@NgModule({
  declarations: [MaterialLayoutComponent, IndentsComponent, ServicemasterComponent, VehiclemasterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    ComponentsModule,
    MomentModule,
    NgbModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class MaterialModule { }
