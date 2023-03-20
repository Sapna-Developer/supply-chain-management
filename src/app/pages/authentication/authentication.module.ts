import { SharedMaterialModule } from './../../shared/material/shared-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReloadComponent } from './reload/reload.component';
import { LogoutComponent } from './logout/logout.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';

const routes: Routes = [
  {
    path: 'reload',
    component: ReloadComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '403',
    component: NoPermissionComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    ReloadComponent,
    LogoutComponent,
    NoPermissionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
  ],
})
export class AuthenticationModule {}
