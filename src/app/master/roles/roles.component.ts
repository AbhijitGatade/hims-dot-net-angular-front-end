import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})

export class RolesComponent implements OnInit {
  formdata: any;
  result: any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }


  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("")
    });

    this.api.get("api/Roles").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    });
  }

  save(data: any) {
    // console.log(data);
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
