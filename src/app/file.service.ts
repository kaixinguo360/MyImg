import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { publishReplay } from 'rxjs/operators';

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
  url = this.config.getApiURL();
  files: Map<string, Observable<Items>> = new Map<string, Observable<Items>>();

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
    if (this.files.has(path)) {
      return this.files.get(path);
    } else {
      const observable: Observable<Items> = this.http.get<Items>(this.url, {
        params: {
          path: path
        }
      }).pipe(
        res => {
          this.files.set(path, res);
          return res;
        },
        publishReplay()
      );
      return observable;
    }
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }
}
