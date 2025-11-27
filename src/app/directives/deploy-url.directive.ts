import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDeployUrl]',
  standalone: true
})
export class DeployUrlDirective implements AfterViewInit {
  @Input() deployUrl?: string;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2) { }
  private readonly _vpsBasUrl = 'https://vps-dc56a7e6.vps.ovh.net/';

  ngAfterViewInit(): void {
    if (!this.deployUrl) {
      this.disableLink();
      return;
    }
    let href: string;
    if (this.deployUrl.startsWith(this._vpsBasUrl)) {
      href = this.deployUrl;
    } else {
      const githubBaseUrl = 'https://idembele70.github.io/';
      href = githubBaseUrl + this.deployUrl;
    }
    this.renderer.setAttribute(this.el.nativeElement, 'href', href);
    this.renderer.setAttribute(this.el.nativeElement, 'target', '_blank');
    this.renderer.setAttribute(this.el.nativeElement, 'rel', 'noopener noreferrer')
  }

  private disableLink() {
    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
  }
}
