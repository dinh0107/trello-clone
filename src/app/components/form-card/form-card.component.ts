import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from 'src/app/core/user';
import { JobService } from 'src/app/jobs/service/job.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent {
  @Input() id: any;

  addCard: FormGroup
  constructor(private fb: FormBuilder, private service: JobService) {
    this.addCard = this.fb.group({
      title: ['', Validators.required]
    })
  }
  // closeFormList(list: List) {
  //   list.IsOpen = false;
  //   this.addCard.reset()
  // }
  submitCard() {
    if (this.addCard.invalid) return
    const data = {
      Title: this.addCard.value.title,
      ListId: this.id
    }
    this.service.addCardToList(data).subscribe({
      next: (res) => {
        this.service.addStateToCard(res.Card, this.id)
        this.addCard.reset()
      }
    })
  }
}
