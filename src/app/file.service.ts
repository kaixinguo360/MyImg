import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';

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
  files: Map<string, Items> = new Map<string, Items>();

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
    if (this.files[path] === null) {
      return of(this.files[path]);
    } else {
      return new Observable<Items>(
        observable => {
          this.http.get<Items>(this.url, {
            params: {
              path: path
            }
          }).subscribe(
            items => {
              this.files.set(path, items);
              observable.next(items);
            }
          );
        }
      );
    }
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }
}
