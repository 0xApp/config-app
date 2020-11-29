import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import  { SettingsService } from "../service/SettingsService";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Setting } from 'src/models/Setting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['Section', 'Key', 'UpdatedDate'];
  title = 'config-app';
  settingsService: SettingsService | null;

  settings: Setting[] = [];

  isLoading = true;
  resultsLength: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   *
   */
  constructor(private _httpclient: HttpClient) { 
    this.settingsService = null;
    // this.settings.push({
    //   Id: 1,
    //   Key: 'ABC',
    //   Section: 'QWE',
    //   Value: 'RAJ',
    //   UpdatedBy: 'Parimal',
    //   UpdatedDate: new Date(2020, 11, 30)
    // })
  }

  ngAfterViewInit(): void {
    this.settingsService = new SettingsService(this._httpclient);

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith([]),
        switchMap(() => {
          this.isLoading = true;
          return this.settingsService!.getSettings(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          console.log('data', data);
          // Flip flag to show that loading has finished.
          this.isLoading = false;

          return data;
        }),
        catchError((error) => {
          console.log(error);
          this.isLoading = false;
          return observableOf([]);
        })
      ).subscribe(data => this.settings = data);
  }
  
}
