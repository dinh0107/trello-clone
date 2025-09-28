import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../auth/service/auth-api.service';
import { User } from '../core/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private service: AuthApiService) { }
  user?: User
  ngOnInit(): void {
    this.service.getInfoUser().subscribe({
      next: data => this.user = data
    })
  }

}
