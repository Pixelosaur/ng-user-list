import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent {
    @Output() page: EventEmitter<string> = new EventEmitter<string>();

    onPageChange(pager: string): void {
      this.page.emit(pager);
    }
}
