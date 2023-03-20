import { AuthService } from './../../auth/auth.service';
import { EventsService } from './../../services/angular-events.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
})
export class VerticalSidebarComponent {
  menuHide = false;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  path = '';
  userDetails: any;

  @Output()
  menuClick = new EventEmitter<any>();

  constructor(
    private menuServise: VerticalSidebarService,
    private router: Router,
    public events: EventsService,
    public authService: AuthService
  ) {
    this.menuServise.items.subscribe((menuItems) => {
      this.sidebarnavItems = menuItems;
      console.log(this.sidebarnavItems);

      // Active menu
      this.sidebarnavItems.filter((m) =>
        m.submenu.filter((s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        })
      );
      this.addExpandClass(this.path);
    });

    this.userDetails = this.authService.currentUserDetails;
  }

  addExpandClass(element: any) {
    this.menuClick.emit();
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    this.menuClick.emit();
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getSideBarAction(element: any) {
    if (element) {
      this.events.publish('activity', element);
    }
  }

  permissionCheck(permissionType: any) {
    return this.authService.checkUserPermission(permissionType);
  }
  permissionCheckCopany(permissionCheckCopany:any) {
    return this.authService.checkUserPermissionCompany(permissionCheckCopany);
  }
}
