import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError } from 'rxjs';
import { BoadServiceService } from 'src/app/board/boadService.service';
import { Background } from 'src/app/core/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-CreatBoard',
  templateUrl: './CreatBoard.component.html',
  styleUrls: ['./CreatBoard.component.css']
})
export class CreatBoardComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>()
  background = "";
  backgroundSelected = "";
  createForm: FormGroup

  close() {
    this.onClose.emit()
  }

  constructor(private serviceBoad: BoadServiceService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.serviceBoad.getBackground().subscribe({
      next: (res) => {
        this.background = res
        this.backgroundSelected = res[0]
      }
    })
  }


  onSubmit() {
    if (this.createForm.invalid) return
    const title = this.createForm.value.title;
    this.serviceBoad.createdBoard(title, this.backgroundSelected).subscribe({
      next: res => {
        if (res.Success) {
          this.close()
          this.serviceBoad.boards.update(a => [...res.data, ...a])
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Tạo board thành công',
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    })
  }
}
