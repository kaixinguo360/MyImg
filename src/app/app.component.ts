import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = '';

  back(): void {
    this.fileService.stopAll();
    window.stop();
    this.location.back();
  }

  reload(): void {
    location.reload();
  }

  constructor(
    private location: Location,
    private fileService: FileService
  ) { }

  ngOnInit() { }
}
