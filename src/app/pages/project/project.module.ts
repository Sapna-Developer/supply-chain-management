import { UserRolesAuthGuard } from './../../auth/user-roles-auth.guard';
import { AuthGuard } from './../../auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './../../components/components.module';
import { SharedMaterialModule } from './../../shared/material/shared-material-module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MomentModule } from 'ngx-moment';
import { TaskImagesComponent } from './task-images/task-images.component';
import { QtyDetailsComponent } from './qty-details/qty-details.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProjectLogComponent } from './project-log/project-log.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TicketsComponent } from './tickets/tickets.component';
import { ProjectFilesComponent } from './project-files/project-files.component';
import { PdfFilesViewComponent } from './pdf-files-view/pdf-files-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ProjectFoldersComponent } from './project-folders/project-folders.component';
import { PmcFoldersComponent } from './pmc-folders/pmc-folders.component';
import { AcceptedqtyimagesComponent } from './acceptedqtyimages/acceptedqtyimages.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExternalDrawingsComponent } from './external-drawings/external-drawings.component';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project List',
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_PROJECTS'],
        redirectTo: '/ui/403',
      },
    },
    component: ProjectsComponent,
  },
  {
    path: 'details',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project Details',
      urls: [
        {
          title: 'Project Details',
        },
      ],
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_PROJECT_WBS'],
        redirectTo: '/ui/403',
      },
    },
    component: ProjectDetailsComponent,
  },
  {
    path: 'docs',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project Docs',
      urls: [
        {
          title: 'Project Details',
        },
      ],
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_PROJECT_DRAWINGS'],
        redirectTo: '/ui/403',
      },
    },

    component: ProjectFilesComponent,
  },
  {
    path: 'log',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project Log',
      urls: [
        {
          title: 'Project Details',
        },
      ],
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_PROJECT_ISSUE_LOG'],
        redirectTo: '/ui/403',
      },
    },
    component: ProjectLogComponent,
  },
  {
    path: 'tickets',
    data: {
      title: 'Projects tickets',
      urls: [
        {
          title: 'Projects tickets Details',
        },
      ],
    },
    component: TicketsComponent,
  },
  {
    path: 'folders',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project Folders',
      urls: [
        {
          title: 'Project Details',
        },
      ],
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_PROJECT_DRAWINGS'],
        redirectTo: '/ui/403',
      },
    },
    component: ProjectFoldersComponent,
  },
  {
    path: 'pmc_folders',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'Project Folders',
      urls: [
        {
          title: 'Project Details',
        },
      ],
      permission: {
        only: ['SUPER_ADMIN', 'VIEW_PMC_DRAWINGS'],
        redirectTo: '/ui/403',
      },
    },
    component: PmcFoldersComponent,
  },
  {
    path: 'externalDrawings',
    canActivate: [AuthGuard, UserRolesAuthGuard],
    data: {
      title: 'External Drawings',
      urls: [
        {
          title: 'Project Details',
        },
      ],
      permission: {
        only: ['SUPER_ADMIN','EXTERNAL_DRAWINGS'],
        redirectTo: '/ui/403',
      },
    },
    component: ExternalDrawingsComponent,
  },
];

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    TaskImagesComponent,
    QtyDetailsComponent,
    ProjectLogComponent,
    TicketsComponent,
    ProjectFilesComponent,
    PdfFilesViewComponent,
    ProjectFoldersComponent,
    PmcFoldersComponent,
    AcceptedqtyimagesComponent,
    ExternalDrawingsComponent,
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
    MatSlideToggleModule
  ],
})
export class ProjectModule {}
