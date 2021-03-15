// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
// Components
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { PagerComponent } from './components/pager/pager.component';
import { ThemeDirective } from './directives/theme.directive';
import { SelectComponent } from './components/select/select.component';

@NgModule({
    declarations: [
        PageTitleComponent,
        LoaderComponent,
        AlertComponent,
        PagerComponent,
        ThemeDirective,
        SelectComponent,
    ],
    imports: [CommonModule, NgSelectModule],
    exports: [
        PageTitleComponent,
        CommonModule,
        LoaderComponent,
        AlertComponent,
        PagerComponent,
        ThemeDirective,
        SelectComponent,
    ],
})
export class SharedModule {}
