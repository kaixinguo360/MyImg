import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { appConfig } from '../app-config';
import { FileService } from '../services/file.service';
import { AppComponent } from '../app.component';
import { ImageMasonryComponent } from '../image-masonry/image-masonry.component';
import { Order } from '../order';
import { PreferenceService } from '../services/preference.service';

export interface Image {
  title: string;
  time: number;
  src: string;
}

interface Album {
  title: string;
  path: string;
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  root = appConfig.fileURLRoot;
  columnWidth = appConfig.columnWidth;
  mobileWidth = appConfig.mobileWidth;
  order: Order = this.preference.getOrder();

  path: string;
  images: Image[] = [ ];
  albums: Album[] = [ ];

  loadedImages: Image[] = [ ];

  @ViewChild('imageMasonry') imageMasonry: ImageMasonryComponent;

  getPath(): void {
    this.path = this.route.snapshot.queryParamMap.get('path');
    this.path = this.path === null ? '' : this.path;
  }

  getAlbums(): void {
    this.fileService.getDirs(this.path)
      .subscribe(
        dirs => {
          dirs.forEach(
            dir => {
              this.albums.push({
                title: dir.name,
                path: (this.path === '') ? dir.name : (this.path + '/' + dir.name)
              });
            }
          );
        }
      );
  }

  getImages(): void {
    this.fileService.getFiles(this.path)
      .subscribe(
        files => {
          files.forEach(
            file => {
              this.images.push({
                title: file.name,
                time: file.time,
                src: this.root + '/' + this.path + '/' + file.name
              });
            }
          );
          this.loadMoreImage();
        }
      );
  }

  updateContent(): void {
    this.images.length = 0;
    this.albums.length = 0;
    this.loadedImages.length = 0;
    this.getPath();
    this.getAlbums();
    this.getImages();
    this.app.title = this.path;
  }

  loadMoreImage() {
    let num;

    let column;
    const isMobile = window.innerWidth < this.mobileWidth;
    column = isMobile ? 2 : (Math.round(window.innerWidth / this.columnWidth) - 1);

    if (this.loadedImages.length === 0) {
      num = column * 8;
    } else {
      num = column * 4;
    }

    num = (this.images.length < num) ? this.images.length : num;

    if (num === 0) {
      this.imageMasonry.layout();
      return;
    } else {
      for (let i = 0; i < num; i++) {
        this.loadedImages.push(this.images.shift());
      }
    }

    this.imageMasonry.layout();
  }

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private app: AppComponent,
    private preference: PreferenceService
  ) { }

  ngOnInit() {
    this.getPath();
    this.updateContent();
    this.router.events
      .subscribe(
        event => {
          if (event instanceof  NavigationEnd) {
            this.updateContent();
          }
        }
      );
  }
}
