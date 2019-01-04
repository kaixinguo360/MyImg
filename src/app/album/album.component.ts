import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { FileService } from '../file.service';
import { ConfigService } from '../config.service';
import { AppComponent } from '../app.component';

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
  root = this.config.getFileURLRoot();
  path: string;

  images: Image[] = [ ];
  albums: Album[] = [ ];

  loadedImages: Image[] = [ ];

  getPath(): void {
    this.path = this.route.snapshot.queryParamMap.get('path');
    this.path = this.path === null ? '' : this.path;
  }

  getAlbums(): void {
    this.fileService.getDirs(this.path)
      .subscribe(
        dirs => {
          dirs.sort(
            (a, b) => a.time - b.time
          ).forEach(
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
          files.sort(
            (a, b) => a.time - b.time
          ).filter(
            res => {
              const e: string = res.name.trim().split('.').pop();
              return (
                /jpg|jpeg|png|gif|bmp/.exec(e)
              );
            }
          ).forEach(
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

    if (this.loadedImages.length === 0) {
      num = (this.images.length < 10) ? this.images.length : 10;
    } else {
      num = (this.images.length < 5) ? this.images.length : 5;
    }

    if (num === 0) {
      return;
    } else {
      for (let i = 0; i < num; i++) {
        this.loadedImages.push(this.images.shift());
      }
    }
  }

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private config: ConfigService,
    private router: Router,
    private app: AppComponent
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
