import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { UserRolesAuthGuard } from "src/app/auth/user-roles-auth.guard";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedMaterialModule } from "src/app/shared/material/shared-material-module";
import { GateinwardComponent } from "./gateinward/gateinward.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { GateoutwardComponent } from './gateoutward/gateoutward.component';
import { GateOutwardGIComponent } from "./gate-outward-gi/gate-outward-gi.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgxPrintElementModule } from "ngx-print-element";
import { MatButtonModule } from "@angular/material/button";
import { GateOutwardRgpComponent } from "./gate-outward-rgp/gate-outward-rgp.component";
import { GateOutwardNrgp1Component } from "./gate-outward-nrgp1/gate-outward-nrgp1.component";
// import { GateOutwardNrgpComponent } from "./gate-outward-nrgp/gate-outward-nrgp.component";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
const routes: Routes = [
  {
    path: 'gate_inward',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Inward',
      permission: {
        only: ['SUPER_ADMIN', 'GATE_INWARD'],
        redirectTo: '/ui/403',
      },
    },
    component: GateinwardComponent,
    
  },
  {
    path: 'gate_outward',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward',
      permission: {
        only: ['SUPER_ADMIN', 'GATE_OUTWARD'],
        redirectTo: '/ui/403',
      },
    },
    component: GateoutwardComponent,
    
  },
  {
    path: 'gate-outward-gi',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward Gi',
      permission: {
        only: ['SUPER_ADMIN','GATE_OUTWARD_GI'],
        redirectTo: '/ui/403',
      },
    },
    component:GateOutwardGIComponent,
    
  },

  {
    path: 'gate-outward-rgp',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward RGP',
      permission: {
        only: ['SUPER_ADMIN','GATE_OUTWARD_RGP'],
        redirectTo: '/ui/403',
      },
    },
    component:GateOutwardRgpComponent,
    
  },
  {
    path:'gate-outward-nrgp1',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Gate Outward RGP',
      permission: {
        only: ['SUPER_ADMIN','GATE_OUTWARD_NRGP'],
        redirectTo: '/ui/403',
      },
    },
    component:GateOutwardNrgp1Component
  }
]

@NgModule({
  declarations: [
    GateinwardComponent,
    GateoutwardComponent,
    GateOutwardRgpComponent,
    GateOutwardNrgp1Component,
    GateOutwardGIComponent
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
    // NgxPrintElementModule,
    ZXingScannerModule
  ]
})
export class GssModule { }
