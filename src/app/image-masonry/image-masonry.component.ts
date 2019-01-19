import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';

import { appConfig } from '../app-config';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { FileService, Image } from '../services/file.service';

@Component({
  selector: 'app-image-masonry',
  templateUrl: './image-masonry.component.html',
  styleUrls: ['./image-masonry.component.css']
})
export class ImageMasonryComponent implements OnInit {

  columnWidth = appConfig.columnWidth;
  loadingImage = appConfig.loadingImage;
  isMobile = window.innerWidth < appConfig.mobileWidth;

  containerWidth: number;
  onload = false;
  imagesNum = 0;

  loadedImages: Image[] = [];
  images: Image[] = [];

  @ViewChild('masonry')
  masonry: NgxMasonryComponent;
  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 0,
    columnWidth: this.isMobile ? '.masonry-item-mobile' : 250,
    resize: false,
    initLayout: true,
    percentPosition: this.isMobile
  };

  private _path = new BehaviorSubject<string>(null);

  @Input()
  set path(value) {
    this._path.next(value);
  }
  get path() {
    return this._path.getValue();
  }

  public updateLayout() {
    this.masonry.layout();
  }

  public loadMoreImage() {
    let num;

    const column = this.isMobile ? 2 : (Math.round(window.innerWidth / this.columnWidth) - 1);

    if (this.loadedImages.length === 0) {
      num = column * 8;
    } else {
      num = column * 4;
    }

    num = (this.images.length < num) ? this.images.length : num;

    if (num === 0) {
      this.updateLayout();
      return;
    } else {
      for (let i = 0; i < num; i++) {
        this.loadedImages.push(this.images.shift());
      }
    }

    this.updateLayout();
  }

  public openImageViewer(index: number) {
    this.dialog.open(
      ImageViewerComponent,
      {
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        autoFocus: false,
        data: {
          path: this.path,
          index: index
        }
      }
    );
  }

  constructor(
    private fileService: FileService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.onResize();
    this._path.subscribe(
      path => {
        this.loadedImages.length = 0;
        this.images.length = 0;
        this.onload = false;
        this.fileService.getImages(path, this.images,
          () => {
            this.imagesNum = this.images.length;
            this.loadMoreImage();
            this.onload = true;
          }
        );
      }
    );
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
