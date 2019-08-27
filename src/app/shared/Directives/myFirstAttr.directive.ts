import { Directive, OnInit, ElementRef, Renderer2, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[myFirstAttr]'
})

export class MyFirstAttrDirective implements OnInit{
    
    @HostBinding('style.color') color: string = 'darkblue';

    constructor(private eleRef: ElementRef, private renderer : Renderer2){
    }

    ngOnInit(){

    }

    @HostListener('mouseenter') mousevoer(eventData: Event){
        this.color = 'blue';
    }

    @HostListener('mouseleave') mouseout(eventData: Event){
        this.color = 'darkblue';
    }
}