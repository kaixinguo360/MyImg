import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class FileService {
  url = appConfig.apiURL;
  order: Order = this.preference.getOrder();

  cache: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();
  running: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();

  getFiles(path: string): Observable<Item[]> {
    return new Observable<Item[]>(
      observable => {
        this.getItems(path).subscribe(
          items => {
            observable.next(items.files.sort(
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
            ).filter(
              res => {
                const e: string = res.name.trim().split('.').pop();
                return (
                  /jpg|jpeg|png|gif|bmp/.exec(e)
                );
              }
            ));
          }
        );
      }
    );
  }

  getDirs(path: string): Observable<Item[]> {
    return new Observable<Item[]>(
      observable => {
        this.getItems(path).subscribe(
          items => observable.next(items.dirs.sort(
            (a, b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0
          ))
        );
      }
    );
  }

  getItems(path: string): Observable<Items> {
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

      return observable;
    }
  }

  stopAll() {
    this.running.clear();
  }

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private preference: PreferenceService
  ) { }
}
