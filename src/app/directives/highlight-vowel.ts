import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightVowel]',
})
export class HighlightVowelDirective implements OnChanges {
  @Input('appHighlightVowel') value: string | null = null;
  @Input() appHighlightVowelClass = 'vowel-highlight';

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnChanges(_: SimpleChanges): void {
    const text = (this.value ?? '').trim();
    const startsWithVowel = /^[AEIOUÁÉÍÓÚÜ]/i.test(text);

    if (startsWithVowel) {
      this.r.addClass(this.el.nativeElement, this.appHighlightVowelClass);
      this.r.setAttribute(this.el.nativeElement, 'title', 'Empieza por vocal');
    } else {
      this.r.removeClass(this.el.nativeElement, this.appHighlightVowelClass);
      this.r.removeAttribute(this.el.nativeElement, 'title');
    }
  }
}
