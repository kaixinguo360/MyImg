import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../album/album.component';

@Component({
  selector: 'app-image-masonry',
  templateUrl: './image-masonry.component.html',
  styleUrls: ['./image-masonry.component.css']
})
export class ImageMasonryComponent implements OnInit {

  @Input() images: Image[];

  constructor() { }

  ngOnInit() {
  }

}
