import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormCardComponent } from '../components/form-card/form-card.component';
import { CardComponent } from '../components/card/card.component';
import { ViewCardComponent } from '../components/view-card/view-card.component';
import { EditorComponent } from '../components/editor/editor.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { NgxEditorModule } from 'ngx-editor';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListFaceComponent } from '../components/list-face/list-face.component';
import { UserFormComponent } from '../components/user-form/user-form.component';
const routes: Routes = [{ path: '', component: JobsComponent }];
@NgModule({
  declarations: [
    JobsComponent,
    FormCardComponent,
    CardComponent,
    ViewCardComponent,
    EditorComponent,
    ListFaceComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    A11yModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AvatarModule,
    AvatarGroupModule,
    NgxEditorModule,
    ɵInternalFormsSharedModule,
    FormsModule,
    ToastModule,
    MatIconModule,
    RippleModule,
    OverlayPanelModule,
  ],
  providers: [MessageService],
})
export class JobModule {}
