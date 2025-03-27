import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Notiflix from 'notiflix';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html'
})

export class TopbarComponent implements OnInit {

  menus:any;
  user = {name:""};

  constructor(private api:ApiService, private router:Router){
    if(localStorage.getItem("user") != null){
      this.user = JSON.parse(localStorage.getItem("user") || "{}");
    }else{
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.menus = JSON.parse(localStorage.getItem("topmenus") || "[]");
  }

  menuClicked(id:number){
    this.api.parentMenuIdSubject.next(id);
  }

  logout(){
     Notiflix.Confirm.show(
          'Please Confirm',
          'Are you sure you want to exit?',
          'Yes',
          'No',
          () => {
            localStorage.clear();
            this.router.navigate(["/"]);
          },
          () => {
            //Cancel Operation
          }
        );
  }

}