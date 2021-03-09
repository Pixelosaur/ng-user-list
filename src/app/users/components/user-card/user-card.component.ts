import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
    @Input() user: User | null = null;
}
