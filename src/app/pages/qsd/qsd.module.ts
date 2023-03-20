import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QsdverificationComponent } from './qsdverification/qsdverification.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserRolesAuthGuard } from 'src/app/auth/user-roles-auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPrintElementModule } from "ngx-print-element";
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { QsdservicesComponent } from './qsdservices/qsdservices.component';
import { MatButtonModule } from '@angular/material/button';
import { SiterecomendationsheetComponent } from './siterecomendationsheet/siterecomendationsheet.component';
import { PrintsitesheetComponent } from './printsitesheet/printsitesheet.component';
import { ModelinvoiceComponent } from './modelinvoice/modelinvoice.component';
import { PrintqsdservicesComponent } from './printqsdservices/printqsdservices.component';
import { PrintinvoiceComponent } from './printinvoice/printinvoice.component';
// import { PrintinvoiceComponent } from './printinvoice/printinvoice.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "QSD Supply",
      permission: {
        only: ["SUPER_ADMIN", "QSD_SUPPLY"],
        redirectTo: "/ui/403",
      },
    },
    component: QsdverificationComponent,
  },
  {
    path: 'qsdservices',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "QSD Services",
      permission: {
        only: ["SUPER_ADMIN", "QSD_SERVICES"],
        redirectTo: "/ui/403",
      },
    },
    component: QsdservicesComponent
  },
  { path: 'printqsdservices', component: PrintqsdservicesComponent },
  {
    path: 'siterecomsheet',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: "Site Recommendation Sheet",
      permission: {
        only: ["SUPER_ADMIN", "SITE_RECOMMENDATION"],
        redirectTo: "/ui/403",
      },
    },
    component: SiterecomendationsheetComponent
  },
  { path: 'printsitesheet', component: PrintsitesheetComponent },
  { path: 'invoice', component: ModelinvoiceComponent },
  { path: 'printinv', component: PrintinvoiceComponent }
]


@NgModule({
  declarations: [
    QsdverificationComponent,
    QsdservicesComponent,
    SiterecomendationsheetComponent,
    PrintsitesheetComponent,
    ModelinvoiceComponent,
    PrintqsdservicesComponent,
    PrintinvoiceComponent
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
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintElementModule,
    MatRadioModule,
    MatButtonModule
  ]
})
export class QsdModule { }
