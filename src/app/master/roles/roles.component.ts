import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html'
})

export class RolesComponent implements OnInit {
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
      name: new FormControl("", Validators.compose([Validators.required, this.noWhitespaceValidator])),
    });
    this.formdata.get('name')?.reset();
    this.formSubmited = false;

    this.api.get("api/Roles").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
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
    // console.log(data);
    if (this.formdata.invalid) {
      this.formSubmited = true;
      // Handle invalid form submission
      return;
    }
    else {
      if (data.id == 0) {
        this.api.post("api/Roles", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      }
      else {
        this.api.put("api/Roles/" + data.id, data).subscribe((result: any) => {
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
        this.api.delete("api/Roles/" + id).subscribe((result: any) => {
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
    this.api.get("api/Roles/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name
      });
    })
  }
}
