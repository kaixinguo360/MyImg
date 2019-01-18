import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { environment } from '../environments/environment';
import { MyMaterialModuleModule } from './my-material-module.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ImageMasonryComponent } from './image-masonry/image-masonry.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ImageMasonryComponent,
    ImageViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MyMaterialModuleModule,
    LayoutModule,
    AppRoutingModule,
    NgxMasonryModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageViewerComponent
  ]
})
export class AppModule { }
