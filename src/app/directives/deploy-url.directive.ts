import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDeployUrl]',
  standalone: true
})
export class DeployUrlDirective implements AfterViewInit {
  @Input() deployUrl?: string;
  private readonly _baseUrl = 'https://idembele70.github.io/';

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2) { }

  ngAfterViewInit(): void {
      if (!this.deployUrl) {
        this.disableLink();
        return;
      }
      const href = this._baseUrl + this.deployUrl;
      this.renderer.setAttribute(this.el.nativeElement, 'href', href);
      this.renderer.setAttribute(this.el.nativeElement, 'target', '_blank');
      this.renderer.setAttribute(this.el.nativeElement, 'rel', 'noopener noreferrer')
  }

 private disableLink() {
  this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
  this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
 }
}
