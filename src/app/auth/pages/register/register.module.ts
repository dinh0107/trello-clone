import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes : Routes = [
    {path: '', component: RegisterComponent}
]

@NgModule({
    declarations:[RegisterComponent],
    imports: [
        CommonModule, 
        RouterModule.forChild(routes)
    ]
})
export class RegisterModule{}