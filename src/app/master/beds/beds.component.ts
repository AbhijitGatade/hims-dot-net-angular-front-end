import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-beds',
  standalone: false,
  templateUrl: './beds.component.html',
  styleUrl: './beds.component.scss'
})
export class BedsComponent implements OnInit {
  roomid: any;
  formdata: any;
  result: any;
  formSubmited: boolean = false;


  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit(): void {
    this.roomid = this.route.snapshot.paramMap.get('roomid');

    this.bind();
  }

  bind() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      roomid: new FormControl(this.roomid)
    });
    this.roomid = this.route.snapshot.paramMap.get('roomid');
    this.api.get("api/Rooms/beds/" + this.roomid).subscribe((result) => {
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
    else {
      if (data.id == 0) {
        this.api.post("api/Rooms/beds", data).subscribe((result: any) => {
          this.api.showSuccess("Record added successfully.");
          this.bind();
        });
      } else {
        this.api.put("api/Rooms/Beds/" + data.id, data).subscribe((result: any) => {
          this.api.showSuccess("Record updated successfully.");
          console.log(result);
          this.bind();
        });
      }
    }
  }

  edit(id: number) {
    this.api.get("api/Rooms/Beds/0/" + id).subscribe((result: any) => {
      console.log(result);
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        roomid: result.roomid
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
        this.api.delete("api/Rooms/Beds/" + id).subscribe((result: any) => {
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
