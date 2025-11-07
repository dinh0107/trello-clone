import { Component, computed, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/jobs/service/job.service';

@Component({
  selector: 'app-list-face',
  templateUrl: './list-face.component.html',
  styleUrl: './list-face.component.scss',
})
export class ListFaceComponent implements OnInit {
  @Input() cardId: number = 0;
  constructor(private service: JobService) {}
  ngOnInit(): void {
    this.service.getUserByCard(this.cardId).subscribe((users) => {
      this.service.setUserByCard(this.cardId, users);
    });
  }
  userOfCard = computed(() => {
    return this.service.userByCards().get(this.cardId) || [];
  });
}
