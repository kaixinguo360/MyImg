import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FileService, Item } from '../file.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  root = this.config.getFileURLRoot();
  path: string;
  files: Observable<Item[]>;
  dirs: Observable<Item[]>;

  getPath(): void {
    this.path = this.route.snapshot.queryParamMap.get('path');
  }

  getFiles(): void {
    this.files = this.albumService.getFiles(this.path);
  }

  getDirs(): void {
    this.dirs = this.albumService.getDirs(this.path);
  }

  constructor(
    private route: ActivatedRoute,
    private albumService: FileService,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.getPath();
    this.getFiles();
    this.getDirs();
  }

}
