import {Directive, HostBinding, HostListener} from "@angular/core";


@Directive({
    selector: '[appDropDwn]'
})

export class DropDownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toogleOpen() {
        this.isOpen = !this.isOpen;
    }

    constructor() {
    }
}
