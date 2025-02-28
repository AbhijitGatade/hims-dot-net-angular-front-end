import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }


  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      ikey: new FormControl(""),
      ivalue: new FormControl("")
    });

    this.api.get("api/HInformations").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    });

  }

  save(data: any) {
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
