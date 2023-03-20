import { AuthService } from './auth.service';
import { GlobalService } from './../services/global.service';
import { LoaderService } from './../shared/loader/loader.service';
import { AlertCallsService } from './alert-calls.service';

import { Router } from '@angular/router';

import {
  BehaviorSubject,
  Observable,
  throwError as observableThrowError,
} from 'rxjs';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('null');
  appID: string | null;
  public domain =
  location.protocol +
  '//' +
  location.hostname +
  (location.port ? ':' + location.port : '');
  constructor(
    private injector: Injector,
    public loader: LoaderService,
    public router: Router,
    public alertCall: AlertCallsService
  ) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const headers: any = {};

    headers["Authorization"] = token;
    //  if(localStorage.getItem("appid")!=="" && localStorage.getItem("appid") !== null){
    //    this.appID=localStorage.getItem("appid");
    //    headers["App-Id"]=this.appID
    //    }
    this.loader.show();
    return req.clone({ setHeaders: headers });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const authService = this.injector.get(AuthService);

    const innerToken = authService.currentUserToken;
    const authToken = 'Token ' + innerToken || '';
    return next.handle(this.addToken(req, authToken)).pipe(
      tap((event:HttpEvent<any>) => {
        
if (event instanceof HttpResponse) {
  this.loader.hide();
 if(event.body.status_code === 200) {
  // this.loader.hide();
  const type = req.url.split('/')[req.url.split('/').length - 1];
  if (type !== 'upload_task_images') {
    this.loader.hide();
  }
          this.loader.hide();
          // this.logoutUser()
        }  if (event.body.success === 2&&event.body.message==="Session Expired ,Please login") {
          this.loader.hide();
          this.logoutUser()
        }
      }},
      ),
      // catchError((error, event) => {
      //   this.loader.hide();
      //   this.alertCall.showWarning('Warning', error.error.message);
      //   if (error instanceof HttpErrorResponse) {
      //     switch ((error as HttpErrorResponse).status) {
      //       case 400:
      //         return this.handle400Error(error);
      //       case 401:
      //         return this.handle401Error(req, next);
      //       case 403:
      //         return this.handle401Error(req, next);
      //       case 404:
      //         return this.handle404Error(error);
      //       default:
      //         return observableThrowError(error);
      //     }
      //   } else {
      //     return observableThrowError(error);
      //   }
      // })
    );
  }

  handle400Error(error: any) {
    if (error && error.status === 400 && error.error) {
      this.alertCall.showWarning('Bad Request', error.error.message);
    }

    return observableThrowError(error);
  }

  handle404Error(error: any) {
    if (error && error.status === 404 && error.error) {
      this.alertCall.showWarning('Not Found', 'Method Not Found');
    }
    return observableThrowError(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    // Reset here so that the following requests wait until the token
    // comes back from the refreshToken call.
    return this.logoutUser();
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    // localStorage.clear();
    let url = localStorage.getItem("redirect_uri")
    window.location.href = url + '/logout';
    this.removeLocalItem('authentication');
    this.removeLocalItem('currentUser');
    this.removeLocalItem('redirect_appurl');
    this.removeLocalItem('token');
    this.removeLocalItem('user-menu-role');
    this.removeLocalItem('user-project-role');
    this.removeLocalItem('redirect_uri');
// this.removeLocalItem('token');
// localStorage.clear();

    // this.removeLocalItem('authentication');
    //     this.removeLocalItem('currentUser');
    //     this.removeLocalItem('redirect_appurl');
    //     this.removeLocalItem('token');
    //     this.removeLocalItem('user-menu-role');
    //     this.removeLocalItem('user-project-role');
    //     this.removeLocalItem('redirect_uri');
    // this.router.navigateByUrl('**');
    // return observableThrowError('');
  }
  public removeLocalItem = function (key:any) {
    localStorage.removeItem(key);
}
}
