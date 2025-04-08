import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opdcasepaper-print',
  standalone: false,
  templateUrl: './opdcasepaper-print.component.html',
  styleUrl: './opdcasepaper-print.component.scss'
})
export class OpdcasepaperPrintComponent implements OnInit{
  opdid:any;
  billid:any;
  opdPatient:any;
  isReadonly=true;
  billdetails:any;
  discountamount:any;
  paidamount:any;
  totalamount:any;
  pendingamount:any;
  subtotal:any;
  date:any;
  payment:any;
  hospitalDetails:any;

  constructor(private api:ApiService,private route:ActivatedRoute){}

  ngOnInit(): void {
   this.opdid=this.route.snapshot.paramMap.get('opdid');
   this.billid=this.route.snapshot.paramMap.get('billid');
   this.bind();
  }

  bind(){  
    this.api.get("api/HInformations").subscribe((result: any) => {
       console.log(result);
       this.hospitalDetails = result;
    });

    this.api.get("api/Opdbills/bills/"+this.billid).subscribe((result:any)=>{
      this.discountamount=result.discountamount,
      this.paidamount=result.paidamount,
      this.totalamount=result.totalamount,
      this.pendingamount=result.pendingamount,
       this.subtotal=result.billamount,
       this.date=result.createdon,
       this.payment=result.paymentmodeid
      console.log(result)
  });
    this.api.get("api/Opdbills/opdbillservices/"+this.billid).subscribe((result:any)=>{
        this.billdetails=result;
    });
    this.api.get("api/Opdpatients/"+this.opdid).subscribe((result:any)=>{
    
      this.opdPatient = {
        opdid:result.op.id,
        uidno:result.uidno,
         fullname:result.prefix+" "+result.patientName,
         opddate:result.op.opddate,
         address:result.address, 
         mobileno:result.mobileNo,
         doctorid:result.doctorName,
         refdoctorid:result.referralDoctor
      }
      console.log(this.opdPatient)
    });
   
  }

}

