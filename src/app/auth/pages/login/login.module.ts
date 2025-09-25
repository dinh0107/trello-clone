import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes : Routes = [
    {
        path: '',
        component:LoginComponent
    }
]

@NgModule({
    declarations:[LoginComponent],
    imports:[
        CommonModule, RouterModule.forChild(routes)
    ]
})

export class LoginModule{}