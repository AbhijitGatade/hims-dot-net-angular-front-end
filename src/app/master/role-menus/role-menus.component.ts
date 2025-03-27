import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-role-menus',
  standalone: false,
  templateUrl: './role-menus.component.html'
})
export class RoleMenusComponent implements OnInit {
  roleid: any;
  role:any;
  result: any;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.roleid = this.route.snapshot.paramMap.get('roleid');
    this.bind();
  }

  bind() {
    // Fetch role data
    this.api.get(`api/Roles/${this.roleid}`).subscribe((result: any) => {
      this.role = result;
    });

    this.api.get('api/Roles/menus/' + this.roleid).subscribe((result:any)=>{
      this.result = result;
    });
  }

  menuChecked(event:Event, menuid:number, roleMenuId:number){
      let checkbox = <HTMLInputElement>event.target;
      if(checkbox.checked){
        this.api.post("api/Roles/menu/" + this.roleid + "/" + menuid, null).subscribe((result:any)=>{
          this.api.showSuccess("Menu added.");
        });
      }else{
        this.api.delete("api/Roles/menu/" + roleMenuId).subscribe((result:any)=>{
          this.api.showSuccess("Menu removed.");
        });
      }
  }
}
