import { Component, DoCheck, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opb-bills',
  standalone: false,
  templateUrl: './opd-bills.component.html'
})
export class OpdBillsComponent implements OnInit,DoCheck {
  opdPatient:any;
  opdid:any;
  billid:any;
  opdservices:any;
  doctors:any;
  opdservicerate:any;
  opdbills:any;
  paymentmodes:any;
  ConcessionBy:any;
  rows:any;
  result:any;
  isReadonly = true;

  constructor(private api:ApiService,private route:ActivatedRoute){}

  ngDoCheck(): void {
    
  }
  ngOnInit(): void {
     this.opdid=this.route.snapshot.paramMap.get('opdid');
     this.billid=this.route.snapshot.paramMap.get('billid');
  
  this.bind();
  }

  bind(){
    this.api.get("api/opdbills/"+this.opdid).subscribe((result:any) => {
      this.result = result;
      console.log(this.result) 
    
        });
  

    this.api.get("api/opdservices/0").subscribe((result: any) => {
       this.opdservices = result;
    });
    this.api.get("api/doctors").subscribe((result: any) => {
      this.doctors = result;
   });
   this.api.get("api/paymentmodes").subscribe((result: any) => {
    this.paymentmodes = result;
 });
 this.api.get("api/ConcessionBy").subscribe((result: any) => {
  this.ConcessionBy = result;
});
    this.api.get("api/Opdpatients/"+this.opdid).subscribe((result:any)=>{
      
      this.opdPatient = {
        opdid:result.op.id,
         uidno:result.uidno,
         fullname:result.prefix+" "+result.patientName,
         opddate:result.op.opddate,
         address:result.address, 
         companyid:result.companyName,
         mobileno:result.mobileNo,
         doctorid:result.doctorName,
         refdoctorid:result.referralDoctor

      }
    });

    this.opdbills={
      id:0,
      opdid:this.opdid,
      totalamount:'',
      discountamount:'',
      Billamount:'',
      paidamount:'',
      status:'',
      createdby:1,
      paymentmodeid:1,
      concessionbyid:'',
      
    }
    this.rows = [{
      opdserviceid: 0,
      doctorid: 0,
      totalamount: '',
      concdiscount: '',
      discountamount: '',
      billamount:''
    }];
  }
  
 save() {
      let data = {
       opdbill: this.opdbills,
          opdbillservice:[...this.rows]
      }
    this.api.post("api/opdbills",data).subscribe((result:any)=>{
      this.api.showSuccess("Record added successfully.");
      this.bind();
    });
    }

  addRow(): void {
    
     this.rows.push({
      opdserviceid: 0,
      doctorid: 0,
      totalamount: '',
      concdiscount: '',
      discountamount: '',
      billamount:'',
    });
  }
  removeRow(index: number) {
    if (this.rows.length > 1) {
      this.rows.splice(index, 1);
    }
  }
  getServiceRate(event: Event, row: any) {
    const selectedServiceId = row.opdserviceid;
    this.api.get("api/opdservices/0/"+selectedServiceId).subscribe((result: any) => {
    row.totalamount = result.rate;
    const totalAmount = this.rows.reduce((sum:any, row:any) => sum + row.totalamount, 0);
    this.opdbills.totalamount=totalAmount;
     console.log(result)
   });

  }
  
  calculations(event:Event,row:any){
    const concDiscount =row.concdiscount;
    if(row.discountamount>row.totalamount)
    {
      row.discountamount='';
      row.concdiscount='';
      row.billamount='';
    }
    else
    {
    row.discountamount=row.totalamount*(row.concdiscount/100);
    const discountamount = this.rows.reduce((sum:any, row:any) => sum + row.discountamount, 0);
   this.opdbills.discountamount=discountamount;
   row.billamount=row.totalamount-row.discountamount;
   const Billamount = this.rows.reduce((sum:any, row:any) => sum + row.billamount, 0);
   this.opdbills.Billamount=Billamount;
   this.opdbills.paidamount=this.opdbills.Billamount;
    }
  }
}
