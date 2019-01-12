import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { appConfig } from '../app-config';

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
  cache: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();
  running: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();

  getFiles(path: string): Observable<Item[]> {
    return new Observable<Item[]>(
      observable => {
        this.getItems(path).subscribe(
          items => observable.next(items.files)
        );
      }
    );
  }

  getDirs(path: string): Observable<Item[]> {
    return new Observable<Item[]>(
      observable => {
        this.getItems(path).subscribe(
          items => observable.next(items.dirs)
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
          console.log('Successful Get: ' + path);
          console.log(res);
          this.cache.set(path, observable);
          this.running.delete(path);
        },
        error => {
          console.log('Error Get: ' + path);
          console.log(error);
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
    private http: HttpClient
  ) { }
}
