import { RouterModule, Routes } from "@angular/router";
import { JobsComponent } from "./jobs.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes : Routes = [
    {path:'', component: JobsComponent}
]
@NgModule ({
    declarations:[JobsComponent],
    imports:[
        CommonModule, RouterModule.forChild(routes)
    ]
})
export class JobModule{}