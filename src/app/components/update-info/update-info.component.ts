import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthApiService } from 'src/app/auth/service/auth-api.service';
import { User } from 'src/app/core/user';
import { ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Validators } from 'ngx-editor';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-info',
  standalone: false,
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css'],
  providers: [MessageService]
})
export class UpdateInfoComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  form!: FormGroup
  info !: User
  birthDate: Date | null = null;
  selectedFile: File | null = null
  avatarUrl: string | null = null;
  constructor(private Servie: AuthApiService, private fb: FormBuilder, private messageService: MessageService) {
    this.form = this.fb.group({
      FullName: ['', Validators.required],
      BirthDate: ['', Validators.required],
      Phone: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.info = this.Servie.getUser()
    this.birthDate = this.info?.BirthDate ? new Date(this.info?.BirthDate) : null

    this.form.patchValue({
      FullName: this.info.FullName,
      BirthDate: this.birthDate,
      Phone: this.info.Phone
    })
    this.avatarUrl = this.info.AvatarUrl || null;
  }

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => this.avatarUrl = e.target.result;
    this.selectedFile = file
    reader.readAsDataURL(file);
  }

  handleInfo() {

    const data = new FormData();
    const formValue = this.form.value

    Object.entries(formValue).forEach(([key, value]) => {
      if (value instanceof Date) {
        data.append(key, value.toLocaleDateString('en-CA'))
      } else if (value) {
        data.append(key, value.toString())
      }
    })

    if (this.selectedFile) {
      data.append('Avatar', this.selectedFile);
    }
    this.Servie.updateInfo(data).subscribe({
      next: res => {
        if (res.Success) {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: res.Message, key: 'br', life: 3000 })
        }
      },
      error: err => {
        if (!err.Success) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: err.Message, key: 'br', life: 3000 })
        }
      }
    })
  }
}
