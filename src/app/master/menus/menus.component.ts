import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-menus',
  standalone: false,
  templateUrl: './menus.component.html'
})
export class MenusComponent implements OnInit {

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
      title: new FormControl("", Validators.compose([Validators.required])),
      link: new FormControl("", Validators.compose([Validators.required])),
      srno: new FormControl(0, Validators.compose([Validators.required])),
      isparentmenu: new FormControl(false),
      parentmenuid: new FormControl(0, Validators.compose([Validators.required]))
    });
    this.api.get("api/Menus").subscribe((result: any) => {
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
        // console.log(data);
        this.api.post("api/Menus", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      } else {
        this.api.put("api/Menus/" + data.id, data).subscribe((result: any) => {
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
        this.api.delete("api/Menus/" + id).subscribe((result: any) => {
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
    
    this.api.get("api/Menus/" + id).subscribe((result: any) => {
          
      if(result.isparentmenu=="true")
        {
        this.formdata.patchValue({
          id: result.id,
          title: result.title,
          link: result.link,
          srno: result.srno,
          isparentmenu: result.isparentmenu,
          parentmenuid:result.parentmenuid
        });

      }
      else
      {
        this.formdata.patchValue({
          id: result.id,
          title: result.title,
          link: result.link,
          srno: result.srno,
          parentmenuid:result.parentmenuid
        });

      }
      
    });
    this.bind();
  
  }

}
