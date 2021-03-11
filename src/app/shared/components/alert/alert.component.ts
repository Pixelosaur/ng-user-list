import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Alert } from './alert.interface';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
    @Input() alert!: Alert;
}
