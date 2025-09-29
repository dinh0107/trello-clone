import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthApiService } from 'src/app/auth/service/auth-api.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-update-info',
  standalone: false,
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  form: FormGroup
  info?: User
  birthDate: Date | null = null;

  constructor(private Servie: AuthApiService) { }

  ngOnInit() {
    this.info = this.Servie.getUser()
  }

}
