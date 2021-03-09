// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { PageTitleComponent } from './components/page-title/page-title.component';

@NgModule({
    declarations: [PageTitleComponent],
    imports: [CommonModule],
    exports: [PageTitleComponent, CommonModule],
})
export class SharedModule {}
