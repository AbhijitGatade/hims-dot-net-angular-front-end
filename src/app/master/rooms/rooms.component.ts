import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import Notiflix from 'notiflix';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-rooms',
  standalone: false,
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {

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
      prefix: new FormControl("", Validators.compose([Validators.required, this.noWhitespaceValidator])),
      oColor: new FormControl("", Validators.compose([Validators.required])),
      vColor: new FormControl("", Validators.compose([Validators.required]))
    });
    this.formdata.get('name')?.reset();
    this.formdata.get('prefix')?.reset();
    this.formdata.get('oColor')?.reset();
    this.formdata.get('vColor')?.reset();
    this.formSubmited = false;
    this.api.get("api/Rooms").subscribe((result: any) => {
      this.result = result;
    })
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
      // Handle invalid form submission
      return;
    }
    else {
      if (data.id == 0) {
        this.api.post("api/Rooms", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      } else {
        this.api.put("api/Rooms/" + data.id, data).subscribe((result: any) => {
          this.api.showSuccess("Record updated successfully.");
          this.bind();
        });
      }
    }
  }

  edit(id: number) {
    this.api.get("api/Rooms/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        prefix: result.prefix,
        oColor: result.oColor,
        vColor: result.vColor
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
        this.api.delete("api/Rooms/" + id).subscribe((result: any) => {
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
