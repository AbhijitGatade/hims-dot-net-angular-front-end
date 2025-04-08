import { Component, DoCheck, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-opb-bills',
  standalone: false,
  templateUrl: './opd-bills.component.html'
})
export class OpdBillsComponent implements OnInit {

  opdPatient: any;
  opdid: any;
  billid: any;
  opdservices: any;
  doctors: any;
  opdservicerate: any;
  opdbills: any;
  opdbillpayments: any;
  paymentmodes: any;
  ConcessionBy: any;
  rows: any;
  result: any;
  isReadonly = true;

  constructor(private api: ApiService, private route: ActivatedRoute, private datePipe: DatePipe) { }

 
  ngOnInit(): void {
    this.opdid = this.route.snapshot.paramMap.get('opdid');
    this.billid = this.route.snapshot.paramMap.get('billid');

    this.bind();
  }

  bind() {
    this.api.get("api/opdbills/" + this.opdid).subscribe((result: any) => {
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
    this.api.get("api/Opdpatients/" + this.opdid).subscribe((result: any) => {

      this.opdPatient = {
        opdid: result.op.id,
        uidno: result.uidno,
        fullname: result.prefix + " " + result.patientName,
        opddate: result.op.opddate,
        address: result.address,
        companyid: result.companyName,
        mobileno: result.mobileNo,
        doctorid: result.doctorName,
        refdoctorid: result.referralDoctor
      }
    });

    this.opdbills = {
      id: 0,
      opdid: this.opdid,
      totalamount: '',
      discountamount: '',
      Billamount: '',
      paidamount: '',
      pendingamount: 0,
      status: '',
      createdby: 1,
      paymentmodeid:0,
      concessionbyid:0,
    }

    this.rows = [{
      opdserviceid: 0,
      doctorid: 0,
      totalamount: '',
      concdiscount: '',
      discountamount: '',
      billamount: ''
    }];
  }

  save() {
    let formValidated = true;
    if(this.opdbills.concessionbyid == 0 || this.opdbills.paymentmodeid == 0|| this.rows.concdiscount==''){  
      formValidated = false;
    }

    this.opdbillpayments = {
      paymentdate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      billAmount: this.opdbills.Billamount,
      paidAmount: this.opdbills.paidamount,
      pendingAmount: this.opdbills.pendingamount,
      paymentid: this.opdbills.paymentmodeid,
      remark: this.opdbills.status,
      createdby: 1
    };
    if(formValidated){
    let data = {
      opdbill: this.opdbills,
      opdbillpayment: this.opdbillpayments,
      opdbillservice: [...this.rows]
    };
    console.log(this.opdbillpayments)
    
    this.api.post("api/opdbills", data).subscribe((result: any) => {
      this.api.showSuccess("Record added successfully.");
      this.bind();
    });
  }
  else{
    this.api.showError("Please check the form and fill all the required fields.");

  }
  }

  addRow(): void {
    this.rows.push({
      opdserviceid: 0,
      doctorid: 0,
      totalamount: '',
      concdiscount: '',
      discountamount: '',
      billamount: '',
    });
  }
  removeRow(index: number) {
    if (this.rows.length > 1) {
      this.rows.splice(index, 1);
      this.recalculate();
      this.updateTotalAmount(); 

    }
  }
  pendingcalculation(event: Event){
    const paidAmount = this.opdbills.paidamount
    this.opdbills.pendingamount=this.opdbills.Billamount-paidAmount;
  }
  recalculate() {
    this.rows.forEach((row:any) => {
      this.calculations(null, row); 
    });
  }

  getServiceRate(event: Event, row: any) {
    const selectedServiceId = row.opdserviceid;
    this.api.get("api/opdservices/0/" + selectedServiceId).subscribe((result: any) => {
      row.totalamount = result.rate;
      this.updateTotalAmount();
      console.log(result)
    });

  }

  updateTotalAmount() {
    const totalAmount = this.rows.reduce((sum: number, row: any) => sum + (row.totalamount || 0), 0);
    this.opdbills.totalamount = totalAmount;
  }
  

  calculations(event: Event | null, row: any) {
    const concDiscount = row.concdiscount;
    if (row.discountamount >= row.totalamount ||row.discountamount<0||row.concdiscount>100) {
      row.discountamount = '';
      row.concdiscount = '';
      row.billamount = '';
      this.opdbills.Billamount='',
      this.opdbills.discountamount=''

    } else {
      row.discountamount = row.totalamount * (row.concdiscount / 100);
      
      const discountamount = this.rows.reduce((sum: any, row: any) => sum + row.discountamount, 0);
      this.opdbills.discountamount = discountamount;
  
      row.billamount = row.totalamount - row.discountamount;
  
      const Billamount = this.rows.reduce((sum: any, row: any) => sum + row.billamount, 0);
      this.opdbills.Billamount = Billamount;
    }
  }
  
}
