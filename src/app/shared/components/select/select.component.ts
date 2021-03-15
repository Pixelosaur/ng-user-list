import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SelectOption } from '../../interfaces/select-option.interface';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
    @Input() searchable: boolean = false;
    @Input() clearable: boolean = false;
    @Input() placeholder: string = 'Select an option...';
    @Input() options: SelectOption[] = [];

    @Output() selectedOption: EventEmitter<SelectOption> = new EventEmitter<SelectOption>();

    onChange(value: SelectOption) {
        this.selectedOption.emit(value);
    }
}
