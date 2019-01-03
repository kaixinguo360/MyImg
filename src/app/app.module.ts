import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { NgxMasonryModule } from 'ngx-masonry';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

import { MyMaterialModuleModule } from './my-material-module.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ImageMasonryComponent } from './image-masonry/image-masonry.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ImageMasonryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyMaterialModuleModule,
    LayoutModule,
    AppRoutingModule,
    NgxMasonryModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
