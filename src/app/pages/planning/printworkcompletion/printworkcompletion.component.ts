import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgxPrintElementService } from "ngx-print-element";
import * as converter from 'number-to-words'
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-printworkcompletion',
  templateUrl: './printworkcompletion.component.html',
  styleUrls: ['./printworkcompletion.component.scss']
})
export class PrintworkcompletionComponent implements OnInit {
  data1: any;

  constructor(
    private custservice: CustomerService,
    public print: NgxPrintElementService,
    private router:Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  public config = {
    printMode: "template",
    popupProperties: "window.open",
  };

  number:any
  WCRdetails:any[]=[]

  getwcrdetails(){
    let obj = {
      "command" : "mat",
      "number" : this.data1
    }
    this.custservice.printWCRdetails(obj).subscribe((res:any)=>{
      console.log(res.message)
      this.WCRdetails = res.message
    })
  }
  backtowc(){
    this.router.navigate(["/planning/workcompletion"], {
      queryParams: { tab: "notifications" },
    });
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.data1=params['wcnumber'];
      
      // }
    });
    this.getwcrdetails()
  }

}
