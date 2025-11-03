import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../service/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  loading = false
  message = ''
  refreshToken = ''
  constructor(private fb: FormBuilder, private authService: AuthApiService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.loading = true
    if (this.form.invalid) {
      this.loading = false
      return
    }
    const { email, password } = this.form.value
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.authService.checkAuth(true).subscribe(isAuth => {
          if (isAuth) this.router.navigateByUrl('/')
        })
      },
      error: err => {
        console.log(err)
        if (err.error && err.error.Message) {
          this.message = err.error.Message;
        } else {
          this.message = "Có lỗi xảy ra, vui lòng thử lại!";
        }
        this.loading = false
      }
    })
  }
}
