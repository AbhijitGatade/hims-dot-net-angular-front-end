import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  formdata: any;
  result: any;
  rolesresult: any;
  formSubmited: boolean = false;

  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("",Validators.compose([Validators.required])),
      username: new FormControl("",Validators.compose([Validators.required])),
      password: new FormControl("",Validators.compose([Validators.required])),
      roleid: new FormControl(0)
    });
    this.api.get("api/Roles").subscribe((result: any) => {
      // console.log(result);
      this.rolesresult = result;
    });

    this.api.get("api/Users/0").subscribe((result: any) => {
      // console.log(result);
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
      this.api.post("api/Users", data).subscribe((result: any) => {
        this.api.showSuccess("Record added successfully.");
        this.bind();
      });
    }
    else {
      this.api.put("api/Users/" + data.id, data).subscribe((result: any) => {
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
        this.api.delete("api/Users/" + id).subscribe((result: any) => {
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
    this.api.get("api/Users/0/" + id).subscribe((result: any) => {
      // console.log(result);
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        username: result.username,
        password: result.password,
        roleid: result.roleid
      });
    })
  }

}
