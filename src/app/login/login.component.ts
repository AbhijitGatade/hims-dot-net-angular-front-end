import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formdata: FormGroup;
  formSubmited = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.formdata = this.fb.group({
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      password: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }

  noWhitespaceValidator(control: any) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  login(data: any) {
    this.formSubmited = true;
    if (this.formdata.valid) {
      this.isLoading = true;
      this.api.post("api/authentication/login", data).subscribe((result: any) => {
        this.isLoading = false;
        if (result.status == "failed") {
          this.api.showError("Username or password is invalid.");
        } else {
          localStorage.setItem("user", JSON.stringify({ name: result.user.name, username: result.user.username, roleid: result.user.roleid }));
          localStorage.setItem("topmenus", JSON.stringify(result.topmenus));
          localStorage.setItem("navmenus", JSON.stringify(result.navmenus));
          localStorage.setItem("childmenus", JSON.stringify(result.childmenus));
          this.router.navigate(["/dashboard"]);
        }
      });
    }
  }
}
