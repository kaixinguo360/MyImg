import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FileService, Image } from '../services/file.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  images: Image[] = [];
  index = this.data.index;

  constructor(
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImageViewerComponent>
  ) {}

  ngOnInit() {
    this.fileService.getImages(this.data.path, this.images);
  }

}
