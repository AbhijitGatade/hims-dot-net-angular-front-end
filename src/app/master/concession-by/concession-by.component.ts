import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-concession-by',
  standalone: false,
  templateUrl: './concession-by.component.html'
})
export class ConcessionByComponent implements OnInit {

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
      name: new FormControl("",Validators.compose([Validators.required]))
    });
    this.api.get("api/ConcessionBy").subscribe((result: any) => {
      this.result = result;
    });
  }

  save(data: any) {
    
    if (this.formdata.invalid) {
      this.formSubmited = true;
      // Handle invalid form submission
      return;
    }
    else{
    if (data.id == 0) {
      this.api.post("api/ConcessionBy", data).subscribe((result: any) => {
        this.api.showSuccess("Record added successfully.");
        this.bind();
      });
    }
    else {
      this.api.put("api/ConcessionBy/" + data.id, data).subscribe((result: any) => {
        this.api.showSuccess("Record updated successfully.");
        // console.log(result);
        this.bind();
      });
    }
    }
  }

  edit(id: number) {
    this.api.get("api/ConcessionBy/" + id).subscribe((result: any) => {
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
        this.api.delete("api/ConcessionBy/" + id).subscribe((result: any) => {
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
