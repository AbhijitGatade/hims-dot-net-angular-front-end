import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  menus:any;
  
  constructor(private api:ApiService){
    this.api.parentMenuIdSubject.subscribe(menuId => {
      this.menus = this.api.getNavbarMenus(menuId);
    });
  }

  ngOnInit(): void {
  }

}

