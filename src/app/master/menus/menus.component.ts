import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-menus',
  standalone: false,
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent implements OnInit {

  formdata: any;
  result: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      title: new FormControl(""),
      link: new FormControl(""),
      srno: new FormControl(0),
      isparentmenu: new FormControl(""),
      parentmenuid: new FormControl(0)
    });
    this.api.get("api/Menus").subscribe((result: any) => {
      // console.log(result);
      this.result = result;
    })
  }

  save(data: any) {
    if (data.id == 0) {
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
      this.formdata.patchValue({
        id: result.id,
        title: result.title,
        link: result.link,
        srno: result.srno,
        isparentmenu: result.isparentmenu,
        parentmenuid: result.parentmenuid
      });
    })
  }



}
