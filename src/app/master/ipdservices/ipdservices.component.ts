import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-ipdservices',
  standalone: false,
  templateUrl: './ipdservices.component.html'
})
export class IpdservicesComponent implements OnInit {
  formdata: any;
  result: any;
  ipdservicecategories: any;
  formSubmited: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      ipdservicecategoryid: new FormControl(0, Validators.compose([Validators.required])),
      srno: new FormControl(0, Validators.compose([Validators.required])),
      allowselectdoctor: new FormControl(false, Validators.compose([Validators.required])),
      isitroom: new FormControl(false, Validators.compose([Validators.required])),
      changesasperroom: new FormControl(false, Validators.compose([Validators.required])),
      defaultrate: new FormControl(0, Validators.compose([Validators.required]))
       
    });
    this.api.get("api/ipdservices/0").subscribe((result: any) => {
      this.result = result;
      console.log(result)
    });
    this.api.get("api/Ipdservicecategories").subscribe((result: any) => {
      this.ipdservicecategories = result;
    });
  }

  save(data: any) {
    if (this.formdata.invalid) {
      this.formSubmited = true;
      return;
    }
    else {
      if (data.id == 0) {
        this.api.post("api/ipdservices", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      }
      else {
        this.api.put("api/ipdservices/" + data.id, data).subscribe((result: any) => {
          this.api.showSuccess("Record updated successfully.");
          this.bind();
        });
      }
    }
  }

  delete(id: number) {
    Notiflix.Confirm.show(
      'Please Confirm',
      'Are you sure you want to delete?',
      'Yes',
      'No',
      () => {
        this.api.delete("api/ipdservices/" + id).subscribe((result: any) => {
          this.api.showSuccess("Record deleted successfully");
          this.bind();
        });
      },
      () => {
        //Cancel Operation
      }
    );
  }

  edit(id: number) {
    this.api.get("api/ipdservices/0/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        ipdservicecategoryid: result.ipdservicecategoryid,
        srno: result.srno,
        defaultrate: result.defaultrate,
        allowselectdoctor: result.allowselectdoctor,
        isitroom:result.isitroom,
        changesasperroom:result.changesasperroom
      });
    })
  }

}