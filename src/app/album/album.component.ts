import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { FileService } from '../services/file.service';
import { AppComponent } from '../app.component';
import { ImageMasonryComponent } from '../image-masonry/image-masonry.component';

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

  path: string;
  albums: Album[] = [ ];

  @ViewChild('imageMasonry') imageMasonry: ImageMasonryComponent;

  updatePath(): void {
    this.path = this.route.snapshot.queryParamMap.get('path');
    this.path = this.path === null ? '' : this.path;
    this.app.title = this.path;
  }

  updateAlbums(): void {
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

  updateContent(): void {
    this.updatePath();
    this.albums.length = 0;
    this.updateAlbums();
  }

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.updatePath();
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
