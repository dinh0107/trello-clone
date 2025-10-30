import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { JobService } from 'src/app/jobs/service/job.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() id?: number;
  @Input() description: string = ''
  @Output() status = new EventEmitter<{ visible: boolean, description?: string }>();
  editor!: Editor;
  html: string = '';

  constructor(private service: JobService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.description || ''
  }

  toggle() {
    this.status.emit({ visible: false });
  }

  onSumit() {
    if (!this.html) return
    const body = {
      CardId: this.id,
      Description: this.html
    }
    this.service.descriptionCard(body).subscribe({
      next: res => {
        if (res.Success) {
          this.status.emit({
            visible: false,
            description: res.card.Description
          });

        }
      },
      error: (err) => {
        console.error('Cập nhật mô tả thất bại:', err);
      },
      complete: () => {
        console.log('Hoàn tất cập nhật mô tả');
      }
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
