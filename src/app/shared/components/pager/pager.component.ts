import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent {
    @Input() isNextButtonDisabled!: boolean;
    @Input() isPrevButtonDisabled!: boolean;
    @Output() page: EventEmitter<string> = new EventEmitter<string>();

    onPageChange(pager: string): void {
        this.page.emit(pager);
    }
}
