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
import { ListComponent } from './list/list.component';
import { DeptComponent } from './components/dept/dept.component';
import { RolesComponent } from './components/roles/roles.component';
import { SubRolesComponent } from './components/sub-roles/sub-roles.component';
import { MenusComponent } from './components/menus/menus.component';
import { UsercredentialsComponent } from './components/usercredentials/usercredentials.component';
import { UserCompaniesComponent } from './components/user-companies/user-companies.component';
import { SignaturelevelsComponent } from './components/signaturelevels/signaturelevels.component';
import { UserdashbordsComponent } from './components/userdashbords/userdashbords.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Settings List',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_SETTINGS'],
        redirectTo: '/ui/403',
      },
    },
    component: ListComponent,
  },
];

@NgModule({
  declarations: [
    ListComponent,
    DeptComponent,
    RolesComponent,
    SubRolesComponent,
    MenusComponent,
    UsercredentialsComponent,
    UserCompaniesComponent,
    SignaturelevelsComponent,
    UserdashbordsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    ComponentsModule,
    MomentModule,
    NgbModule,
  ],
})
export class SettingsModule {}
