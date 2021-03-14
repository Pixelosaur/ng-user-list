import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Theme } from '../interfaces/theme.interface';

@Directive({
    selector: '[appTheme]',
})
export class ThemeDirective implements OnChanges {
    @Input('appTheme') theme!: Theme;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnChanges() {
        for (const [key, value] of Object.entries(this.theme)) {
            this.el.nativeElement.style.setProperty(`--${key}`, value);
        }
    }
}
