import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opdcasepaper',
  standalone: false,
  templateUrl: './opdcasepaper.component.html',
  styleUrl: './opdcasepaper.component.scss'
})
export class OpdcasepaperComponent implements OnInit{
  opdid:any;
  billid:any;
  opdPatient:any;
  hospitalDetails:any;
  isReadonly=true;
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
    this.api.get("api/Opdpatients/"+this.opdid).subscribe((result:any)=>{
      console.log(result)
      this.opdPatient = {
        opdid:result.op.id,
         fullname:result.prefix+" "+result.patientName+ "("+result.uidno+")",
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
