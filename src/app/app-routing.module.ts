import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      // { path: '', redirectTo: '/companylogin', pathMatch: 'full' },
      {
        path: 'ui',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'maindashboard',
        loadChildren: () =>
          import('./pages/project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'GamsDashboard',
        loadChildren: () =>
          import('./pages/gams-dashboard/gams-dashboard.module').then((m) => m.GamsDashboardModule),
      },
      {
        path: 'projectdashboard',
        loadChildren: () =>
          import('./pages/projectdashboard/projectdashboard.module').then((m) => m.ProjectdashboardModule),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./pages/tickets/tickets.module').then((m) => m.TicketsModule),
      },
      {
        path: 'material',
        loadChildren: () =>
          import('./pages/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
      },
      {
        path: 'inventory2',
        loadChildren: () =>
          import('./pages/inventory2/inventory2.module').then(
            (m) => m.Inventory2Module
          ),
      },
      {
        path: 'pending-signatures',
        loadChildren: () =>
          import('./pages/pending-signatures/pending-signatures.module').then(
            (m) => m.PendingSignaturesModule
          ),
      },
      {
        path: 'cp2',
        loadChildren: () =>
          import('./pages/cp2/cp2.module').then(
            (m) => m.Cp2Module
          ),
      },
      {
        path: 'gss2',
        loadChildren: () =>
          import('./pages/gss2/gss2.module').then(
            (m) => m.Gss2Module
          ),
      },
      {
        path: 'reports2',
        loadChildren: () =>
          import('./pages/reports2/reports2.module').then(
            (m) => m.Reports2Module
          ),
      },
      {
        path: 'fuelinventory2',
        loadChildren: () =>
          import('./pages/fuelinventory2/fuelinventory2.module').then(
            (m) => m.Fuelinventory2Module
          ),
      },
      {
        path: 'fuel-inventory',
        loadChildren: () =>
          import('./pages/fuel-inventory/fuel-inventory.module').then(
            (m) => m.FuelInventoryModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./pages/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'planning',
        loadChildren: () =>
          import('./pages/planning/planning.module').then(
            (m) => m.PlanningModule
          ),
      },
      {
        path: 'planning2',
        loadChildren: () =>
          import('./pages/planning2/planning2.module').then(
            (m) => m.Planning2Module
          ),
      },
      {
        path: 'qsd',
        loadChildren: () =>
          import('./pages/qsd/qsd.module').then(
            (m) => m.QsdModule
          ),
      },
      {
        path: 'gss',
        loadChildren: () =>
          import('./pages/gss/gss.module').then(
            (m) => m.GssModule
          ),
      },
      {
        path: 'cp',
        loadChildren: () =>
          import('./pages/po-upload/po-upload.module').then(
            (m) => m.PoUploadModule
          ),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./pages/gallery/gallery.module').then((m) => m.GalleryModule),
      },
      {
        path: 'issuelog',
        loadChildren: () =>
          import('./pages/issue-log/issue-log.module').then(
            (m) => m.IssueLogModule
          ),
      },
      {
        path: 'userprofiles',
        loadChildren: () =>
          import('./pages/userprofiles/userprofiles.module').then((m) => m.UserprofilesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'menus',
        loadChildren: () =>
          import('./pages/menus/menus.module').then((m) => m.MenusModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ), 
      },
      {
        path: 'emails',
        loadChildren: () =>
          import('./pages/emails/emails.module').then((m) => m.EmailsModule),
      },
      {
        path: 'projectwbs',
        loadChildren: () =>
          import('./pages/user-project-wbs/user-project-wbs.module').then(
            (m) => m.UserProjectWbsModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/ui/reload',
  },
];
