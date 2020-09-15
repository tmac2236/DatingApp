import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utility } from '../utility/utility';
import { Attendance } from '../_models/attendance';
import { ChangeWorker } from '../_models/change-worker';
import { QueryPDModel } from '../_models/query-pd-model';
import { ReportDataPass } from '../_models/report-data-pass';
import { SQueryPDModel } from '../_models/s-query-pd-model';
import { SReportDataPass } from '../_models/s_report-data-pass';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private utility: Utility) {}

  getReportDataPass(sReportDataPass: SReportDataPass) {
    console.log('reportService: ' + sReportDataPass.lineID);
    return this.http.post<ReportDataPass[]>(
      this.utility.baseUrl + 'report/getReportDataPass',
      sReportDataPass
    );
  }

  getPDModel(sQueryPDModel: SQueryPDModel) {
    console.log('reportService: ' + sQueryPDModel.teamID);
    return this.http.post<QueryPDModel[]>(
      this.utility.baseUrl + 'report/getQueryPDModel',
      sQueryPDModel
    );
  }

  getAttendances() {
    return this.http.get<Attendance[]>(
      this.utility.baseUrl + 'report/getAttendanceList');
  }

  getChangeWorkers(sQueryPDModel: SQueryPDModel) {
    console.log('reportService: ' + sQueryPDModel.teamID);
    return this.http.post<ChangeWorker[]>(
      this.utility.baseUrl + 'report/getChangeWorkers',
      sQueryPDModel
    );
  }

}
