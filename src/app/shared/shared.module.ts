// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
    declarations: [PageTitleComponent, LoaderComponent, AlertComponent],
    imports: [CommonModule],
    exports: [PageTitleComponent, CommonModule, LoaderComponent, AlertComponent],
})
export class SharedModule {}
