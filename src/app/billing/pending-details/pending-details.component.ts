import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-pending-details',
  standalone: false,
  templateUrl: './pending-details.component.html',
  styleUrl: './pending-details.component.scss'
})
export class PendingDetailsComponent implements OnInit {
  formdata: any;
  paymentmodes: any;
  billAmount: any;
  totalPaid: any;
  pendingPayment: any;
  formSubmited: boolean = false;
  billid: any;
  result: any;
  paymentid:any;
  previousbilldate:any;
  isReadonly=true;
  constructor(private api: ApiService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.billid = this.route.snapshot.paramMap.get('billid');
    this.bind();
  }

  bind() {
    this.api.get("api/paymentmodes").subscribe((result: any) => {
      this.paymentmodes = result;
    });


    this.api.get("api/Opdbillpayments/" + this.billid).subscribe((result: any) => {
      this.result = result;
    });
    this.api.get("api/Opdbills/bills/" + this.billid).subscribe((result: any) => {
       console.log(result);
       this.previousbilldate=result.createdon,
      this.billAmount = result.billamount,
        this.totalPaid = result.paidamount,
        this.pendingPayment = result.pendingamount
    });
    this.formdata = {
      Id: 0,
      billid:this.billid,
      paymentid: 0,
      BillAmount:0,
      paidAmount: 0,
      pendingAmount: 0,
      remark: '',
      createdby: 1,
      paymentdate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    };

  }
  save() {
  
  let data=this.formdata;
    if (data.Id == 0) {
      this.formdata.BillAmount=parseFloat(this.totalPaid)+parseFloat(this.formdata.paidAmount);
    //  this.formdata.pendingAmount=parseFloat(this.billAmount)-parseFloat(this.formdata.paidAmount);

      this.api.post("api/Opdbillpayments", data).subscribe((result: any) => {
        this.api.showSuccess("Payment recorded successfully.");
        this.bind();
      });
    }
    else {
      // this.formdata.pendingAmount=this.formdata.BillAmount-this.formdata.paidAmount;

      this.api.put("api/Opdbillpayments/"+this.paymentid, data).subscribe((result: any) => {
        this.api.showSuccess("Payment recorded successfully.");
        this.bind();
      });
   
    }
  }

 
  edit(id:number) {
    this.paymentid=id;
    this.api.get("api/Opdbillpayments/" + this.billid + "/" + id).subscribe((result: any) => {
      const results = result[0];
      this.formdata = {
        Id: results.id,
        billid:this.billid,
       billamount:results.billAmount,
        paymentid: results.paymentid,
        paidAmount: results.paidAmount,
        // pendingAmount: results.pendingAmount,
        remark: results.remark,
        createdby: results.createdby,
        paymentdate: results.paymentdate
      };
    })
  }
  delete(id: number) {
      Notiflix.Confirm.show(
        'Please Confirm',
        'Are you sure you want to delete?',
        'Yes',
        'No',
        () => {
          this.api.delete("api/Opdbillpayments/" + id).subscribe((result: any) => {
            this.api.showSuccess("Record deleted successfully");
            this.bind();
          });
        },
        () => {
          //Cancel Operation
        }
      );
    }
}

