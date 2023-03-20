import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { UserRolesAuthGuard } from './../../auth/user-roles-auth.guard';
import { AuthGuard } from './../../auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../../components/components.module';
import { SharedMaterialModule } from './../../shared/material/shared-material-module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project Dashboard',
      permission: {
        only: ['SUPER_ADMIN','PROJECT_DASHBOARD'],
        redirectTo: '/ui/403',
      },
    },
    component: ProjectdashboardComponent,
  },
]
@NgModule({
  declarations: [
    ProjectdashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    ComponentsModule,
    MomentModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    CarouselModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
  ]
})
export class ProjectdashboardModule { }
