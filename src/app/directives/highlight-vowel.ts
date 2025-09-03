import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightVowel]',
})
export class HighlightVowelDirective implements OnChanges {
  @Input('appHighlightVowel') value: string | null = null;
  @Input() appHighlightVowelClass = 'vowel-highlight';

  constructor(private readonly element: ElementRef, private readonly renderer: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    const text = (this.value ?? '').trim();
    const startsWithVowel = /^[AEIOUÁÉÍÓÚ]/i.test(text);

    if (startsWithVowel) {
      this.renderer.addClass(this.element.nativeElement, this.appHighlightVowelClass);
      this.renderer.setAttribute(this.element.nativeElement, 'title', 'Empieza por vocal');
    } else {
      this.renderer.removeClass(this.element.nativeElement, this.appHighlightVowelClass);
      this.renderer.removeAttribute(this.element.nativeElement, 'title');
    }
  }
}
