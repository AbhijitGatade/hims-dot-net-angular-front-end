import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-discharge-exercise',
  standalone: false,
  templateUrl: './discharge-exercise.component.html',
  styleUrl: './discharge-exercise.component.scss'
})
export class DischargeExerciseComponent implements OnInit {

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
      name: new FormControl("",Validators.compose([Validators.required, this.noWhitespaceValidator]))
    });

    this.formdata.get('name')?.reset();
    this.formSubmited = false;

    this.api.get("api/Discharge/Exercises").subscribe((result: any) => {
      this.result = result;
    });
  }

  noWhitespaceValidator(control: any) {
    if (control.value && control.value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  save(data: any) {
    
    if (this.formdata.invalid) {
      this.formSubmited = true;
      return;
    }
    else{
    if (data.id == 0) {
      this.api.post("api/Discharge/Exercises", data).subscribe((result: any) => {
        this.api.showSuccess("Record added successfully.");
        this.bind();
      });
    }
    else {
      this.api.put("api/Discharge/Exercises/" + data.id, data).subscribe((result: any) => {
        this.api.showSuccess("Record updated successfully.");
        // console.log(result);
        this.bind();
      });
    }
    }
  }

  edit(id: number) {
    this.api.get("api/Discharge/Exercises/" + id).subscribe((result: any) => {
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
        this.api.delete("api/Discharge/Exercises/" + id).subscribe((result: any) => {
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


