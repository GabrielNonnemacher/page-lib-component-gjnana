import { NgClass, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  ButtonGjnanaComponent,
  CheckBoxGjnanaComponent,
  HeaderGjnanaComponent,
} from 'lib-mat-gjnana';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonGjnanaComponent,
    CheckBoxGjnanaComponent,
    HeaderGjnanaComponent,
    NgClass,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'page-lib-component-gjnana';

  open = true;
  extraContent = false;
  private resizeObserver!: ResizeObserver;
  @ViewChild('panel') panel!: ElementRef<HTMLDivElement>;

  onclick(): void {
    this.open = !this.open;
    if (this.open && this.panel?.nativeElement) {
      this.panelHeight = this.panel.nativeElement.scrollHeight;
    } else {
      this.panelHeight = 0;
    }
  }

  panelHeight: number = 0;

  ngAfterViewInit(): void {
    this.initResizeObserver();

    // Aguarda layout inicial completo
    setTimeout(() => this.updateHeight(), 0);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver && this.panel?.nativeElement) {
      this.resizeObserver.unobserve(this.panel.nativeElement);
    }
  }

  toggle(): void {
    this.open = !this.open;

    // Aguarda DOM aplicar a nova classe .open
    setTimeout(() => this.updateHeight(), 10);
  }

  loadContent(): void {
    this.extraContent = true;
    setTimeout(() => this.updateHeight(), 10);
  }

  private initResizeObserver(): void {
    if (!this.panel?.nativeElement) return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.open) this.updateHeight();
    });

    this.resizeObserver.observe(this.panel.nativeElement);
  }

  private updateHeight(): void {
    if (!this.panel?.nativeElement) return;

    const el = this.panel.nativeElement;
    const computedStyle = getComputedStyle(el);
    const paddingTop = parseFloat(computedStyle.paddingTop || '0');
    const paddingBottom = parseFloat(computedStyle.paddingBottom || '0');

    // scrollHeight já inclui padding apenas se visível
    this.panelHeight = el.scrollHeight + paddingTop + paddingBottom;
  }
}
