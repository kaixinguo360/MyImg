import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  path: string;

  getPath(): void {
    this.path = this.route.snapshot.queryParamMap.get('path');
  }

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPath();
  }

}
