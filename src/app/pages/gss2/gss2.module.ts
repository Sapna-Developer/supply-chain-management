import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material-module';
import { NgxPrintElementModule } from 'ngx-print-element';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { GateInward2Component } from './gate-inward2/gate-inward2.component';
import { GateOutwardGI2Component } from './gate-outward-gi2/gate-outward-gi2.component';
import { GateOutwardNRGP2Component } from './gate-outward-nrgp2/gate-outward-nrgp2.component';
import { GateOutwardRGP2Component } from './gate-outward-rgp2/gate-outward-rgp2.component';

const routes: Routes = [
  {
    path: 'gate-inward2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Inward',
      permission: {
        only: ['SUPER_ADMIN','GATE_INWARD_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: GateInward2Component,
    
  },
  {
    path: 'gate-outward-gi2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward',
      permission: {
        only: ['SUPER_ADMIN','GATE_OUTWARD_GI_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: GateOutwardGI2Component,
    
  },
  {
    path: 'gate-outward-nrgp2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward',
      permission: {
        only: ['SUPER_ADMIN','GATE_OUTWARD_NRGP_V2'],
        redirectTo: '/ui/403',
      },
    },
    component:GateOutwardNRGP2Component,
    
  },
  {
    path: 'gate-outward-rgp2',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward',
      permission: {
        only: ['SUPER_ADMIN','GATE_OUTWARD_RGP_V2'],
        redirectTo: '/ui/403',
      },
    },
    component: GateOutwardRGP2Component,
    
  },
]


@NgModule({
  declarations: [
    GateInward2Component,
    GateOutwardGI2Component,
    GateOutwardNRGP2Component,
    GateOutwardRGP2Component
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
export class Gss2Module { }
