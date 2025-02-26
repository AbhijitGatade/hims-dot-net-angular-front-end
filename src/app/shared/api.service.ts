import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:5287/";

  constructor(private toastr:ToastrService, private http:HttpClient) { }

  get(path:string){
    return this.http.get(this.baseurl + path);
  }

  post(path:string, data:any){
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
}
