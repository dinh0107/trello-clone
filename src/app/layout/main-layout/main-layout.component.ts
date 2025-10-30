import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/auth/service/auth-api.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  userInfo: User | null = null
  dropdownOpen = false;
  toggleForm = false
  constructor(private service: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    this.service.getInfoUser().subscribe({
      next: (data) => {
        this.service.setUser(data)
      }
    })
    this.service.currentUser$.subscribe(a => {
      this.userInfo = a
    })
  }
  
  displayForm (){
    this.toggleForm = ! this.toggleForm
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  onClickOutside(event: Event) {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }



  logout() {
    this.service.logout().subscribe({
      next: () => {
        this.service.removeUser()
        this.router.navigate(['/auth/login']);
      }
    })
  }
}
