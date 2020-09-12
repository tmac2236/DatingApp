import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utility } from '../utility/utility';
import { ReportDataPass } from '../_models/report-data-pass';
import { SReportDataPass } from '../_models/s_report-data-pass';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private utility: Utility) {}

  getReportDataPass(sReportDataPass: SReportDataPass) {
    console.log('reportService: '+ sReportDataPass.lineID);
    return this.http.post<ReportDataPass[]>(
      this.utility.baseUrl + 'report/getReportDataPass',
      sReportDataPass
    );
  }
}
