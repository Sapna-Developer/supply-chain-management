import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export class DynamicFlatNode {
  constructor(
    public item: any,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) { }
}

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  opts = [];
  constructor(private http: HttpClient) { }

  userLogin(params: any) {
    return this.http
      .get(environment.url + "/auth/login", params)
      .pipe(catchError(this.handleError));
  }

  getAllProjects() {
    return this.http
      .get(environment.url + "/project_list")
      .pipe(catchError(this.handleError));
  }

  getAllFilterProjects() {
    return this.http
      .get(environment.url + "/project_list")
      .pipe(tap((data: any) => (this.opts = data)));
  }

  getProjectDetails(id: any) {
    return this.http
      .get(environment.url + "/project_wbs?project_id=" + id)
      .pipe(catchError(this.handleError));
  }

  getProjectActivityDetails(id: any, activityId: any) {
    return this.http
      .get(
        environment.url +
        "/activities?project_id=" +
        id +
        "&wbs_id=" +
        activityId
      )
      .pipe(catchError(this.handleError));
  }

  uploadFiles(params: any) {
    return this.http
      .post(environment.url + "/upload_task_images", params)
      .pipe(catchError(this.handleError));
  }

  updateTaskActualQtyUpdate(params: any) {
    return this.http
      .post(environment.url + "/task_actual_qty_update", params)
      .pipe(catchError(this.handleError));
  }

  updateTaskActualQtyUpdateNew(params: any) {
    return this.http
      .post(environment.url + "/task_actual_qty_update_new", params)
      .pipe(catchError(this.handleError));
  }
  updateTaskAcceptedQtyUpdate(params: any) {
    return this.http
      .post(environment.url + "/task_accepted_qty_update", params)
      .pipe(catchError(this.handleError));
  }

  getTaskImages(id: any) {
    return this.http
      .get(environment.url + "/get_task_images?task_act_qty_id=" + id)
      .pipe(catchError(this.handleError));
  }

  getProjectActivity(params:any) {
    return this.http
      .get(environment.url + "/get_activity_log?",{ params })
      .pipe(catchError(this.handleError));
  }

  getUserProjects() {
    return this.http
      .get(environment.sso_api + "/application_list?app_name=GEPS")
      .pipe(catchError(this.handleError));
  }

  getTicketDepts() {
    return this.http
      .get(environment.url + "/get_ticket_dept_codes")
      .pipe(catchError(this.handleError));
  }

  getTicketSecurity() {
    return this.http
      .get(environment.url + "/get_ticket_severity")
      .pipe(catchError(this.handleError));
  }

  createTicket(params: any) {
    return this.http
      .post(environment.url + "/create_ticket", params)
      .pipe(catchError(this.handleError));
  }

  getTickets(page: any, records: any) {
    return this.http
      .get(
        environment.url +
        "/get_tickets?page_id=" +
        page +
        "&items_per_page=" +
        records
      )
      .pipe(catchError(this.handleError));
  }

  uploadPdfFiles(params: any) {
    return this.http
      .post(environment.url + "/upload_pdfs", params)
      .pipe(catchError(this.handleError));
  }
  uploadExtraPdfFiles(params: any) {
    return this.http
      .post(environment.url + "/upload_extra_pdfs", params)
      .pipe(catchError(this.handleError));
  }
  uploadPmcPdfFiles(params: any) {
    return this.http
      .post(environment.url + "/upload_pmc_pdfs", params)
      .pipe(catchError(this.handleError));
  }

  getPdfFiles(params: any) {
    return this.http
      .get(environment.url + "/get_project_pdfs?", { params })
      .pipe(catchError(this.handleError));
  }
  getExtraPdfFiles(params: any) {
    return this.http
      .get(environment.url + "/get_extra_project_pdfs?", { params })
      .pipe(catchError(this.handleError));
  }
  getPmcPdfFiles(params: any) {
    return this.http
      .get(environment.url + "/get_pmc_project_pdfs?", { params })
      .pipe(catchError(this.handleError));
  }
  searchProjectPdfs(params: any) {
    return this.http
      .get(environment.url + "/search_project_pdfs?", { params })
      .pipe(catchError(this.handleError));
  }
  createFolder(params: any) {
    return this.http
      .post(environment.url + "/create_design_folder", params)
      .pipe(catchError(this.handleError));
  }

  getFolders(params: any) {
    return this.http
      .get(environment.url + "/get_design_folder?", { params })
      .pipe(catchError(this.handleError));
  }

  deleteFolder(params: any) {
    return this.http
      .get(environment.url + "/delete_design_folder?", { params })
      .pipe(catchError(this.handleError));
  }

  deleteFile(params: any) {
    return this.http
      .get(environment.url + "/delete_pdf?", { params })
      .pipe(catchError(this.handleError));
  }

  createPmcFolder(params: any) {
    return this.http
      .post(environment.url + "/create_pmc_design_folder", params)
      .pipe(catchError(this.handleError));
  }

  createExtraFolder(params: any) {
    return this.http
      .post(environment.url + "/create_extra_design_folder", params)
      .pipe(catchError(this.handleError));
  }

  getExtraFolders(params: any) {
    return this.http
      .get(environment.url + "/get_extra_design_folder?", { params })
      .pipe(catchError(this.handleError));
  }
  getPmcFolders(params: any) {
    return this.http
      .get(environment.url + "/get_pmc_design_folder?", { params })
      .pipe(catchError(this.handleError));
  }
  searchPmcFolders(params: any) {
    return this.http
      .get(environment.url + "/search_pmc_pdfs?", { params })
      .pipe(catchError(this.handleError));
  }
  searchExternalFolders(params: any) {
    return this.http
      .get(environment.url + "/search_extra_pdfs?", { params })
      .pipe(catchError(this.handleError));
  }
  deleteExtraFolder(params: any) {
    return this.http
      .get(environment.url + "/delete_extra_design_folder?", { params })
      .pipe(catchError(this.handleError));
  }

  deletePmcFolder(params: any) {
    return this.http
      .get(environment.url + "/delete_pmc_design_folder?", { params })
      .pipe(catchError(this.handleError));
  }

  deletePmcFile(params: any) {
    return this.http
      .get(environment.url + "/delete_pdf?", { params })
      .pipe(catchError(this.handleError));
  }

  getPdfFileVersions() {
    return this.http
      .get(environment.url + "/get_pdf_version_list")
      .pipe(catchError(this.handleError));
  }
  addPdfFileVersions(params: any) {
    return this.http
      .post(environment.url + '/add_pdf_version', params)
      .pipe(catchError(this.handleError));
  }
  // addPdfFileVersions(params: any) {
  //   return this.http
  //     .post(environment.url + '/add_pdf_version',params)
  //     .pipe(catchError(this.handleError));
  // }

  getPdfDrawingTypes() {
    return this.http
      .get(environment.url + "/get_pdf_drawing_type_list")
      .pipe(catchError(this.handleError));
  }

  getPODetails(params: any) {
    return this.http
      .get(environment.url + "/get_pos", { params })
      .pipe(catchError(this.handleError));
  }

  uploadPOFile(params: any) {
    return this.http
      .post(environment.url + "/upload_po_temp_data", params)
      .pipe(catchError(this.handleError));
  }

  updatePOFile(params: any) {
    return this.http
      .post(environment.url + "/upload_po_data", params)
      .pipe(catchError(this.handleError));
  }

  cancelPoFile(id: any) {
    return this.http
      .get(environment.url + "/cancel_temp_po?temp_id=" + id)
      .pipe(catchError(this.handleError));
  }

  uploadPOFileItems(params: any) {
    return this.http
      .post(environment.url + "/add_items_to_po", params)
      .pipe(catchError(this.handleError));
  }

  getProjectImages(params: any) {
    return this.http
      .get(environment.url + "/get_project_images", { params })
      .pipe(catchError(this.handleError));
  }
  getActivityInfo(params: any) {
    return this.http
      .get(environment.url + "/get_activity_info", { params })
      .pipe(catchError(this.handleError));
  }

  createIssueLog(params: any) {
    return this.http
      .post(environment.url + "/create_issue_log", params)
      .pipe(catchError(this.handleError));
  }

  // updateIssueLog(params: any) {
  //   localStorage.setItem("appid","GEPS_APP");
  //   // const headerDict = {
  //   //   'App-Id':'GEPSV2_APP'
  //   // }
  //   // console.log("====>"+JSON.stringify(headerDict))
  //   // const requestOptions = {                                                                                                                                                                                 
  //   //   headers: new Headers(headerDict),
  //   // };

  //   return this.http
  //     .post("https://dev1.greenko.net/gmatdev/api/actionitem/remote/create",params)
  //     .pipe(catchError(this.handleError));
  // }
  updateIssueLog(params: any) {
    // localStorage.setItem("appid","GEPS_APP");
    return this.http
      .post(environment.url + "/update_issue_log", params)
      .pipe(catchError(this.handleError));
  }
  getIssueLog(params: any) {
    return this.http
      .get(environment.url + "/get_issue_log", { params })
      .pipe(catchError(this.handleError));
  }

  getProjectEmails(params: any) {
    return this.http
      .get(environment.url + "/get_project_drawing_mailids", { params })
      .pipe(catchError(this.handleError));
  }

  addProjectEmails(params: any) {
    return this.http
      .post(environment.url + "/add_project_drawing_mailids", params)
      .pipe(catchError(this.handleError));
  }

  getGoodsReceipt(id: any) {
    return this.http
      .get(environment.url + "/get_goods_receipt_data?po_id=" + id)
      .pipe(catchError(this.handleError));
  }
  updateGoodsReceipt(params: any) {
    return this.http
      .post(environment.url + "/update_goods_receipt_data", params)
      .pipe(catchError(this.handleError));
  }

  getSearchUsers(search: any) {
    return this.http
      .get(environment.sso_api + "/userlist?username=" + search)
      .pipe(catchError(this.handleError));
  }

  getUserRoles(params: any) {
    return this.http
      .post(environment.url + "/get_user_roles", params)
      .pipe(catchError(this.handleError));
  }

  getAllDept() {
    return this.http
      .get(environment.url + "/get_departments")
      .pipe(tap((data: any) => (this.opts = data)));
  }

  getAllRoles() {
    return this.http
      .get(environment.url + "/get_geps_roles")
      .pipe(tap((data: any) => (this.opts = data)));
  }

  getAllSubRoles() {
    return this.http
      .get(environment.url + "/get_sub_roles")
      .pipe(tap((data: any) => (this.opts = data)));
  }

  addUserRole(params: any) {
    return this.http
      .post(environment.url + "/add_user_roles", params)
      .pipe(catchError(this.handleError));
  }

  getAllRoleMenus(params: any) {
    return this.http
      .get(environment.url + "/get_role_menus", { params })
      .pipe(catchError(this.handleError));
  }

  getAllMenus() {
    return this.http
      .get(environment.url + "/get_menus")
      .pipe(tap((data: any) => (this.opts = data)));
  }

  addNewMenu(params: any) {
    return this.http
      .post(environment.url + "/add_menus", params)
      .pipe(catchError(this.handleError));
  }

  addMenuRole(params: any) {
    return this.http
      .post(environment.url + "/add_role_menus", params)
      .pipe(catchError(this.handleError));
  }

  addDepartment(params: any) {
    return this.http
      .post(environment.url + "/add_department", params)
      .pipe(catchError(this.handleError));
  }

  addRole(params: any) {
    return this.http
      .post(environment.url + "/add_roles", params)
      .pipe(catchError(this.handleError));
  }

  addSubRole(params: any) {
    return this.http
      .post(environment.url + "/add_sub_roles", params)
      .pipe(catchError(this.handleError));
  }

  getUserMenuRoles(id: any) {
    return this.http
      .get(environment.url + "/get_user_menus?user_id=" + id)
      .pipe(catchError(this.handleError));
  }

  getUserListProjects(params: any) {
    return this.http
      .get(environment.url + "/user_project_list", { params })
      .pipe(catchError(this.handleError));
  }

  getUserProjectWbs(params: any) {
    return this.http
      .get(environment.url + "/get_user_project_wbs", { params })
      .pipe(catchError(this.handleError));
  }

  addUserProjectWbs(params: any) {
    return this.http
      .post(environment.url + "/add_user_project_wbs", params)
      .pipe(catchError(this.handleError));
  }

  getProjectWbsDetails(params: any) {
    return this.http
      .get(environment.url + "/project_wbs", { params })
      .pipe(catchError(this.handleError));
  }

  getProjectWbsActivityDetails(params: any) {
    return this.http
      .get(environment.url + "/activities", { params })
      .pipe(catchError(this.handleError));
  }

  deleteUserRole(id: any) {
    return this.http
      .get(environment.url + "/delete_user_roles?id=" + id)
      .pipe(catchError(this.handleError));
  }
  deleteUsermenu(params: any) {
    return this.http
      .post(environment.url + "/del_role_menus", params)
      .pipe(catchError(this.handleError));
  }

  getUserProjectRoles(params: any) {
    return this.http
      .post(environment.url + "/user_role_access", params)
      .pipe(catchError(this.handleError));
  }

  deleteProjectActualQty(id: any) {
    return this.http
      .get(environment.url + "/delete_actual_quantity?act_qty_id=" + id)
      .pipe(catchError(this.handleError));
  }

  handleError(error: Response | any) {
    return throwError(error.error);
  }
  addmaingroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMainGroup", params)
      .pipe(catchError(this.handleError));
  }
  getmaingroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMainGroup", params)
      .pipe(catchError(this.handleError));
  }
  updatemaingroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMainGroup", params)
      .pipe(catchError(this.handleError));
  }
  deletemaingroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMainGroup", params)
      .pipe(catchError(this.handleError));
  }
  dropdownsubgroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMainGroup", params)
      .pipe(catchError(this.handleError));
  }
  addsubgroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialSubGroup", params)
      .pipe(catchError(this.handleError));
  }
  getsubgroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialSubGroup", params)
      .pipe(catchError(this.handleError));
  }
  updatesubgroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialSubGroup", params)
      .pipe(catchError(this.handleError));
  }
  deletesubgroupdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialSubGroup", params)
      .pipe(catchError(this.handleError));
  }
  addunitdata(params: any) {
    return this.http
      .post(environment.url + "/UnitOfMeasurement", params)
      .pipe(catchError(this.handleError));
  }
  getunitdata(params: any) {
    return this.http
      .post(environment.url + "/UnitOfMeasurement", params)
      .pipe(catchError(this.handleError));
  }
  updateunitdata(params: any) {
    return this.http
      .post(environment.url + "/UnitOfMeasurement", params)
      .pipe(catchError(this.handleError));
  }
  deleteunitdata(params: any) {
    return this.http
      .post(environment.url + "/UnitOfMeasurement", params)
      .pipe(catchError(this.handleError));
  }
  addcategorydata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCategory", params)
      .pipe(catchError(this.handleError));
  }
  getcategorydata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCategory", params)
      .pipe(catchError(this.handleError));
  }
  updatecategorydata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCategory", params)
      .pipe(catchError(this.handleError));
  }
  deletecategorydata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCategory", params)
      .pipe(catchError(this.handleError));
  }
  addvalutiondata(params: any) {
    return this.http
      .post(environment.url + "/MaterialValutionType", params)
      .pipe(catchError(this.handleError));
  }
  getvalutiondata(params: any) {
    return this.http
      .post(environment.url + "/MaterialValutionType", params)
      .pipe(catchError(this.handleError));
  }
  updatevalutiondata(params: any) {
    return this.http
      .post(environment.url + "/MaterialValutionType", params)
      .pipe(catchError(this.handleError));
  }
  deletevalutiondata(params: any) {
    return this.http
      .post(environment.url + "/MaterialValutionType", params)
      .pipe(catchError(this.handleError));
  }
  addmaterialcriticaldata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCriticality", params)
      .pipe(catchError(this.handleError));
  }
  getmaterialcriticaldata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCriticality", params)
      .pipe(catchError(this.handleError));
  }
  updatematerialcriticaldata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCriticality", params)
      .pipe(catchError(this.handleError));
  }
  deletematerialcriticaldata(params: any) {
    return this.http
      .post(environment.url + "/MaterialCriticality", params)
      .pipe(catchError(this.handleError));
  }
  addmaterialclassdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialClass", params)
      .pipe(catchError(this.handleError));
  }
  getmaterialclassdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialClass", params)
      .pipe(catchError(this.handleError));
  }
  updatematerialclassdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialClass", params)
      .pipe(catchError(this.handleError));
  }
  deletematerialclassdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialClass", params)
      .pipe(catchError(this.handleError));
  }
  addmaterialmasterdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMaster", params)
      .pipe(catchError(this.handleError));
  }
  getmaterialmasterdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMaster", params)
      .pipe(catchError(this.handleError));
  }
  updatematerialmasterdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMaster", params)
      .pipe(catchError(this.handleError));
  }
  deletematerialmasterdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialMaster", params)
      .pipe(catchError(this.handleError));
  }
  addvendormaster(params: any) {
    return this.http
      .post(environment.url + "/VendorMaster", params)
      .pipe(catchError(this.handleError));
  }
  getvendormasterdata(params: any) {
    return this.http
      .post(environment.url + "/VendorMaster", params)
      .pipe(catchError(this.handleError));
  }
  updatevendormasterdata(params: any) {
    return this.http
      .post(environment.url + "/VendorMaster", params)
      .pipe(catchError(this.handleError));
  }
  deletevendormasterdata(params: any) {
    return this.http
      .post(environment.url + "/VendorMaster", params)
      .pipe(catchError(this.handleError));
  }
  addcontractormaster(params: any) {
    return this.http
      .post(environment.url + "/ContractorMaster", params)
      .pipe(catchError(this.handleError));
  }
  getcontractormasterdata(params: any) {
    return this.http
      .post(environment.url + "/ContractorMaster", params)
      .pipe(catchError(this.handleError));
  }
  updatecontractormasterdata(params: any) {
    return this.http
      .post(environment.url + "/ContractorMaster", params)
      .pipe(catchError(this.handleError));
  }
  deletecontractormasterdata(params: any) {
    return this.http
      .post(environment.url + "/ContractorMaster", params)
      .pipe(catchError(this.handleError));
  }
  addcompanymaster(params: any) {
    return this.http
      .post(environment.url + "/CompanyMaster", params)
      .pipe(catchError(this.handleError));
  }
  getcompanymasterdata(params: any) {
    return this.http
      .post(environment.url + "/CompanyMaster", params)
      .pipe(catchError(this.handleError));
  }
  updatecompanymasterdata(params: any) {
    return this.http
      .post(environment.url + "/CompanyMaster", params)
      .pipe(catchError(this.handleError));
  }
  deletecompanymasterdata(params: any) {
    return this.http
      .post(environment.url + "/CompanyMaster", params)
      .pipe(catchError(this.handleError));
  }
  addtaxlist(params: any) {
    return this.http
      .post(environment.url + "/TaxList", params)
      .pipe(catchError(this.handleError));
  }
  gettaxlistdata(params: any) {
    return this.http
      .post(environment.url + "/TaxList", params)
      .pipe(catchError(this.handleError));
  }
  // updatetaxlistdata(params: any) {
  //   return this.http
  //     .post(environment.url + '/TaxList', params)
  //     .pipe(catchError(this.handleError));
  // }
  deletetaxlistdata(params: any) {
    return this.http
      .post(environment.url + "/TaxList", params)
      .pipe(catchError(this.handleError));
  }
  addfinancialyear(params: any) {
    return this.http
      .post(environment.url + "/FinancialYear", params)
      .pipe(catchError(this.handleError));
  }
  getfinancialyear(params: any) {
    return this.http
      .post(environment.url + "/FinancialYear", params)
      .pipe(catchError(this.handleError));
  }
  updatefinancialyear(params: any) {
    return this.http
      .post(environment.url + "/FinancialYear", params)
      .pipe(catchError(this.handleError));
  }
  deletefinancialyear(params: any) {
    return this.http
      .post(environment.url + "/FinancialYear", params)
      .pipe(catchError(this.handleError));
  }
  getmattransnamedata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getrgpdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getmatvehiclenumdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getmatstoragelocdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  addmaterialreceiptdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getmaterialreceiptdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  deletematerialreceiptdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  editmaterialreceiptdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getdmrdata(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  addQualityCheck(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck", params)
      .pipe(catchError(this.handleError));
  }
  getQualityCheck(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck", params)
      .pipe(catchError(this.handleError));
  }
  getQualityCheckdmrdata(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck", params)
      .pipe(catchError(this.handleError));
  }
  deleteQualityCheck(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck", params)
      .pipe(catchError(this.handleError));
  }
  getdmrdatadropdown(params: any) {
    return this.http
      .post(environment.url + '/QualityCheck', params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreceiptlist(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  editgoodsreceiptdata(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreceiptdmrlist(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  addgoodsreceiptlist(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  addfinalgoodsreceiptlist(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsreceiptlist(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  addgoodsissue(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue", params)
      .pipe(catchError(this.handleError));
  }
  editgoodsissue(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsissue(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsissue(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue", params)
      .pipe(catchError(this.handleError));
  }
  getavailablestockdata(params: any) {
    return this.http
      .post(environment.url + "/InventoryReports", params)
      .pipe(catchError(this.handleError));
  }
  getsmsdata(params: any) {
    return this.http
      .post(environment.url + "/InventoryReports", params)
      .pipe(catchError(this.handleError));
  }
  addgoodsreturn(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreturn(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsreturn(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreturnprint(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn", params)
      .pipe(catchError(this.handleError));
  }
  addgoodstransfer(params: any) {
    return this.http
      .post(environment.url + "/GoodsTransfer", params)
      .pipe(catchError(this.handleError));
  }
  getgoodstransfer(params: any) {
    return this.http
      .post(environment.url + "/GoodsTransfer", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodstransfer(params: any) {
    return this.http
      .post(environment.url + "/GoodsTransfer", params)
      .pipe(catchError(this.handleError));
  }
  addRgpData(params: any) {
    return this.http
      .post(environment.url + "/GoodsTransfer", params)
      .pipe(catchError(this.handleError));
  }
  addrequestmaterialdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest", params)
      .pipe(catchError(this.handleError));
  }
  editrequestmaterialdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest", params)
      .pipe(catchError(this.handleError));
  }
  getmaterialrequestdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest", params)
      .pipe(catchError(this.handleError));
  }
  deletematerialrequestdata(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest", params)
      .pipe(catchError(this.handleError));
  }
  addpurchaseorderdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseOrder", params)
      .pipe(catchError(this.handleError));
  }
  editpurchaseorderdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseOrder", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaseorderdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseOrder", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaseorderdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  deletepurchaseorderdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseOrder", params)
      .pipe(catchError(this.handleError));
  }
  setpurchaseorderdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseOrder", params)
      .pipe(catchError(this.handleError));
  }
  printpurchaseorderdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseOrder", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaserequestdata(params: any) {
    return this.http
      .post(environment.url + '/PurchaseOrder', params)
      .pipe(catchError(this.handleError));
  }
  addpurchaserequestdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaseRequestdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest", params)
      .pipe(catchError(this.handleError));
  }
  deletepurchaserequestdata(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaserequestdataprint(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest", params)
      .pipe(catchError(this.handleError));
  }
  getInventoryReport(params: any) {
    return this.http
      .post(environment.url + "/InventoryReports", params)
      .pipe(catchError(this.handleError));
  }
  addqsd(params: any) {
    return this.http.post(environment.url + '/QsdSupply', params)
      .pipe(catchError(this.handleError));
  }
  setqsd(params: any) {
    return this.http.post(environment.url + '/QsdSupply', params)
      .pipe(catchError(this.handleError));
  }
  getqsd(params: any) {
    return this.http.post(environment.url + '/QsdSupply', params)
      .pipe(catchError(this.handleError));
  }
  addqsdserviceswonumber(params: any) {
    return this.http.post(environment.url + '/QsdServices', params)
      .pipe(catchError(this.handleError));
  }
  addqsdservices(params: any) {
    return this.http.post(environment.url + '/QsdServices', params)
      .pipe(catchError(this.handleError));
  }
  setqsdservices(params: any) {
    return this.http.post(environment.url + '/QsdServices', params)
      .pipe(catchError(this.handleError));
  }
  getqsdservices(params: any) {
    return this.http.post(environment.url + '/QsdServices', params)
      .pipe(catchError(this.handleError));
  }
  getServicesData(params: any) {
    return this.http.post(environment.url + '/ServiceMaster', params)
      .pipe(catchError(this.handleError))
  }
  getServiceMasterData(params: any) {
    return this.http
      .post(environment.url + "/ServiceMaster", params)
      .pipe(catchError(this.handleError));
  }
  deleteservicemasterdata(params: any) {
    return this.http
      .post(environment.url + "/ServiceMaster", params)
      .pipe(catchError(this.handleError));
  }
  addGateInwardData(params: any) {
    return this.http
      .post(environment.url + "/GateInward", params)
      .pipe(catchError(this.handleError));
  }
  getGateInwardData(params: any) {
    return this.http
      .post(environment.url + "/GateInward", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateInwardData(params: any) {
    return this.http
      .post(environment.url + "/GateInward", params)
      .pipe(catchError(this.handleError));
  }
  addGateOutwardData(params: any) {
    return this.http
      .post(environment.url + "/GateOutward", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardData(params: any) {
    return this.http
      .post(environment.url + "/GateOutward", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardData(params: any) {
    return this.http
      .post(environment.url + "/GateOutward", params)
      .pipe(catchError(this.handleError));
  }
  addfileupload(params: any) {
    return this.http
      .post(environment.url + "/UploadDocuments", params)
      .pipe(catchError(this.handleError));
  }
  getexistingfies(params: any) {
    return this.http
      .get(environment.url + "/ReadDocuments", { params })
      .pipe(catchError(this.handleError));
  }
  deletefiles(params: any) {
    return this.http
      .get(environment.url + "/RemoveDocuments", { params })
      .pipe(catchError(this.handleError));
  }
  getGateInwardReport(params: any) {
    return this.http.post(environment.url + "/GssReports", params)
      .pipe(catchError(this.handleError))
  }
  getGateOutwardReport(params: any) {
    return this.http
      .post(environment.url + '/GssReports', params)
      .pipe(catchError(this.handleError))
  }
  getPotDateData(params: any) {
    return this.http
      .post(environment.url + '/PoReports', params)
      .pipe(catchError(this.handleError))
  }
  getPotNumData(params: any) {
    return this.http.post(environment.url + '/PoReports', params)
      .pipe(catchError(this.handleError))
  }
  getPrtDateData(params: any) {
    return this.http
      .post(environment.url + '/PrReports', params)
      .pipe(catchError(this.handleError))
  }
  getPrtNumData(params: any) {
    return this.http.post(environment.url + '/PrReports', params)
      .pipe(catchError(this.handleError))
  }
  gerservicecodedropdown(params: any) {
    return this.http.post(environment.url + '/ServiceMaster', params)
      .pipe(catchError(this.handleError))

  }
  addsiterecommendationsheet(params: any) {
    return this.http.post(environment.url + '/SiteRecommendationSheet', params)
      .pipe(catchError(this.handleError))
  }
  getsiterecommendationsheet(params: any) {
    return this.http.post(environment.url + '/SiteRecommendationSheet', params)
      .pipe(catchError(this.handleError))
  }
  deletesiterecommendationsheet(params: any) {
    return this.http.post(environment.url + '/SiteRecommendationSheet', params)
      .pipe(catchError(this.handleError))
  }
  addworkrequestdata(params: any) {
    return this.http.post(environment.url + "/WorkRequest", params)
      .pipe(catchError(this.handleError))
  }
  getWRlistData(params: any) {
    return this.http.post(environment.url + '/WorkRequest', params)
      .pipe(catchError(this.handleError))
  }
  getWRdropdownData(params: any) {
    return this.http.post(environment.url + '/WorkOrder', params)
      .pipe(catchError(this.handleError))
  }
  deleteWorkRequestData(params: any) {
    return this.http.post(environment.url + '/WorkRequest', params)
      .pipe(catchError(this.handleError))
  }
  addWorkOrderRequisitionData(params: any) {
    return this.http
      .post(environment.url + "/WorkRequest", params)
      .pipe(catchError(this.handleError));
  }
  deleteWCRData(params: any) {
    return this.http.post(environment.url + '/WorkCompletion', params)
      .pipe(catchError(this.handleError))
  }
  getWCRlistData(params: any) {
    return this.http.post(environment.url + '/WorkCompletion', params)
      .pipe(catchError(this.handleError))
  }
  addWCRdata(params: any) {
    return this.http.post(environment.url + '/WorkCompletion', params)
      .pipe(catchError(this.handleError))
  }
  getsampledata(params: any) {
    return this.http.post(environment.url + '/SampleTable', params)
      .pipe(catchError(this.handleError))
  }
  getWOlistData(params: any) {
    return this.http.post(environment.url + '/WorkOrder', params)
      .pipe(catchError(this.handleError))
  }
  gettabledatalist(params: any) {
    return this.http.post(environment.url + '/WorkOrder', params)
      .pipe(catchError(this.handleError))
  }
  addworkorderdata(params: any) {
    return this.http.post(environment.url + "/WorkOrder", params)
      .pipe(catchError(this.handleError))
  }
  deleteworkOrderdata(params: any) {
    return this.http.post(environment.url + '/WorkOrder', params)
      .pipe(catchError(this.handleError))
  }
  addSiteRecommendedSheetData(params: any) {
    return this.http
      .post(environment.url + "/SiteRecommendationSheet", params)
      .pipe(catchError(this.handleError));
  }
  getJMSlistdata(params: any) {
    return this.http.post(environment.url + '/JointMeasurementSheet', params)
      .pipe(catchError(this.handleError))
  }
  deleteJMSdata(params: any) {
    return this.http.post(environment.url + '/JointMeasurementSheet', params)
      .pipe(catchError(this.handleError))
  }
  addJMSdata(params: any) {
    return this.http.post(environment.url + '/JointMeasurementSheet', params)
      .pipe(catchError(this.handleError))
  }
  getWOlist(params: any) {
    return this.http.post(environment.url + '/JointMeasurementSheet', params)
      .pipe(catchError(this.handleError))
  }
  getTABLEdata(params: any) {
    return this.http.post(environment.url + '/JointMeasurementSheet', params)
      .pipe(catchError(this.handleError))
  }
  getActivityLog(params: any) {
    return this.http.post(environment.url + '/GetLog', params)
      .pipe(catchError(this.handleError))
  }
  addUserCredentials(params: any) {
    return this.http
      .post(environment.url + "/UserCredentials", params)
      .pipe(catchError(this.handleError));
  }
  getUserCredentialsModule(params: any) {
    return this.http
      .post(environment.url + "/UserCredentials", params)
      .pipe(catchError(this.handleError));
  }
  getUserCredentialsMenu(params: any) {
    return this.http
      .post(environment.url + "/UserCredentials", params)
      .pipe(catchError(this.handleError));
  }
  addQsdData(params: any) {
    return this.http
      .post(environment.url + "/QsdServices", params)
      .pipe(catchError(this.handleError));
  }
  printWOdetails(params: any) {
    return this.http.post(environment.url + "/WorkOrder", params)
      .pipe(catchError(this.handleError))
  }
  getMIlistData(params: any) {
    return this.http.post(environment.url + '/ModelInvoice', params)
      .pipe(catchError(this.handleError));
  }
  deleteMIlistdata(params: any) {
    return this.http.post(environment.url + '/ModelInvoice', params)
      .pipe(catchError(this.handleError));
  }
  addmodelinvoicedata(params: any) {
    return this.http.post(environment.url + '/ModelInvoice', params)
      .pipe(catchError(this.handleError));
  }
  getMImatData(params: any) {
    return this.http.post(environment.url + '/ModelInvoice', params)
      .pipe(catchError(this.handleError));
  }
  getexistingfieswr(params: any) {
    return this.http.post(environment.url + '/WorkRequest', params)
      .pipe(catchError(this.handleError))
  }
  addInvoiceData(params: any) {
    return this.http
      .post(environment.url + "/ModelInvoice", params)
      .pipe(catchError(this.handleError));
  }
  printJMSdetails(params: any) {
    return this.http.post(environment.url + '/JointMeasurementSheet', params)
      .pipe(catchError(this.handleError))
  }
  printWCRdetails(params: any) {
    return this.http.post(environment.url + '/WorkCompletion', params)
      .pipe(catchError(this.handleError))
  }
  vehicleMasterListData(params: any) {
    return this.http.post(environment.url + '/VehicleMaster', params)
      .pipe(catchError(this.handleError))
  }
  addVehiclemasterData(params: any) {
    return this.http.post(environment.url + '/VehicleMaster', params)
      .pipe(catchError(this.handleError))
  }
  deleteVehicleMasterData(params: any) {
    return this.http.post(environment.url + '/VehicleMaster', params)
      .pipe(catchError(this.handleError))
  }
  addjobOrder(params: any) {
    return this.http
      .post(environment.url + "/JobOrder", params)
      .pipe(catchError(this.handleError));
  }
  getJobOrderData(params: any) {
    return this.http
      .post(environment.url + "/JobOrder", params)
      .pipe(catchError(this.handleError));
  }
  updateJobOrder(params: any) {
    return this.http
      .post(environment.url + "/JobOrder", params)
      .pipe(catchError(this.handleError));
  }
  deleteJoFile(body: any) {
    return this.http
      .post(environment.url + "/JobOrder", body)
      .pipe(catchError(this.handleError));
  }
  getJoBOoqList(params: any) {
    return this.http
      .post(environment.url + "/JoBoqRequired", params)
      .pipe(catchError(this.handleError))
  }
  getBoqIdDetails(params: any) {
    return this.http
      .post(environment.url + "/JoBoqRequired", params)
      .pipe(catchError(this.handleError))
  }
  getSubContractGoodsIssueData(params: any) {
    return this.http
      .post(environment.url + "/SubContractGoodsIssue", params)
      .pipe(catchError(this.handleError))
  }
  addSCGIData(params: any) {
    return this.http
      .post(environment.url + "/SubContractGoodsIssue", params)
      .pipe(catchError(this.handleError))
  }
  deleteSCGIdata(params: any) {
    return this.http
      .post(environment.url + "/SubContractGoodsIssue", params)
      .pipe(catchError(this.handleError))
  }
  editSCGIdata(params: any) {
    return this.http
      .post(environment.url + "/SubContractGoodsIssue", params)
      .pipe(catchError(this.handleError))
  }
  getMailData(params: any) {
    return this.http
      .post(environment.url + "/MailDrawings", params)
      .pipe(catchError(this.handleError));
  }
  vendorBunkRequestList(params: any) {
    return this.http
      .post(environment.url + "/VendorBunkRequest", params)
      .pipe(catchError(this.handleError))
  }
  addVendorBunkReqData(params: any) {
    return this.http
      .post(environment.url + "/VendorBunkRequest", params)
      .pipe(catchError(this.handleError))
  }
  deletevendorBunkRequest(params: any) {
    return this.http
      .post(environment.url + "/VendorBunkRequest", params)
      .pipe(catchError(this.handleError))
  }
  editVendorBunkRequest(params: any) {
    return this.http
      .post(environment.url + "/VendorBunkRequest", params)
      .pipe(catchError(this.handleError))
  }

  addfuelReceiptData(params: any) {
    return this.http
      .post(environment.url + "/FuelReceiptNote", params)
      .pipe(catchError(this.handleError));
  }
  getFuelReceiptData(params: any) {
    return this.http
      .post(environment.url + "/FuelReceiptNote", params)
      .pipe(catchError(this.handleError));
  }
  updateFuelReceipt(params: any) {
    return this.http
      .post(environment.url + "/FuelReceiptNote", params)
      .pipe(catchError(this.handleError));
  }
  deleteFuelReceiptFile(params: any) {
    return this.http
      .post(environment.url + "/FuelReceiptNote", params)
      .pipe(catchError(this.handleError));
  }


  //////////////////////////////////////////////////////////

  addFuelIssueReq(params: any) {
    return this.http
      .post(environment.url + "/FuelIssueRequest", params)
      .pipe(catchError(this.handleError));
  }
  getFuelIssueReqData(params: any) {
    return this.http
      .post(environment.url + "/FuelIssueRequest", params)
      .pipe(catchError(this.handleError));
  }
  updateFuelIssueRequest(params: any) {
    return this.http
      .post(environment.url + "/FuelIssueRequest", params)
      .pipe(catchError(this.handleError));
  }
  deleteFuelIssueReqFile(params: any) {
    return this.http
      .post(environment.url + "/FuelIssueRequest", params)
      .pipe(catchError(this.handleError));
  }
  addBunkRequestData(params: any) {
    return this.http
      .post(environment.url + "/BunkConfirmation", params)
      .pipe(catchError(this.handleError));
  }
  getBunkConfirmData(params: any) {
    return this.http
      .post(environment.url + "/BunkConfirmation", params)
      .pipe(catchError(this.handleError));
  }
  addBunkConfirm(params: any) {
    return this.http
      .post(environment.url + "/BunkConfirmation", params)
      .pipe(catchError(this.handleError));
  }
  updateBunkConfirmation(params: any) {
    return this.http
      .post(environment.url + "/BunkConfirmation", params)
      .pipe(catchError(this.handleError));
  }
  deleteBunkConfirmFile(params: any) {
    return this.http
      .post(environment.url + "/BunkConfirmation", params)
      .pipe(catchError(this.handleError));
  }
  getMatVBR(params: any) {
    return this.http
      .post(environment.url + "/VendorBunkRequest", params)
      .pipe(catchError(this.handleError));
  }
  getRequestNumber(params: any) {
    return this.http
      .post(environment.url + "/VendorBunkRequest", params)
      .pipe(catchError(this.handleError));
  }

  //search functionality services
  getSearchDailyMaterialReceipt(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getSearchQualityCheck(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck", params)
      .pipe(catchError(this.handleError));
  }
  getSearchGoodsReceipt(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt", params)
      .pipe(catchError(this.handleError));
  }
  getSearchGoodsIssue1(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue", params)
      .pipe(catchError(this.handleError));
  }
  getSearchDeliveryChallan(params: any) {
    return this.http
      .post(environment.url + "/DeliveryChallan", params)
      .pipe(catchError(this.handleError));
  }
  getSearchGoodsGoodsReturn(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn", params)
      .pipe(catchError(this.handleError));
  }
  getSearchGoodsTransfer(params: any) {
    return this.http
      .post(environment.url + "/GoodsTransfer", params)
      .pipe(catchError(this.handleError));
  }
  getSearchPurchaseRequest(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest", params)
      .pipe(catchError(this.handleError));
  }
  getSearchWorkRequest(params: any) {
    return this.http
      .post(environment.url + "/WorkRequest", params)
      .pipe(catchError(this.handleError));
  }
  addDeliveryChallan(params: any) {
    return this.http
      .post(environment.url + "/DeliveryChallan", params)
      .pipe(catchError(this.handleError));
  }
  updateDeliveryChallan(params: any) {
    return this.http
      .post(environment.url + "/DeliveryChallan", params)
      .pipe(catchError(this.handleError));
  }
  getDeliveryChallanData(params: any) {
    return this.http
      .post(environment.url + "/DeliveryChallan", params)
      .pipe(catchError(this.handleError));
  }
  deleteDcFile(body: any) {
    return this.http
      .post(environment.url + "/DeliveryChallan", body)
      .pipe(catchError(this.handleError));
  }
  //purchase request2 service
  addPurchaseRequest2(params: any) {
    return this.http.
      post(environment.url + "/PurchaseRequest2", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaseRequest2(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest2", params)
      .pipe(catchError(this.handleError));
  }
  deletepurchaserequest2(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest2", params)
      .pipe(catchError(this.handleError));
  }
  getpurchaserequest2print(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest2", params)
      .pipe(catchError(this.handleError));
  }
  getSearchPurchaseRequest2(params: any) {
    return this.http
      .post(environment.url + "/PurchaseRequest2", params)
      .pipe(catchError(this.handleError));
  }
  //goods issue request2 services
  addgoodsissuerequest2(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest2", params)
      .pipe(catchError(this.handleError));
  }
  addgoodsissuerequest22(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue2", params)
      .pipe(catchError(this.handleError));
  }
  editgoodsissuerequest2(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest2", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsissuerequest2(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest2", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsissuerequest2(params: any) {
    return this.http
      .post(environment.url + "/MaterialRequest2", params)
      .pipe(catchError(this.handleError));
  }
  //Outgatepass rgp services
  addoutgatepassrgp(params: any) {
    return this.http.post(environment.url + "/OutGatePassRGP", params)
      .pipe(catchError(this.handleError));
  }
  getoutgatepassrgp(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassRGP", params)
      .pipe(catchError(this.handleError));
  }
  deleteoutgatepassrgp(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassRGP", params)
      .pipe(catchError(this.handleError));
  }
  printoutgatepassRgpData(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassRGP", params)
      .pipe(catchError(this.handleError));
  }
  //InventoryReports2
  getsmsdata2(params: any) {
    return this.http
      .post(environment.url + "/InventoryReports2", params)
      .pipe(catchError(this.handleError));
  }
  //Quality check in project details
  addQualityCheckForTask(data: any) {
    return this.http
      .post(environment.url + "/task_qty_qc", data)
      .pipe(catchError(this.handleError));
  }
  //po upload services
  addfilepoupload(params: any) {
    return this.http
      .post(environment.url + "/UploadPO", params)
      .pipe(catchError(this.handleError));
  }

  excelUpload(body: any) {
    return this.http
      .post(environment.url + "/SaveXlPo", body)
      .pipe(catchError(this.handleError));
  }

  //Outgatepass rgp2 services
  addoutgatepassrgp2(params: any) {
    return this.http.post(environment.url + "/OutGatePassRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getoutgatepassrgp2(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassRGP2", params)
      .pipe(catchError(this.handleError));
  }
  deleteoutgatepassrgp2(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassRGP2", params)
      .pipe(catchError(this.handleError));
  }
  printoutgatepassRgpData2(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassRGP2", params)
      .pipe(catchError(this.handleError));
  }
  //inventory - goods issue
  addgoodsissue2(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue2", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsissue2(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue2", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsissue2(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue2", params)
      .pipe(catchError(this.handleError));
  }
  getSearchGoodsIssue2(params: any) {
    return this.http
      .post(environment.url + "/GoodsIssue2", params)
      .pipe(catchError(this.handleError));
  }
  //goods return services
  addgoodsreturn2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn2", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreturn2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn2", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsreturn2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn2", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreturnprint2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn2", params)
      .pipe(catchError(this.handleError));
  }
  getSearchGoodsGoodsReturn2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReturn2", params)
      .pipe(catchError(this.handleError));
  }
  //goods receipt services integration
  getgoodsreceiptlist2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  editgoodsreceiptdata2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  getgoodsreceiptdmrlist2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  addgoodsreceiptlist2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  addfinalgoodsreceiptlist2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  deletegoodsreceiptlist2(params: any) {
    return this.http
      .post(environment.url + "/GoodsReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  //quality Check2 services
  addQualityCheck2(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck2", params)
      .pipe(catchError(this.handleError));
  }
  getQualityCheck2(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck2", params)
      .pipe(catchError(this.handleError));
  }
  getQualityCheckdmrdata2(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck2", params)
      .pipe(catchError(this.handleError));
  }
  deleteQualityCheck2(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck2", params)
      .pipe(catchError(this.handleError));
  }
  getdmrdatadropdown2(params: any) {
    return this.http
      .post(environment.url + '/QualityCheck2', params)
      .pipe(catchError(this.handleError));
  }
  getSearchQualityCheck2(params: any) {
    return this.http
      .post(environment.url + "/QualityCheck2", params)
      .pipe(catchError(this.handleError));
  }
  // gate-outward-nrgp
  addGateOutwordNRGP(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardNRGPList(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardNRGPData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardNRGPsearchData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardNRGPReports(params: any) {
    return this.http
      .post(environment.url + "/Reports_GateOutwardNRGP", params)
      .pipe(catchError(this.handleError));
  }
  // gate-outward-rgp
  addGateOutwordRGP(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardRGPList(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardRGPData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP", params)
      .pipe(catchError(this.handleError));
  }
  getRGPsearchData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardRgpReports(data:any){
    return this.http
    .post(environment.url + "/Reports_GateOutwardRGP", data)
    .pipe(catchError(this.handleError)); 
  }
  //
  getOutGatePassNrgp(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  addOutGatePassNrgp(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  getNrgpDataList(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  editNrgpData(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  deleteNrgpList(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  getNRGPsearchData(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  getOgpNRGPReports(params: any) {
    return this.http
      .post(environment.url + "/Reports_OutGatePassNRGP", params)
      .pipe(catchError(this.handleError));
  }
  // gate-outward-gi
  addGateOutwordGI(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardGIList(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardGIList1(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardGiData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI", params)
      .pipe(catchError(this.handleError));
  }
  getGIsearchData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI", params)
      .pipe(catchError(this.handleError));
  }
  getGIReportsData(params: any) {
    return this.http
      .post(environment.url + "/Reports_GateOutwardGI", params)
      .pipe(catchError(this.handleError));
  }
  // gate-inward2
  addGateInwardData2(params: any) {
    return this.http
      .post(environment.url + "/GateInward2", params)
      .pipe(catchError(this.handleError));
  }
  getGateInwardData2(params: any) {
    return this.http
      .post(environment.url + "/GateInward2", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateInwardData2(params: any) {
    return this.http
      .post(environment.url + "/GateInward2", params)
      .pipe(catchError(this.handleError));
  }
  getGateInward2searchData(params: any) {
    return this.http
      .post(environment.url + "/GateInward2", params)
      .pipe(catchError(this.handleError));
  }
  // gate-outward-gi2
  addGateOutwordGI2(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardGI2List(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI2", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardGi2Data(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutward2searchData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardGI2", params)
      .pipe(catchError(this.handleError));
  }
  // gate-outward-nrgp2
  addGateOutwordNRGP2(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardNRGP2List(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardNRGP2Data(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardNRGP2searchData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  // gate-outward-rgp2
  addGateOutwordRGP2(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardRGP2List(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP2", params)
      .pipe(catchError(this.handleError));
  }
  deleteGateOutwardRGP2Data(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getGateOutwardRGP2searchData(params: any) {
    return this.http
      .post(environment.url + "/GateOutwardRGP2", params)
      .pipe(catchError(this.handleError));
  }

  // nrgp2
  addOutGatePassNrgp2(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getNrgp2DataList(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  editNrgp2Data(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  deleteNrgp2List(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  getNRGP2searchData(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP2", params)
      .pipe(catchError(this.handleError));
  }
 printOutGatePassNrgp2(params: any) {
    return this.http
      .post(environment.url + "/OutGatePassNRGP2", params)
      .pipe(catchError(this.handleError));
  }
  // dmr2
  getmattransnamedata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  getmatvehiclenumdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  getmatstoragelocdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  addmaterialreceiptdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  getmaterialreceiptdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  deletematerialreceiptdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  editmaterialreceiptdata2(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }
  getdmr2searchData(params: any) {
    return this.http
      .post(environment.url + "/DailyMaterialReceipt2", params)
      .pipe(catchError(this.handleError));
  }

  //accepted quantity images 
  getacceptedqtyimages(id:any){
  return this.http
      .get(environment.url + "/get_acc_images?acc_id=" + id)
      .pipe(catchError(this.handleError));
}
//get inventory reports2
getinventoryreports2(params: any) {
  return this.http
    .post(environment.url + "/InventoryReports2", params)
    .pipe(catchError(this.handleError));
}
getContractorData(params: any) {
  return this.http
    .post(environment.url + "/InventoryReports2", params)
    .pipe(catchError(this.handleError));
}
// User Credential services
  getAction(params: any) {
    return this.http
      .post(environment.url + "/UserCredentials", params)
      .pipe(catchError(this.handleError));
  }
//fuel Inventory services2
addfuelReceiptData2(params: any) {
  return this.http
    .post(environment.url + "/FuelReceiptNote2", params)
    .pipe(catchError(this.handleError));
}
getFuelReceiptData2(params: any) {
  return this.http
    .post(environment.url + "/FuelReceiptNote2", params)
    .pipe(catchError(this.handleError));
}
updateFuelReceipt2(params: any) {
  return this.http
    .post(environment.url + "/FuelReceiptNote2", params)
    .pipe(catchError(this.handleError));
}
deleteFuelReceiptFile2(params: any) {
  return this.http
    .post(environment.url + "/FuelReceiptNote2", params)
    .pipe(catchError(this.handleError));
}
//vendor bunk request2
vendorBunkRequestList2(params: any) {
  return this.http
    .post(environment.url + "/VendorBunkRequest2", params)
    .pipe(catchError(this.handleError))
}
addVendorBunkReqData2(params: any) {
  return this.http
    .post(environment.url + "/VendorBunkRequest2", params)
    .pipe(catchError(this.handleError))
}
deletevendorBunkRequest2(params: any) {
  return this.http
    .post(environment.url + "/VendorBunkRequest2", params)
    .pipe(catchError(this.handleError))
}
editVendorBunkRequest2(params: any) {
  return this.http
    .post(environment.url + "/VendorBunkRequest2", params)
    .pipe(catchError(this.handleError))
}
gettaskimagesdata(params:any){
  return this.http
  .post(environment.url + "/get_project_images", params)
  .pipe(catchError(this.handleError))
}
getVendorBunReqprint(params: any) {
  return this.http
    .post(environment.url + "/VendorBunkRequest", params)
    .pipe(catchError(this.handleError));
}
getVendorBunReqprint2(params: any) {
  return this.http
    .post(environment.url + "/VendorBunkRequest2", params)
    .pipe(catchError(this.handleError));
}

//fuel issue
addFuelIssueData(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue", params)
    .pipe(catchError(this.handleError));
}
getFuelIssueData(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue", params)
    .pipe(catchError(this.handleError));
}
editFuelIssue(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue", params)
    .pipe(catchError(this.handleError));
}
deleteFuelIssueFile(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue", params)
    .pipe(catchError(this.handleError));
}
getFuelRequestData(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest", params)
    .pipe(catchError(this.handleError));
}
getFuelRequestNumber(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest", params)
    .pipe(catchError(this.handleError));
}
//fuel receipt
getconfrimationnodata(params:any){
  return this.http
  .post(environment.url + "/FuelReceiptNote", params)
  .pipe(catchError(this.handleError));
}
getconfrimationnodata2(params:any){
  return this.http
  .post(environment.url + "/FuelReceiptNote2", params)
  .pipe(catchError(this.handleError));
}
getQuantityData(params:any){
  return this.http
  .post(environment.url + "/BunkConfirmation", params)
  .pipe(catchError(this.handleError));
}
getQuantityData2(params:any){
  return this.http
  .post(environment.url + "/BunkConfirmation2", params)
  .pipe(catchError(this.handleError));
}
//Bunk Confirmation2 
addBunkRequestData2(params: any) {
  return this.http
    .post(environment.url + "/BunkConfirmation2", params)
    .pipe(catchError(this.handleError));
}
getBunkConfirmData2(params: any) {
  return this.http
    .post(environment.url + "/BunkConfirmation2", params)
    .pipe(catchError(this.handleError));
}
addBunkConfirm2(params: any) {
  return this.http
    .post(environment.url + "/BunkConfirmation2", params)
    .pipe(catchError(this.handleError));
}
updateBunkConfirmation2(params: any) {
  return this.http
    .post(environment.url + "/BunkConfirmation2", params)
    .pipe(catchError(this.handleError));
}
deleteBunkConfirmFile2(params: any) {
  return this.http
    .post(environment.url + "/BunkConfirmation2", params)
    .pipe(catchError(this.handleError));
}
//fuel issue request
addFuelIssueReq2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest2", params)
    .pipe(catchError(this.handleError));
}
getFuelIssueReqData2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest2", params)
    .pipe(catchError(this.handleError));
}
updateFuelIssueRequest2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest2", params)
    .pipe(catchError(this.handleError));
}
deleteFuelIssueReqFile2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest2", params)
    .pipe(catchError(this.handleError));
}
//fuel issue2
addFuelIssueData2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue2", params)
    .pipe(catchError(this.handleError));
}
getFuelIssueData2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue2", params)
    .pipe(catchError(this.handleError));
}
editFuelIssue2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue2", params)
    .pipe(catchError(this.handleError));
}
deleteFuelIssueFile2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssue2", params)
    .pipe(catchError(this.handleError));
}
getFuelRequestData2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest2", params)
    .pipe(catchError(this.handleError));
}
getFuelRequestNumber2(params: any) {
  return this.http
    .post(environment.url + "/FuelIssueRequest2", params)
    .pipe(catchError(this.handleError));
}
getGateOutwardNRGP2Dropdown(params: any) {
  return this.http
    .post(environment.url + "/GateOutwardNRGP2", params)
    .pipe(catchError(this.handleError));
}
getGateOutwardRGP2dropdowndata(params: any) {
  return this.http
    .post(environment.url + "/GateOutwardRGP2", params)
    .pipe(catchError(this.handleError));
}
getNRGP2data(params: any) {
  return this.http
    .post(environment.url + "/OutGatePassNRGP2", params)
    .pipe(catchError(this.handleError));
}
// gss reports2
getgateinwarddata2(params:any){
  return this.http
  .post(environment.url + "/ReportsGateInward2", params)
  .pipe(catchError(this.handleError));
}
getgateoutwarddata2(params:any){
  return this.http
  .post(environment.url + "/ReportsGateOutwardGI2", params)
  .pipe(catchError(this.handleError));
}
getGateOutwardNRGP2(params:any){
  return this.http
  .post(environment.url + "/ReportGateOutwardNRGP2", params)
  .pipe(catchError(this.handleError));
}
getGateOutwardRGP2(params:any){
  return this.http
  .post(environment.url + "/ReportGateOutwardRGP2", params)
  .pipe(catchError(this.handleError));
}
editgoodsissue2(params: any) {
  return this.http
    .post(environment.url + "/GoodsIssue2", params)
    .pipe(catchError(this.handleError));
}
editgoodissuerequest2(params: any) {
  return this.http
    .post(environment.url + "/MaterialRequest2", params)
    .pipe(catchError(this.handleError));
}
getSlide(){
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  return this.http
  .get(environment.url + "/testdata",{ headers, responseType: 'text'})
  .pipe(catchError(this.handleError));
}
getContractor(params: any){
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  return this.http
  .post(environment.url + "/InventoryReports2",params,{ headers, responseType: 'text'})
  .pipe(catchError(this.handleError));
}
mmhInventoryReports2(params: any){
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  return this.http
  .post(environment.url + "/InventoryReports2",params,{ headers, responseType: 'text'})
  .pipe(catchError(this.handleError));
}
//companies data
usercompanyData(params: any) {
  return this.http
    .post(environment.url + "/UserCompany", params)
    .pipe(catchError(this.handleError));
}
getDcprint(params: any) {
  return this.http
    .post(environment.url + "/DeliveryChallan", params)
    .pipe(catchError(this.handleError));
}
GoodsIssueRequest(params: any) {
  return this.http
    .post(environment.url + "/GoodsIssue", params)
    .pipe(catchError(this.handleError));
}
SignatureUpload(params:any){
  return this.http
  .post(environment.url + "/SignatureUpload", params)
  .pipe(catchError(this.handleError));
}
SignLevel(params:any){
  return this.http
  .post(environment.url + "/SignLevel", params)
  .pipe(catchError(this.handleError));
}
DocumentSign(params:any){
  return this.http
  .post(environment.url + "/DocumentSign", params)
  .pipe(catchError(this.handleError));
}
getOutGatePassRGPReports(data:any){
  return this.http
  .post(environment.url + "/Reports_OutGatePassRGP", data)
  .pipe(catchError(this.handleError));
}
getPurpose(data:any){
  return this.http
  .post(environment.url + "/OutGatePassRGP", data)
  .pipe(catchError(this.handleError));
}

getPurposeNRGP(data:any){
  return this.http
  .post(environment.url + "/OutGatePassNRGP", data)
  .pipe(catchError(this.handleError));
}
userCompany(data:any){
  return this.http
  .post(environment.url + "/UserCompany", data)
  .pipe(catchError(this.handleError)); 
}
GoodsInTransit(data:any){
  return this.http
  .post(environment.url + "/GoodsInTransit", data)
  .pipe(catchError(this.handleError)); 
}

UserDashboard(data:any){
  return this.http
  .post(environment.url + "/UserDashBoard", data)
  .pipe(catchError(this.handleError)); 
}

getRGPData(params: any) {
  return this.http
    .post(environment.url + "/OutGatePassRGP", params)
    .pipe(catchError(this.handleError));
}
getDCData(params: any) {
  return this.http
    .post(environment.url + "/Reports_DeliveryChallan", params)
    .pipe(catchError(this.handleError));
}

PurchaseOrder(params: any) {
  return this.http
    .post(environment.url + "/PurchaseOrder", params)
    .pipe(catchError(this.handleError));
}
WorkOrder(params: any) {
  return this.http
    .post(environment.url + "/WorkOrder", params)
    .pipe(catchError(this.handleError));
}
AutoDocUpdate2(params: any) {
  return this.http
    .post(environment.url + "/AutoDocUpdate2", params)
    .pipe(catchError(this.handleError));
}
}
