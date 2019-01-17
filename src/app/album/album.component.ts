import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Album, FileService } from '../services/file.service';
import { AppComponent } from '../app.component';
import { ImageMasonryComponent } from '../image-masonry/image-masonry.component';

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

  updateContent(): void {
    this.updatePath();
    this.fileService.getAlbums(this.path, this.albums);
  }

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private app: AppComponent
  ) { }

  ngOnInit() {
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
