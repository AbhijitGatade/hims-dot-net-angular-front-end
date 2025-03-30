import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ipd',
  standalone: false,
  templateUrl: './edit-ipd.component.html',
  styleUrl: './edit-ipd.component.scss'
})
export class EditIpdComponent implements OnInit {

  isReadonly=true;
  ipdId:any;
  consultingdoctors: any;
  doctors: any;
  titles: any;
  companies: any;
  rooms: any;
  beds: any;
  patients: any;
  ipd: any;
  formSubmited: boolean = false;

  constructor(private api: ApiService, private datePipe: DatePipe, private router: Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
this.ipdId=this.route.snapshot.paramMap.get('ipdid');
console.log(this.ipdId);
    this.bind();
  }

  bind() {
    this.api.get("api/titles").subscribe((result: any) => {
      this.titles = result;
    });
    this.api.get("api/companies").subscribe((result: any) => {
      this.companies = result;
    });
    this.api.get("api/doctors").subscribe((result: any) => {
      this.doctors = result;
      this.consultingdoctors = result.filter((doctor: any) => {
        if (doctor.dtype == "Practice") {
          return doctor;
        }
      });
    });
    this.api.get("api/rooms").subscribe((result: any) => {
      this.rooms = result;
    });
    this.api.get("api/rooms/beds/0").subscribe((result: any) => {
      this.beds = result;
    });
    this.api.get("api/patients/ipd/"+this.ipdId).subscribe((result: any) => {
    
    this.ipd = {
      id:result.ip.id,
      patientid: result.ip.patientid,
      name:result.name,
      uidno:result.uidno,
      prefix:result.prefix,
      admissiondate:result.ip.admissiondate,
      admissiontime: result.ip.admissiontime,
      doctorid: result.ip.doctorid,
      refdoctorid: result.ip.doctorid,
      roomid: result.ip.roomid,
      bedid: result.ip.bedid,
      companyid: result.ip.companyid,
      remark:result.ip.remark,
      status: 'active'
    }
  console.log(this.ipd.admissiondate);

  });
  }

  onRoomChange(event: Event): void {
    const selectedRoomId = (event.target as HTMLSelectElement).value;
    this.ipd.bedid=0;
    this.api.get("api/Rooms/beds/" + selectedRoomId).subscribe((result: any) => {
      this.beds = result;
    });
  
  }
  save() {
    let formValidated = true;
    if(this.ipd.admissiondate == '' || this.ipd.admissiontime == '' || this.ipd.doctorid == 0 || this.ipd.refdoctorid == 0 || this.ipd.roomid == 0 || this.ipd.bedid == 0||this.ipd.companyid==0){
      formValidated = false;
    }
    if (formValidated) {
      let data = {
        id: this.ipdId,
        patientid:this.ipd.patientid,
       admissiondate:this.datePipe.transform(this.ipd.admissiondate, 'yyyy-MM-dd'),
        admissiontime: this.ipd.admissiontime,
        doctorid: this.ipd.doctorid,
        refdoctorid: this.ipd.refdoctorid,
        roomid: this.ipd.roomid,
        bedid: this.ipd.bedid,
        companyid: this.ipd.companyid,
        remark: this.ipd.remark
      };
      this.api.put("api/Patients/ipd/" + data.id, data).subscribe(
        (result: any) => {
          this.api.showSuccess("Record updated successfully.");
        });
      }
      else{
        this.api.showError("Please check the form and fill all the required fields.");
      }
    

   }

}
