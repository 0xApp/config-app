import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import  { SettingsService } from "../service/SettingsService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  title = 'config-app';
  settingsService: SettingsService | null;

  /**
   *
   */
  constructor(private _httpclient: HttpClient) { 
    this.settingsService = null;
  }

  ngAfterViewInit(): void {
    this.settingsService = new SettingsService(this._httpclient);
  }
  
}
