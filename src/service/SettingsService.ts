import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { Setting } from 'src/models/Setting';

export class SettingsService {
    constructor(private _httpClient: HttpClient) {}
  
    getSettings(sort: string, order: string, page: number): Observable<Setting[]> {
      const href = 'https://run.mocky.io/v3/5dbd0522-8689-49bd-b335-30d8fd1b21bb';
      const requestUrl =
          `${href}?sort=${sort}&order=${order}&page=${page + 1}`;
  
      return this._httpClient.get<Setting[]>(requestUrl);
    }
  }