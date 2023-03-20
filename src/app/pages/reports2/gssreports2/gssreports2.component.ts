import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as XLSX from 'xlsx'; 
import * as moment from "moment";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
@Component({
  selector: 'app-gssreports2',
  templateUrl: './gssreports2.component.html',
  styleUrls: ['./gssreports2.component.scss']
})
export class Gssreports2Component implements OnInit {
  gateIwardReportData: any;
  gateinwardreporttodate:any[]=[];
  gateinwardreportfromdate:any[]=[];
  gateoutwardReportData: any;
  gateoutwardreportfromdate: any;
  gateoutwarreporttodate: any;
  gateoutwardnrgpreportfromdate: any;
  gateoutwardnrgpreporttodate: any;
  gateoutwardnrgpReportData: any;
  gateoutwardrgpReportData: any;
  gateoutwardrgpreportfromdate: any;
  gateoutwardrgpreporttodate: any;
  testData:any;
  constructor(private custService: CustomerService,
    private dialog: MatDialog,
    private authService:AuthService,
    private alertcall: AlertCallsService,
    private sanitized: DomSanitizer) { 

    }
  @ViewChild('TABLEGIR', { static: false }) TABLEGIR: ElementRef; 
  @ViewChild('TABLEGOR', { static: false }) TABLEGOR: ElementRef; 
  @ViewChild('TABLENRGP', { static: false }) TABLENRGP: ElementRef; 
  @ViewChild('TABLERGP', { static: false }) TABLERGP: ElementRef; 
  ngOnInit(): void {
  }


  // gateinward report
  getgateinwardreport(){
    let obj = {
      from_date: this.gateinwardreportfromdate,
      to_date: this.gateinwardreporttodate,
      command: "view",
    };
    this.custService.getgateinwarddata2(obj).subscribe((data: any) => {
      // console.log(data);
    if(data&& data['status_code']===200){
      this.gateIwardReportData=data.data
      // this.gateIwardReportData.forEach((element:any) => {
      //  element["Date"] = moment(element.Date).format("MM-DD-YYYY")
      // });
      // console.log(this.gateIwardReportData); 
    }
    });
    
  }
  getSlide(){
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.custService.getSlide().subscribe((data: any) => {
      console.log(data);
       this.testData=data;
       this.testData = this.sanitized.bypassSecurityTrustHtml(data);
    });
  }
  getHeaders() {
    let headers: string[] = [];
    if(this.gateIwardReportData) {
      this.gateIwardReportData.forEach((value:any) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
            // console.log(headers);           
          }
        })
      })
    }
    return headers;
  }
  

    // gateinward report
    getgateoutwardreport(){
      let obj = {
        from_date: this.gateoutwardreportfromdate,
        to_date: this.gateoutwarreporttodate,
        command: "view",
      };
      this.custService.getgateoutwarddata2(obj).subscribe((data: any) => {
        // console.log(data);
      if(data&& data['status_code']===200){
        this.gateoutwardReportData=data.data
        // this.gateoutwardReportData.forEach((element:any) => {
        //   element["Date"] = moment(element.Date).format("MM-DD-YYYY")
        //  });
        
        // console.log(this.gateIwardReportData); 
      }
      });
      
    }
    getHeaders1() {
      let headers: string[] = [];
      if(this.gateoutwardReportData) {
        this.gateoutwardReportData.forEach((value:any) => {
          Object.keys(value).forEach((key) => {
            if(!headers.find((header) => header == key)){
              headers.push(key)
              // console.log(headers);           
            }
          })
        })
      }
      return headers;
    }
      // getGateOutwardNRGP2
      getgateoutwardnrgpreport(){
        let obj = {
          from_date: this.gateoutwardnrgpreportfromdate,
          to_date: this.gateoutwardnrgpreporttodate,
          command: "view",
        };
        this.custService.getGateOutwardNRGP2(obj).subscribe((data: any) => {
          // console.log(data);
        if(data&& data['status_code']===200){
          this.gateoutwardnrgpReportData=data.data
          // this.gateoutwardReportData.forEach((element:any) => {
          //   element["Date"] = moment(element.Date).format("MM-DD-YYYY")
          //  });
          
          // console.log(this.gateIwardReportData); 
        }
        });
        
      }
      getHeaders2() {
        let headers: string[] = [];
        if(this.gateoutwardnrgpReportData) {
          this.gateoutwardnrgpReportData.forEach((value:any) => {
            Object.keys(value).forEach((key) => {
              if(!headers.find((header) => header == key)){
                headers.push(key)
                // console.log(headers);           
              }
            })
          })
        }
        return headers;
      }
    
         // getGateOutwardRGP2
         getgateoutwardrgpreport(){
          let obj = {
            from_date: this.gateoutwardrgpreportfromdate,
            to_date: this.gateoutwardrgpreporttodate,
            command: "view",
          };
          this.custService.getGateOutwardNRGP2(obj).subscribe((data: any) => {
            // console.log(data);
          if(data&& data['status_code']===200){
            this.gateoutwardrgpReportData=data.data
            // this.gateoutwardReportData.forEach((element:any) => {
            //   element["Date"] = moment(element.Date).format("MM-DD-YYYY")
            //  });
            
            // console.log(this.gateIwardReportData); 
          }
          });
          
        }
        getHeaders3() {
          let headers: string[] = [];
          if(this.gateoutwardrgpReportData) {
            this.gateoutwardrgpReportData.forEach((value:any) => {
              Object.keys(value).forEach((key) => {
                if(!headers.find((header) => header == key)){
                  headers.push(key)
                  // console.log(headers);           
                }
              })
            })
          }
          return headers;
        }   
//excel reports
//xcel for gateinward
exportExcelinward(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEGIR.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `GateInwardReportData${moment().format('DD-MM-YYYY')}.xlsx`); 
}
exportExceloutward(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEGOR.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `GateOutwardReportData${moment().format('DD-MM-YYYY')}.xlsx`); 
}
exportExceloutwardnrgp(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLENRGP.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `GateOutwardNRGPReportData${moment().format('DD-MM-YYYY')}.xlsx`); 
}

exportExceloutwardrgp(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLERGP.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `GateOutwardRGPReportData${moment().format('DD-MM-YYYY')}.xlsx`); 
}

 //clear form
 gateinwardreportclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.gateIwardReportData=""; 
}
gateoutwardreportclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.gateoutwardReportData=""; 
}
gateoutwardnrgpreportclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.gateoutwardnrgpReportData=""; 
}
gateoutwardrgpreportclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.gateoutwardrgpReportData=""; 
}

}
