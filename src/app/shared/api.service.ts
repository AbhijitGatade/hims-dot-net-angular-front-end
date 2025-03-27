import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:5287/";

  parentMenuIdSubject = new BehaviorSubject<number>(0); 

  constructor(private toastr:ToastrService, private http:HttpClient) { }

  get(path:string){
    return this.http.get(this.baseurl + path);
  }

  postpatient(path: string, data: any) {
    return this.http.post(this.baseurl + path, data, { responseType: 'text' });
  }
  

  post(path: string, data: any){
    return this.http.post(this.baseurl + path, data);
  }

  put(path:string, data:any){
    return this.http.put(this.baseurl + path, data);
  }

  delete(path:string){
    return this.http.delete(this.baseurl + path);
  }

  showSuccess(message:string){
    this.toastr.success(message, "Success", {
      timeOut: 3000,
    });
  }

  showError(message:string){
    this.toastr.error(message, "Error", {
      timeOut: 3000,
    });
  }

  getNavbarMenus(parentmenuid:number){
    let navmenus = JSON.parse(localStorage.getItem("navmenus") || "[]");
      let childmenus = JSON.parse(localStorage.getItem("childmenus") || "[]");    
      let menus = navmenus.filter((navmenu:any)=>{
        if(navmenu.parentmenuid == parentmenuid){
          navmenu.childmenus = childmenus.filter((childmenu:any)=>{
            if(navmenu.id == childmenu.parentmenuid){
              return childmenu;
            }
          });
          return navmenu;
        }
      });
      return menus;
  }

}
