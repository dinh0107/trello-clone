import { Component, OnInit } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-loading',
  standalone:false,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) { }

}
