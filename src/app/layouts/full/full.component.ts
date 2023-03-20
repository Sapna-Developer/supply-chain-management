import { AuthService } from './../../auth/auth.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, HostListener, Output, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { GreenkoUtils } from 'src/app/utils/flip.utils';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  // VersiondropdownData:any=[{menu:"Inventory", trigger:"v1Inventory"},{menu:"Reports",trigger:"v1reports"},{menu:"GSS",trigger:"v1gss"},{menu:"C&P",trigger:"v1cp"}];
  public config: PerfectScrollbarConfigInterface = {};

  userDetails: any = {};
  searchValue: any;

  showSearch = false;
  showNavbar = false;
  totalRecords: any=0;
  pageIndex: any=1;
  pageSize:any=10;

  constructor(
    public router: Router,
    public customerService: CustomerService,
    public authService: AuthService,
    public alertCall: AlertCallsService,
    public utils: GreenkoUtils
  ) {
    this.router.events.subscribe((res) => {
      if (this.router.url === '/maindashboard') {
        this.showSearch = true;
        this.searchValue = null;
      } else {
        this.showSearch = false;
        this.searchValue = null;
      }
    });
  }

  toggleNavBar(){
    this.showNavbar = !this.showNavbar;
  }

  tabStatus = 'justified';

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  activities$: any = [];

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
  };

  applications$: any = [];
  tokenValue: any;
  decodedTokenValue:any;
  companyName:any;
  tokenData:any[]=[];

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    this.defaultSidebar = this.options.sidebartype;
    this.getActivity();
    this.userDetails = this.authService.currentUserDetails;
    console.log(this.userDetails);
    this.getUserProjects();
    this.handleSidebar();
    this.searchValue = null;
    this.tokenValue = localStorage.getItem('token');
    // console.log(this.tokenValue);
    this.decodedTokenValue =JSON.parse(atob(this.tokenValue));
    // console.log(this.decodedTokenValue.data);
    this.tokenData = this.decodedTokenValue.data
    this.companyName = this.decodedTokenValue.data.company_name
    console.log(this.companyName)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: string) {
    this.handleSidebar();
  }

  handleSidebar() {
     this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 1400) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType() {
    switch (this.options.sidebartype) {
      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  getUserProjects() {
    this.customerService.getUserProjects().subscribe((resp: any) => {
      if (resp && resp.success === 1) {
        this.applications$ = resp.details;
      } else {
        this.applications$ = [];
        // this.logOut();
      }
    });
  }

  getActivity() {
    let obj = {
      lmt: this.pageSize,
      pid: this.pageIndex,
    };
    this.customerService.getProjectActivity(obj).subscribe((resp: any) => {
      if (resp.status_code === 200) {
        this.activities$ = resp.data;
        this.totalRecords=resp.count;
      }
    });
  }

  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getActivity()
  }
  logOut() {
    // this.router.navigateByUrl('**');

    const url: any = localStorage.getItem('redirect_uri');
    this.removeLocalItem('authentication');
        this.removeLocalItem('currentUser');
        this.removeLocalItem('redirect_appurl');
        this.removeLocalItem('token');
        this.removeLocalItem('user-menu-role');
        this.removeLocalItem('user-project-role');
        this.removeLocalItem('redirect_uri');
    // localStorage.clear();
    window.location.href = url+'/logout';
  }
  public removeLocalItem(key: any) {
    localStorage.removeItem(key);
  }
  openNewApplication(data: any) {
    if (data) {
      const url =
        data.app_url +
        '?code=5&response_type=' +
        localStorage.getItem('authentication') +
        '?redirect_uri=' +
        data.app_url;
      window.location.href = url;
    }
  }

  filterProjects() {
    this.utils.searchText.emit(this.searchValue);
  }

  sideMenuClick() {
    if (this.options.sidebartype === 'mini-sidebar') {
      this.showMobileMenu = !this.showMobileMenu;
    }
  }



  //routing links
// version1 -> Inventory
  dmrrouting(){
    this.router.navigate(["/inventory/dmr"]);
  }
  qualitycheckrouting(){
    this.router.navigate(["/inventory/qualitycheck"]);
  }
  goodsreceiptrouting(){
    this.router.navigate(["/inventory/goodsreceipt"]);
  }
  goodsissuerouting(){
    this.router.navigate(["/inventory/goodsissue"]);
  }
  goodsreturnrouting(){
    this.router.navigate(["/inventory/goodsreturn"]);
  }
  deliverychallanrouting(){
    this.router.navigate(["/inventory/deliverychallan"]);
  }
  outgatepassrgprouting(){
    this.router.navigate(["/inventory/outgatepassrgp1"]);
  }
  outgatepassnrgprouting(){
    this.router.navigate(["/inventory/nrgp"]);
  }



  //version1 -> Reports
  inventoryreportsrouting(){
    this.router.navigate(["/reports/ir"]);
  }
  gssreportsrouting(){
    this.router.navigate(["/reports/gss_reports"]);
  }
  transitreportsrouting(){
    this.router.navigate(["/reports/transitreports"])
  }
  //version1 -> gss
  gateinwardrouting(){
    this.router.navigate(["/gss/gate_inward"]);
  }
  gateoutwardrgprouting(){
    this.router.navigate(["/gss/gate-outward-rgp"]);
  }
  gateoutwardnrgprouting(){
    this.router.navigate(["/gss/gate-outward-nrgp1"]);
  }
  gateoutwardgirouting(){
    this.router.navigate(["/gss/gate-outward-gi"]);
  }
  //version1 -> c&p
  purchaseorderrouting(){
    this.router.navigate(["/cp/purchase_order"]);
  }
  exceluploadrouting(){
    this.router.navigate(["/cp/po-excel-upload"]);
  }

  //version2-> planing
  v2goodsissuerequestrouting(){
    this.router.navigate(["/planning2/goodsissuerequest2"]);
  }

  //version2 -> gss
  v2gateinwardrouting(){
    this.router.navigate(["/gss2/gate-inward2"]);
  }
  v2gateoutwardrgprouting(){
    this.router.navigate(["/gss2/gate-outward-rgp2"]);
  }
  v2gateoutwardnrgprouting(){
    this.router.navigate(["/gss2/gate-outward-nrgp2"]);
  }
  v2gateoutwardgirouting(){
    this.router.navigate(["/gss2/gate-outward-gi2"]);
  }

  //version2 ->reports
  v2inventoryreportsrouting(){
    this.router.navigate(["/reports2/inventoryreports2"]);
  }
  v2gssreportsrouting(){
    this.router.navigate(["/reports2/gssreports2"]);
  }

  materialmasterrouting(){
    this.router.navigate(["/material"]);
  }
  vendormasterrouting(){
    this.router.navigate(["/material/vendor"]);
  }
  contractorsrouting(){
    this.router.navigate(["/material/contractors"]);
  }
  companiesrouting(){
    this.router.navigate(["/material/companys"]);
  }
  taxlistrouting(){
    this.router.navigate(["/material/tax"]);
  }
  financialrouting(){
    this.router.navigate(["/material/financeyear"]);
  }
  servicemasterrouting(){
    this.router.navigate(["/material/servicemaster"]);
  }
  vehiclemasterrouting(){
    this.router.navigate(["/material/vehiclemaster"]);
  }
  ticketrouting(){
    this.router.navigate(["/tickets"]);
  }
  galleryrouting(){
 this.router.navigate(["/gallery"]);
  }
  userprofilerouting(){
    this.router.navigate(["/userprofiles"]);
  }
  pendingsignaturesrouting(){
    this.router.navigate(["/pending-signatures"]);
  }
  usermanagementrouting(){
    this.router.navigate(["/users"]);
  }
  userprofileswbsrouting(){
    this.router.navigate(["/projectwbs"]);
  }
  menurolesrouting(){
    this.router.navigate(["/menus"]);
  }
  settingsrouting(){
    this.router.navigate(["/settings"]);
  }
  projectsrouting(){
this.router.navigate(["/maindashboard"]);
  }
  gamdashboardrouting(){
    this.router.navigateByUrl('/GamsDashboard');
  }
  projectdashboardrouting(){
    this.router.navigateByUrl('/projectdashboard');
  }
  poreportsrouting(){
    this.router.navigateByUrl('/reports/poreports');
  }
  v1purchaserequestrouting(){
    this.router.navigateByUrl('/planning/purchaserequest');
  }
  v1workrequestrouting(){
    this.router.navigateByUrl('/planning/workrequest');
  }
  v1workorderrouting(){
    this.router.navigateByUrl('/cp/workorder');
  }
}
