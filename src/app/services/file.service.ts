import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { isFunction } from 'util';

import { appConfig } from '../app-config';
import { LoggerService } from './logger.service';
import { Order } from '../order';
import { PreferenceService } from './preference.service';

export interface Items {
  files: Item[];
  dirs: Item[];
}

export interface Item {
  name: string;
  time: number;
}

export interface Image {
  title: string;
  time: number;
  src: string;
}

export interface Album {
  title: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  url = appConfig.apiURL;
  root = appConfig.fileURLRoot;
  order: Order = this.preference.getOrder();

  cache: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();
  running: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();

  private getItems(path: string): Observable<Items> {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    } else if (this.running.has(path)) {
      return this.running.get(path);
    } else {
      const observable: Observable<Items> = this.http.get<Items>(this.url, {
        params: {
          path: path
        },
        headers: {
          'Cache-Control' : 'max-age=50'
        }
      }).pipe(
        shareReplay(1)
      );

      this.running.set(path, observable);

      observable.subscribe(
        res => {
          this.logger.log('Successful Get: ' + path);
          this.logger.log(res);
          this.cache.set(path, observable);
          this.running.delete(path);
        },
        error => {
          this.logger.log('Error Get: ' + path);
          this.logger.log(error);
          this.running.delete(path);
        }
      );

      observable.subscribe(
        items => {
          items.dirs.sort(
            (a, b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0
          );
          items.files.sort(
            (a, b) => {
              switch (this.order) {
                case Order.TIME_DESC:
                  return b.time - a.time;
                case Order.TIME_ASC:
                  return a.time - b.time;
                case Order.NAME_DESC:
                  return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
                case Order.NAME_ASC:
                  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                case Order.RANDOM:
                  return Math.random() > 0.5 ? -1 : 1;
              }
            }
          );
          items.files = items.files.filter(
            res => {
              const e: string = res.name.trim().split('.').pop();
              return (
                /jpg|jpeg|png|gif|bmp/.exec(e)
              );
            }
          );
        }
      );

      return observable;
    }
  }

  public getAlbums(path: string, albums: Album[], onLoad?: () => void): void {
    albums.length = 0;
    this.getItems(path).subscribe(
      items => {
        items.dirs.forEach(
          dir => {
            albums.push({
              title: dir.name,
              path: (path === '') ? dir.name : (path + '/' + dir.name)
            });
          }
        );
        if (isFunction(onLoad)) {
          onLoad();
        }
      }
    );
  }

  public getImages(path: string, images: Image[], onLoad?: () => void): void {
    images.length = 0;
    this.getItems(path).subscribe(
      items => {
        items.files.forEach(
          file => {
            images.push({
              title: file.name,
              time: file.time,
              src: this.root + '/' + path + '/' + file.name
            });
          }
        );
        if (isFunction(onLoad)) {
          onLoad();
        }
      }
    );
  }

  public stopAll() {
    this.running.clear();
  }

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private preference: PreferenceService
  ) { }
}
