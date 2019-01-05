import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';

import { Image } from '../album/album.component';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-image-masonry',
  templateUrl: './image-masonry.component.html',
  styleUrls: ['./image-masonry.component.css']
})
export class ImageMasonryComponent implements OnInit {

  columnWidth = this.config.getColumnWidth();
  mobileWidth = this.config.getMobileWidth();
  loadingImage = this.config.getLoadingImageURL();

  containerWidth: number;
  itemWidth: string;

  isMobile = window.innerWidth < this.mobileWidth;
  itemClass = this.isMobile ? 'masonry-item-mobile' : 'masonry-item-desktop';
  @ViewChild('masonry') masonry: NgxMasonryComponent;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 0,
    columnWidth: this.isMobile ? '.masonry-item-mobile' : 250,
    resize: false,
    initLayout: true,
    percentPosition: this.isMobile
  };

  @Input() images: Image[];

  public layout() {
    this.masonry.layout();
  }

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isMobile) {
      this.containerWidth = window.innerWidth;
    } else {
      this.containerWidth = (Math.round(window.innerWidth / this.columnWidth) - 1) * this.columnWidth;
    }
    this.masonry.layout();
  }
}