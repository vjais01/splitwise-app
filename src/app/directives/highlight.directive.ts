import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

// DIRECTIVES EXAMPLE: Custom attribute directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = '';
  @Input() defaultColor = 'yellow';

  constructor(private el: ElementRef) {}

  // HOOKS EXAMPLE: ngOnInit lifecycle hook
  ngOnInit() {
    this.highlight(this.appHighlight || this.defaultColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('lightblue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.appHighlight || this.defaultColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }
}