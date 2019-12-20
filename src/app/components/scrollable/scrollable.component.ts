import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import {
  Scrollbar as PluginScrollbar,
  ScrollbarOptions as PluginOptions,
} from 'smooth-scrollbar/interfaces';

import { DefaultValueUtils } from '../../lib/default-value-utils';

export interface ScrollableOptions {
  alwaysShowTracks: boolean;
}

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  @Input() options: Partial<ScrollableOptions>;
  private get pluginOptions(): Partial<PluginOptions> {
    const options: Partial<ScrollableOptions> = this.options || {};
    const pluginOptions: Partial<PluginOptions> = {
      damping: 0.4,
      renderByPixels: false,
      alwaysShowTracks: DefaultValueUtils.boolean(options.alwaysShowTracks, true),
      continuousScrolling: true,
    };
    return pluginOptions;
  }

  private _scrollbarInstance: PluginScrollbar;
  private _updateInterval: any;
  private readonly _updateTickesPerSecond = 24;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    clearInterval(this._updateInterval);
    this._scrollbarInstance = null;
    Scrollbar.destroy(this.scrollable.nativeElement);
  }

  ngAfterViewInit(): void {
    this._scrollbarInstance = Scrollbar.init(
      this.scrollable.nativeElement,
      this.pluginOptions,
    );

    this._updateInterval = setInterval(
      () => this.onUpdateTick(),
      1000 / this._updateTickesPerSecond,
    );
  }

  private onUpdateTick(): void {
    if (!this._scrollbarInstance) {
      return;
    }

    this._scrollbarInstance.update();
  }
}
