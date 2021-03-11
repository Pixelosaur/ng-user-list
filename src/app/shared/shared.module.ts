// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { PagerComponent } from './components/pager/pager.component';

@NgModule({
    declarations: [PageTitleComponent, LoaderComponent, AlertComponent, PagerComponent],
    imports: [CommonModule],
    exports: [PageTitleComponent, CommonModule, LoaderComponent, AlertComponent, PagerComponent],
})
export class SharedModule {}
