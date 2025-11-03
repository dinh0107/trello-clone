import { Component, OnInit } from '@angular/core';
import { BoadServiceService } from './boadService.service';
import { Board } from '../core/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  constructor(private boardService: BoadServiceService, private route: Router) { }

  ngOnInit(): void {
    this.boardService.getBoard()
  }

  get boards() {
    return this.boardService.boards()
  }

  redirec(id?: number) {
    if (!id) {
      console.log("id null")
    }
    this.route.navigate(['/bang', id])
  }
}
