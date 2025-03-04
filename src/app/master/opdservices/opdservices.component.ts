import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-opdservices',
  standalone: false,
  templateUrl: './opdservices.component.html'
})
export class OpdservicesComponent implements OnInit {
  formdata: any;
  result: any;
  opdservicecategories: any;
  formSubmited: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required, this.noWhitespaceValidator])),
      opdservicecategoryid: new FormControl(0, Validators.compose([Validators.required])),
      srno: new FormControl(0, Validators.compose([Validators.required])),
      rate: new FormControl(0, Validators.compose([Validators.required])),
      frate: new FormControl(0, Validators.compose([Validators.required]))
    });
    this.formdata.get('name')?.reset();
    this.formdata.get('opdservicecategoryid')?.reset();
    this.formSubmited = false;

    this.api.get("api/opdservices/0").subscribe((result: any) => {
      this.result = result;
    });
    this.api.get("api/Opdservicecategories").subscribe((result: any) => {
      this.opdservicecategories = result;
    });
  }

 // Custom validator to ensure no leading/trailing spaces
 noWhitespaceValidator(control: any) {
  if (control.value && control.value.trim().length === 0) {
    return { 'whitespace': true };
  }
  return null;
}


  save(data: any) {
    if (this.formdata.invalid) {
      this.formSubmited = true;
      return;
    }
    else {
      if (data.id == 0) {
        this.api.post("api/opdservices", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      }
      else {
        this.api.put("api/opdservices/" + data.id, data).subscribe((result: any) => {
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
        this.api.delete("api/opdservices/" + id).subscribe((result: any) => {
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
    this.api.get("api/opdservices/0/" + id).subscribe((result: any) => {
      console.log(result);
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        opdservicecategoryid: result.opdservicecategoryid,
        srno: result.srno,
        rate: result.rate,
        frate: result.frate
      });
    })
  }

}
