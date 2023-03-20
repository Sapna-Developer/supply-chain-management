import { UserRolesAuthGuard } from './auth/user-roles-auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { GlobalService } from './services/global.service';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { GreenkoUtils } from './utils/flip.utils';
import { NgxMaskModule } from 'ngx-mask';
import { VerticalSidebarComponent } from './shared/vertical-sidebar/vertical-sidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServicesModule } from './services/services.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20,
};

import { ToastrModule } from 'ngx-toastr';
import { SharedMaterialModule } from './shared/material/shared-material-module';
import { VendorComponent } from './material/vendor/vendor.component';
import { ContractorsComponent } from './material/contractors/contractors.component';
import { CompanysComponent } from './material/companys/companys.component';
import { TaxComponent } from './material/tax/tax.component';
import { FinancialyearComponent } from './material/financialyear/financialyear.component';
import { InventoryModule } from './inventory/inventory.module';
import { CompanyloginComponent } from './companylogin/companylogin.component';





@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    BreadcrumbComponent,
    VerticalSidebarComponent,
    LoaderComponent,
    VendorComponent,
    ContractorsComponent,
    CompanysComponent,
    TaxComponent,
    FinancialyearComponent,
    CompanyloginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      progressBar: true,
    }),
    SharedMaterialModule,
    InventoryModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    ServicesModule,
    GreenkoUtils,
    LoaderService,
    AuthService,
    GlobalService,
    AuthGuard,
    UserRolesAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
