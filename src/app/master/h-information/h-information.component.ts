import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-h-information',
  standalone: false,
  templateUrl: './h-information.component.html',
  styleUrl: './h-information.component.scss'
})
export class HInformationComponent implements OnInit {
  formdata: any;
  result: any;
  namename:any;
  formSubmited: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      ikey: new FormControl("",Validators.compose([Validators.required])),
      ivalue: new FormControl("",Validators.compose([Validators.required]))
    });

    this.api.get("api/HInformations").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    });
  }

  save(data: any) {
  // Set the flag to true when the submit button is clicked

    if (this.formdata.invalid) {
      this.formSubmited = true;
      // Handle invalid form submission
      return;
    }
    else{
    if (data.id == 0) {
      this.api.post("api/HInformations", data).subscribe((result: any) => {
        this.api.showSuccess("Record added successfully.");
        this.bind();
      });
    }
    else {
      this.api.put("api/HInformations/" + data.id, data).subscribe((result: any) => {
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
        this.api.delete("api/HInformations/" + id).subscribe((result: any) => {
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
    this.api.get("api/HInformations/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        ikey: result.ikey,
        ivalue: result.ivalue
      });
    })
  }
}
