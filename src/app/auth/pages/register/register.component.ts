import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthApiService } from '../../service/auth-api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup
  loading = false
  message = ''

  constructor(private service: AuthApiService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }),
      { validators: this.passwordMatchValidator }
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value
    return password === confirmPassword ? null : { mismatch: true }
  }

  onSubmit() {
    this.loading = true
    if (this.form.invalid) {
      this.loading = false
      return
    }
    const { fullName, phone, email, password } = this.form.value
    this.service.registerService(fullName, phone, email, password).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: err => {
        this.loading = false
        this.message = err.message
        console.log(err)
      }
    })
  }
}
