import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FileService, Item } from '../file.service';
import { ConfigService } from '../config.service';

interface Image {
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

  getPath(): void {
    this.path = this.route.snapshot.queryParamMap.get('path');
    this.path = this.path === null ? '' : this.path;
  }

  getImages(): void {
    this.fileService.getFiles(this.path)
      .subscribe(
        files => {
          files.sort(
            (a, b) => a.time - b.time
          ).forEach(
            file => {
              this.images.push({
                title: file.name,
                time: file.time,
                src: this.root + '/' + this.path + '/' + file.name
              });
            }
          );
        }
      );
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
                path: this.path + '/' + dir.name
              });
            }
          );
        }
      );
  }

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.getPath();
    this.getAlbums();
    this.getImages();
  }

}
