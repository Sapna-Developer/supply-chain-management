import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SignaturePad } from 'ngx-signaturepad';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { Overlay } from "ngx-toastr";
import { DomSanitizer } from "@angular/platform-browser";
import { event } from "jquery";
import Swal from "sweetalert2";
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  demo1TabIndex: any = 0;
  clro: any={
    canvasWidth: 520,
    canvasHeight: 300,
     penColor: "blue",
    minWidth: 1
  };


  @ViewChild(SignaturePad) signaturePad: any;
  imageUrl: any;
  signature: any;
  SignatureData: any;
  Viewsign: any;
  drawSignature: boolean=false;
  img: any;
  fileName: any;

  constructor(private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private injector: Injector) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.tab == "notificationsissue") {
        this.demo1TabIndex = 1;
        console.log(params);
      } else {
        this.demo1TabIndex = 0;
      }
    });
    this.getSignatureData();
  }

  clear() {
    if(!this.img){
      this.signaturePad.clear();
    }else{
      this.img="";
    }
  }
  saveSign() {
    if(this.img){
      const postData = new FormData();
      postData.append("command", "add");
      postData.append("image", this.img );
      this.custservice.SignatureUpload(postData).subscribe((res:any)=>{
        if(res.status_code === 200){
          this.SignatureData=res.data
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          console.log(res);
          this.getSignatureData();
          this.signaturePad.clear();
          this.drawSignature=false;
          this.img="";
        }else{
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "error",
            // title: res['reference'],
            width: 500,
          });
        }  
      }) 
    }else{
      this.imageUrl = this.signaturePad.toDataURL();
      const imageBlob = this.dataURItoBlob(this.imageUrl);
      var file = new File([imageBlob], "fileName.jpeg", {
        type: "'image/jpeg'"
      });
      this.signature=file
        const postData = new FormData();
        postData.append("command", "add");
        postData.append("image", file );
        this.custservice.SignatureUpload(postData).subscribe((res:any)=>{
          if(res.status_code === 200){
            Swal.fire({
              text: res["message"],
              title: res["reference"],
              icon: "success",
              // title: res['reference'],
              width: 500,
            });
            this.SignatureData=res.data
            console.log(res);
            this.getSignatureData();
            this.signaturePad.clear();
            this.drawSignature=false;
            this.fileName="";
            this.img="";
          }  else{
            Swal.fire({
              text: res["message"],
              title: res["reference"],
              icon: "error",
              // title: res['reference'],
              width: 500,
            });
          } 
        })
    }
   
  }
  dataURItoBlob(dataURI: any) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  getSignatureData(){
    const postData = new FormData();
    postData.append("command", "lst");
    this.custservice.SignatureUpload(postData).subscribe((res:any)=>{
      console.log(res);
      // this.Viewsign=res.data[0].signature;
      this.Viewsign=  this.sanitizer.bypassSecurityTrustResourceUrl(res.data[0].signature);
      console.log(this.Viewsign);
           
          });
  }
  draw(){
    this.drawSignature=true
  }

  //upload
  // uploadimage(){
  //   this.onFileChanged(event);
  // }
  onFileChanged(event:any) {
    this.img = event.target.files[0];
    this.fileName= event.target.files[0].name
    
  }
  // fileToUpload: any;
  // imageUrl1: any;
  // handleFileInput(file: FileList) {
  //   this.fileToUpload = file.item(0);

  //   //Show image preview
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl1 = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  // uploadimage(){
  //   console.log(this.imageUrl1);
    
  //   const postData = new FormData();
  //   postData.append("command", "add");
  //   postData.append("image", this.imageUrl1 );
  //   this.custservice.SignatureUpload(postData).subscribe((res:any)=>{
  //     if(res.status_code === 200){
  //       this.SignatureData=res.data
  //       console.log(res);
  //       this.getSignatureData();
  //       // this.signaturePad.clear();
  //       // this.drawSignature=false;
  //     }   
  //   })
  // }

}
