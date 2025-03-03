import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import Notiflix from 'notiflix';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-opdservicecategories',
  standalone: false,
  templateUrl: './opdservicecategories.component.html',
})
export class OpdservicecategoriesComponent implements OnInit {

  formdata: any;
  result: any;
  formSubmited: boolean = false;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required]))
      
    });
    this.api.get("api/opdservicecategories").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    })
  }

  save(data: any) {
    if (this.formdata.invalid) {
      this.formSubmited = true;
      // Handle invalid form submission
      return;
    }
    else {
      if (data.id == 0) {
        this.api.post("api/opdservicecategories", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      } else {
        this.api.put("api/opdservicecategories/" + data.id, data).subscribe((result: any) => {
          this.api.showSuccess("Record updated successfully.");
          this.bind();
        });
      }
    }
  }

  edit(id: number) {
    this.api.get("api/opdservicecategories/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name
      });
    })
  }

  delete(id: number) {
    Notiflix.Confirm.show(
      'Please Confirm',
      'Are you sure you want to delete?',
      'Yes',
      'No',
      () => {
        this.api.delete("api/opdservicecategories/" + id).subscribe((result: any) => {
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

