import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthApiService } from '../../service/auth-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup

  constructor(private http: HttpClient, private service: AuthApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators, require],
      phone: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
