// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [PageTitleComponent, LoaderComponent],
    imports: [CommonModule],
    exports: [PageTitleComponent, CommonModule, LoaderComponent],
})
export class SharedModule {}
